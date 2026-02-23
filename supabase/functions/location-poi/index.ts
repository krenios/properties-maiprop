import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALL_POI = [
  "Airport",
  "Sea",
  "Ports",
  "Train Stations",
  "Motorway Access",
  "Schools",
  "Supermarket",
  "Pharmacies",
  "Hospitals",
  "Parthenon",
  "Parks",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    if (!location) {
      return new Response(JSON.stringify({ error: "location is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are a geography expert about Greece. Given the location "${location}, Greece", determine which of the following points of interest are realistically nearby or easily accessible from this area. Consider a reasonable radius (within ~30 min drive or closer).

Points of Interest to evaluate:
${ALL_POI.map((p) => `- ${p}`).join("\n")}

Return ONLY the ones that are relevant. For example, "Parthenon" is only relevant for Athens area properties. "Sea" is relevant for coastal locations. "Airport" is relevant if there's an airport within reasonable distance.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "You determine which points of interest are near a Greek location. Respond using the provided tool.",
            },
            { role: "user", content: prompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_relevant_poi",
                description:
                  "Return the list of relevant points of interest for this location",
                parameters: {
                  type: "object",
                  properties: {
                    relevant_poi: {
                      type: "array",
                      items: { type: "string", enum: ALL_POI },
                      description:
                        "The POI names that are relevant to this location",
                    },
                  },
                  required: ["relevant_poi"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "return_relevant_poi" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      // Fallback: return all POIs
      return new Response(JSON.stringify({ poi: ALL_POI }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const args = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ poi: args.relevant_poi || ALL_POI }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback
    return new Response(JSON.stringify({ poi: ALL_POI }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("location-poi error:", e);
    return new Response(
      JSON.stringify({ poi: ALL_POI, error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
