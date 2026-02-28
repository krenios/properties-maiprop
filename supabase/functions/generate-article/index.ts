import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, slug, forceRegenerate = false } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase env vars missing");

    // Use service role to bypass RLS for cache reads/writes
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // If not forcing regeneration, try to load from DB first
    if (!forceRegenerate && slug) {
      const { data: existing } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (existing && existing.content && Object.keys(existing.content).length > 0) {
        return new Response(JSON.stringify({ article: existing.content, fromCache: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ── SYSTEM PROMPT with up-to-date 2024/2025 Golden Visa facts ──
    const systemPrompt = `You are an expert real estate investment writer specializing in Greek Golden Visa and Greek property market content.
Write authoritative, SEO-optimized articles for international investors (US, UAE, UK, Turkey, China audience).
Always write in a professional yet accessible tone. Include specific data points, actionable insights, and statistics where relevant.
Structure articles with clear H2/H3 sections. End with a strong internal CTA linking to property search or consultation.

CRITICAL — VERIFIED 2024/2025 GREEK GOLDEN VISA FACTS (use these exact figures, do NOT contradict them):
- Standard minimum investment: €250,000 (most of Greece — applies to mainland, most islands, and most of Greece)
- HIGH-DEMAND ZONE investment: €800,000 minimum (Athens municipality, Thessaloniki municipality, Mykonos island, Santorini island, and any island with population over 3,100)
- The €800K threshold applies to: Municipality of Athens, Municipality of Thessaloniki, Mykonos, Santorini, and islands with population >3,100
- The €250K threshold applies to: the rest of Greece including most other islands, Peloponnese, northern Greece, etc.
- 5-year renewable residency permit — no minimum stay required
- Path to Greek citizenship after 7 years continuous residency
- Family members included: spouse, children under 21, parents of both spouses
- Full Schengen Area freedom (27 countries)
- The program was updated in 2023, with the tiered investment thresholds effective from September 2023
- Average gross rental yields in Athens: 4–6%; net: 3–5% after taxes and management
- Athens property price appreciation: 8–12% annually in prime neighborhoods (2023–2024)
- Greece's Golden Visa is Law 4146/2013, updated by Law 5007/2022 and subsequent ministerial decisions
- VAT suspension on new builds effective until end of 2024 (suspended 24% VAT on new constructions)`;

    const userPrompt = `Write a comprehensive 800-1000 word article about: "${topic}"

Return a JSON object with this exact structure:
{
  "title": "SEO-optimized article title",
  "metaDescription": "155-char meta description",
  "intro": "2-3 sentence compelling introduction",
  "sections": [
    {
      "heading": "H2 section title",
      "content": "2-3 paragraphs of content for this section"
    }
  ],
  "keyTakeaways": ["bullet point 1", "bullet point 2", "bullet point 3", "bullet point 4", "bullet point 5"],
  "ctaText": "Short compelling CTA text (1 sentence)",
  "readTime": "X min read"
}

IMPORTANT: Use the exact investment thresholds from the system prompt (€250K standard, €800K for Athens/Thessaloniki/Mykonos/Santorini). Do not use outdated figures like €500K.
Make it authoritative, data-rich, and highly relevant for non-EU investors considering Greek Golden Visa.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error("No content returned from AI");

    const articleContent = JSON.parse(rawContent);

    // Persist/upsert into articles table
    if (slug) {
      const upsertData = {
        slug,
        topic: topic || slug,
        title: articleContent.title || "",
        meta_description: articleContent.metaDescription || "",
        content: articleContent,
        category: "Golden Visa",
        read_time: articleContent.readTime || "7 min read",
        published: true,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabase
        .from("articles")
        .upsert(upsertData, { onConflict: "slug" });

      if (upsertError) {
        console.error("Failed to cache article:", upsertError);
      }
    }

    return new Response(JSON.stringify({ article: articleContent, fromCache: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("generate-article error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
