import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { texts, targetLang, cacheOnly = false } = await req.json();

    const LANG_ALIASES: Record<string, string> = {
      en: "English",
      english: "English",
      el: "Ελληνικά",
      "ελληνικά": "Ελληνικά",
      ar: "العربية",
      "العربية": "العربية",
      zh: "中文",
      "中文": "中文",
      ru: "Русский",
      "русский": "Русский",
      fr: "Français",
      "français": "Français",
      hi: "हिन्दी",
      "हिन्दी": "हिन्दी",
      he: "עברית",
      "עברית": "עברית",
      tr: "Türkçe",
      "türkçe": "Türkçe",
    };

    if (!texts || !Array.isArray(texts) || !targetLang) {
      return new Response(
        JSON.stringify({ error: "texts (array) and targetLang are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (texts.length > 50) {
      return new Response(
        JSON.stringify({ error: "Maximum 50 texts per request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedLang = LANG_ALIASES[String(targetLang || "").trim().toLowerCase()] || targetLang;
    if (!Object.values(LANG_ALIASES).includes(normalizedLang)) {
      return new Response(
        JSON.stringify({ error: "Unsupported target language" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate all texts are strings with reasonable length
    for (const t of texts) {
      if (typeof t !== "string" || t.length > 5000) {
        return new Response(
          JSON.stringify({ error: "Each text must be a string under 5000 characters" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase env vars missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const uniqueTexts = Array.from(new Set(texts));
    const cacheMap = new Map<string, string>();

    // 1) Read cache first to avoid AI cost
    const { data: cachedRows } = await supabase
      .from("translation_cache")
      .select("source_text, translated_text")
      .eq("target_lang", normalizedLang)
      .in("source_text", uniqueTexts);

    for (const row of cachedRows || []) {
      cacheMap.set(row.source_text, row.translated_text);
    }

    const missingTexts = uniqueTexts.filter((t) => !cacheMap.has(t));

    // 2) In cache-only mode, never call AI; return originals for misses.
    if (cacheOnly && missingTexts.length > 0) {
      missingTexts.forEach((src) => cacheMap.set(src, src));
    }

    // 3) Only call AI for cache misses when cacheOnly is false
    if (!cacheOnly && missingTexts.length > 0) {
      const prompt = `You are a professional translator. Translate the following JSON array of strings into ${normalizedLang}. Return ONLY a valid JSON array of translated strings in the same order, nothing else. Keep proper nouns, brand names like "mAI Prop", "Golden Visa", currency symbols, and numbers unchanged. Do not add explanations.\n\nInput:\n${JSON.stringify(missingTexts)}`;

      const response = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [{ role: "user", content: prompt }],
            stream: false,
          }),
        },
      );

      if (!response.ok) {
        const status = response.status;
        if (status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (status === 402) {
          return new Response(
            JSON.stringify({ error: "Payment required." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const t = await response.text();
        console.error("AI gateway error:", status, t);
        return new Response(
          JSON.stringify({ error: "Translation failed" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "[]";

      // Extract JSON array from the response (handle markdown code blocks)
      let translatedMissing: string[];
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        translatedMissing = jsonMatch ? JSON.parse(jsonMatch[0]) : missingTexts;
      } catch {
        console.error("Failed to parse translation response:", content);
        translatedMissing = missingTexts;
      }

      // Bind translated missings back to cache map
      missingTexts.forEach((src, i) => {
        cacheMap.set(src, translatedMissing[i] || src);
      });

      // Persist misses for future requests (shared cache)
      const rows = missingTexts.map((src) => ({
        source_text: src,
        target_lang: normalizedLang,
        translated_text: cacheMap.get(src) || src,
      }));
      const { error: upsertError } = await supabase
        .from("translation_cache")
        .upsert(rows, { onConflict: "source_text,target_lang" });
      if (upsertError) {
        console.error("translation_cache upsert error:", upsertError);
      }
    }

    // 4) Return translations in original order (including duplicates)
    const translated = texts.map((src) => cacheMap.get(src) || src);

    return new Response(JSON.stringify({ translated, cacheOnly, missingCount: missingTexts.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
