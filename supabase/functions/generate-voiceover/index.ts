import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireAdmin } from "../_shared/admin-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const auth = await requireAdmin(req, corsHeaders);
  if (!auth.ok) return auth.response;

  const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
  if (!ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { text, voice_id, speed } = await req.json();

  // Input validation: cap text length and constrain voice_id to an allow-list
  if (typeof text !== "string" || text.trim().length === 0 || text.length > 2000) {
    return new Response(JSON.stringify({ error: "text must be a non-empty string ≤ 2000 chars" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const ALLOWED_VOICES = new Set([
    "onwK4e9ZLuTAKqWW03F9", // Daniel
    "9BWtsMINqrJLrRacOk9x", // Aria
    "CwhRBWXzGAHq8TQ4Fs17", // Roger
    "EXAVITQu4vr4xnSDxMaL", // Sarah
    "FGY2WhTYpPnrIDTdsKH5", // Laura
    "IKne3meq5aSn9XLyUdCD", // Charlie
    "JBFqnCBsd6RMkjVDRZzb", // George
    "N2lVS1w4EtoT3dr4eOWO", // Callum
    "TX3LPaxmHKxFdv7VOQHJ", // Liam
    "XB0fDUnXU5powFXDhCwa", // Charlotte
    "Xb7hH8MSUJpSbSDYk0k2", // Alice
    "cgSgspJ2msm6clMCkdW9", // Jessica
    "iP95p4xoKVk53GoZ742B", // Chris
    "nPczCjzI2devNBz1zQrb", // Brian
    "onwK4e9ZLuTAKqWW03F9", // Daniel
    "pFZP5JQG7iQjIQuC4Bku", // Lily
    "pqHfZKP75CvOlQylNhV4", // Bill
  ]);
  if (voice_id !== undefined && (typeof voice_id !== "string" || !ALLOWED_VOICES.has(voice_id))) {
    return new Response(JSON.stringify({ error: "Invalid voice_id" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const voiceId = voice_id || "onwK4e9ZLuTAKqWW03F9"; // Daniel - sophisticated British

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
          speed: speed || 0.9,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    return new Response(JSON.stringify({ error: err }), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const audioBuffer = await response.arrayBuffer();
  return new Response(audioBuffer, {
    headers: {
      ...corsHeaders,
      "Content-Type": "audio/mpeg",
    },
  });
});
