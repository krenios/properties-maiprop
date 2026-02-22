import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_URL = "https://properties.maiprop.co";

function brandWrap(innerHtml: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:0;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#080b1f 0%,#12153a 100%);padding:32px 24px;text-align:center;border-radius:0 0 8px 8px;">
      <img src="https://os.maiprop.co/wp-content/uploads/2024/10/logo.webp" alt="mAI Prop" width="140" style="display:block;margin:0 auto;" />
      <p style="margin:6px 0 0;font-size:11px;color:#9b87f5;letter-spacing:3px;text-transform:uppercase;">Golden Visa Real Estate</p>
    </div>

    <!-- Body -->
    <div style="padding:28px 24px;color:#1a1a2e;font-size:15px;line-height:1.7;">
      ${innerHtml}
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:0 24px 28px;">
      <a href="${SITE_URL}/#opportunities" style="display:inline-block;background:linear-gradient(135deg,#4dd0c8,#9b87f5);color:#ffffff;font-weight:600;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">
        Browse Our Portfolio →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#f8f9fa;padding:20px 24px;text-align:center;border-radius:8px 8px 0 0;">
      <p style="margin:0 0 8px;font-size:12px;color:#888;">
        <a href="${SITE_URL}" style="color:#4dd0c8;text-decoration:none;font-weight:600;">properties.maiprop.co</a>
      </p>
      <p style="margin:0;font-size:11px;color:#aaa;">
        © ${new Date().getFullYear()} mAI Prop. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead, customMessage } = await req.json();

    if (!lead?.email || !lead?.full_name) {
      return new Response(JSON.stringify({ error: "Missing lead email or name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const firstName = escapeHtml(lead.full_name.split(" ")[0]);

    let subject: string;
    let htmlBody: string;

    if (customMessage) {
      // Admin wrote a custom message — wrap it in the branded template
      const htmlContent = escapeHtml(customMessage)
        .split("\n")
        .map((line: string) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("•")) {
            return `<div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>${trimmed.slice(1).trim()}</div>`;
          }
          if (!trimmed) return "<br/>";
          return `<p style="margin:0 0 8px;">${trimmed}</p>`;
        })
        .join("");
      subject = `${firstName}, a message from mAI Prop`;
      htmlBody = brandWrap(htmlContent);
    } else {
      // Auto-generate a follow-up email using AI
      if (LOVABLE_API_KEY) {
        try {
          const prompt = `You are mAI Prop's investment advisor. Write a SHORT follow-up email (max 8 lines) for a Golden Visa lead we're contacting from our CRM.

Lead: ${lead.full_name}, ${lead.nationality}, budget €${Number(lead.investment_budget).toLocaleString()}, prefers ${lead.preferred_location || "Greece"}, interested in ${lead.property_type || "properties"}, timeline: ${lead.investment_timeline || "flexible"}.

Format rules — follow EXACTLY:
1. One greeting line addressing them by first name
2. One sentence: we reviewed their profile and have matching opportunities
3. A bullet list (3-4 bullets) highlighting relevant properties from our inventory:
   • Visa-eligible apartments & villas from €250K
   • Pre-verified properties in Athens, Thessaloniki & islands
   • Full legal, renovation & rental management
   • 3%+ annual returns with proven track record
4. One closing sentence inviting them to schedule a call
5. Sign off: "The mAI Prop Team"

Use bullet character • for list items. Do NOT use markdown. Plain text only. Keep it punchy and professional.`;

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-lite",
              messages: [
                { role: "system", content: "You write ultra-concise, professional emails for a luxury real estate firm. Output only the email body. No subject line. No markdown." },
                { role: "user", content: prompt },
              ],
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const aiText = data.choices?.[0]?.message?.content?.trim() || "";
            if (aiText) {
              const htmlContent = escapeHtml(aiText)
                .split("\n")
                .map((line: string) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("•")) {
                    return `<div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>${trimmed.slice(1).trim()}</div>`;
                  }
                  if (!trimmed) return "<br/>";
                  return `<p style="margin:0 0 8px;">${trimmed}</p>`;
                })
                .join("");
              subject = `${firstName}, we have properties matching your criteria — mAI Prop`;
              htmlBody = brandWrap(htmlContent);
            }
          }
        } catch (e) {
          console.error("AI generation failed:", e);
        }
      }

      // Fallback if AI failed
      if (!htmlBody!) {
        const fallback = `
          <p style="margin:0 0 8px;">Hi ${firstName},</p>
          <p style="margin:0 0 12px;">We've reviewed your profile and have curated investment opportunities that match your criteria:</p>
          <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Visa-eligible apartments & villas from €250K</div>
          <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Pre-verified properties in Athens, Thessaloniki & the islands</div>
          <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Full legal, renovation & rental management</div>
          <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>3%+ annual returns with a proven track record</div>
          <p style="margin:12px 0 8px;">We'd love to schedule a quick call to walk you through the options. Let us know a time that works for you.</p>
          <p style="margin:0;">Warm regards,<br/>The mAI Prop Team</p>
        `;
        subject = `${firstName}, we have properties matching your criteria — mAI Prop`;
        htmlBody = brandWrap(fallback);
      }
    }

    // Send via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "mAI Prop <onboarding@resend.dev>",
        to: [lead.email],
        subject: subject!,
        html: htmlBody!,
      }),
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      console.error("Resend error:", JSON.stringify(emailData));
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, email_id: emailData.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Contact lead error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
