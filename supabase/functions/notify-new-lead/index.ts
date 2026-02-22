import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_URL = "https://properties.maiprop.co";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function brandWrap(innerHtml: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:0;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#080b1f 0%,#12153a 100%);padding:32px 24px;text-align:center;border-radius:0 0 8px 8px;">
      <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
        <span style="color:#4dd0c8;">mAI</span> <span style="color:#ffffff;">Prop</span>
      </h1>
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
        © ${new Date().getFullYear()} mAI Prop. You received this because you submitted an inquiry on our platform.
      </p>
    </div>
  </div>
</body>
</html>`;
}

async function generateLeadEmail(lead: any): Promise<{ subject: string; body: string }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.error("LOVABLE_API_KEY not configured, using fallback email");
    return {
      subject: `Welcome to mAI Prop — Your Golden Visa Journey Starts Here`,
      body: brandWrap(getFallbackInnerHtml(lead)),
    };
  }

  try {
    const prompt = `You are mAI Prop's investment assistant. Write a SHORT welcome email (max 8 lines total) for a new Golden Visa lead.

Lead: ${escapeHtml(lead.full_name)}, ${escapeHtml(lead.nationality)}, budget €${Number(lead.investment_budget).toLocaleString()}, prefers ${escapeHtml(lead.preferred_location || "Greece")}, interested in ${escapeHtml(lead.property_type || "properties")}, timeline: ${escapeHtml(lead.investment_timeline || "flexible")}.

Format rules — follow EXACTLY:
1. One greeting line addressing them by first name (e.g. "Hi Kostis,")
2. One sentence acknowledging their interest
3. A bullet list (3-4 bullets) of what we offer, focusing on our property inventory:
   • Visa-eligible apartments from €250K
   • Pre-verified properties in Athens & Thessaloniki  
   • Full legal, renovation & rental management
   • 3%+ annual returns with proven track record
4. One closing sentence: advisor will reach out within 24 hours
5. Sign off: "The mAI Prop Team"

Use bullet character • for list items. Do NOT use markdown. Plain text only. Keep it punchy.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You write ultra-concise, professional emails for a luxury real estate firm. Output only the email body. No subject line. No markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      return { subject: `Welcome to mAI Prop — Your Golden Visa Journey`, body: brandWrap(getFallbackInnerHtml(lead)) };
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content?.trim() || "";

    if (!aiText) {
      return { subject: `Welcome to mAI Prop — Your Golden Visa Journey`, body: brandWrap(getFallbackInnerHtml(lead)) };
    }

    // Convert bullet lines to styled HTML
    const htmlContent = escapeHtml(aiText)
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("•")) {
          return `<div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>${trimmed.slice(1).trim()}</div>`;
        }
        if (!trimmed) return "<br/>";
        return `<p style="margin:0 0 8px;">${trimmed}</p>`;
      })
      .join("");

    const firstName = escapeHtml(lead.full_name.split(" ")[0]);
    const subject = `${firstName}, your Golden Visa portfolio is ready — mAI Prop`;

    return { subject, body: brandWrap(htmlContent) };
  } catch (e) {
    console.error("AI email generation failed:", e);
    return { subject: `Welcome to mAI Prop — Your Golden Visa Journey`, body: brandWrap(getFallbackInnerHtml(lead)) };
  }
}

function getFallbackInnerHtml(lead: any): string {
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);
  return `
    <p style="margin:0 0 8px;">Hi ${firstName},</p>
    <p style="margin:0 0 12px;">Thank you for your interest in the Greek Golden Visa. Here's what we have ready for you:</p>
    <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Visa-eligible apartments & villas from €250K</div>
    <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Pre-verified properties in Athens, Thessaloniki & the islands</div>
    <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>Full legal, renovation & rental management</div>
    <div style="padding:4px 0 4px 16px;position:relative;"><span style="color:#4dd0c8;font-weight:bold;position:absolute;left:0;">•</span>8%+ annual returns with a proven track record</div>
    <p style="margin:12px 0 8px;">A dedicated advisor will reach out within 24 hours.</p>
    <p style="margin:0;">Warm regards,<br/>The mAI Prop Team</p>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Accept either a lead_id (preferred) or full lead object (legacy)
    let lead: any;

    if (body.lead_id && typeof body.lead_id === "string") {
      // Validate lead against database
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: dbLead, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", body.lead_id)
        .single();

      if (error || !dbLead) {
        return new Response(JSON.stringify({ error: "Lead not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      lead = dbLead;
    } else if (body.full_name && body.email) {
      // Legacy: validate required fields and sanitize
      lead = body;
      if (typeof lead.full_name !== "string" || lead.full_name.length > 100) {
        return new Response(JSON.stringify({ error: "Invalid name" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (typeof lead.email !== "string" || lead.email.length > 255) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (typeof lead.phone !== "string" || lead.phone.length > 20) {
        return new Response(JSON.stringify({ error: "Invalid phone" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Missing lead_id or lead data" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const NOTIFY_EMAIL = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
    const results = { email_sent: false, telegram_sent: false, lead_email_sent: false };

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    // ---- AI-Powered Welcome Email to Lead ----
    if (RESEND_API_KEY && lead.email) {
      try {
        const { subject, body: emailBody } = await generateLeadEmail(lead);
        const leadEmailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MAI Prop <onboarding@resend.dev>",
            to: [lead.email],
            subject,
            html: emailBody,
          }),
        });
        const leadEmailData = await leadEmailRes.json();
        results.lead_email_sent = leadEmailRes.ok;
        if (!leadEmailRes.ok) console.error("Lead email error:", JSON.stringify(leadEmailData));
      } catch (e) {
        console.error("Lead email failed:", e);
      }
    }

    // ---- Admin Notification Email via Resend ----
    if (RESEND_API_KEY && NOTIFY_EMAIL) {
      const emailHtml = `
        <h2>🔔 New Lead Received</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escapeHtml(lead.full_name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${escapeHtml(lead.phone)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${escapeHtml(lead.email)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Nationality</td><td style="padding:6px 12px;">${escapeHtml(lead.nationality)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Budget</td><td style="padding:6px 12px;">€${Number(lead.investment_budget).toLocaleString()}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Location</td><td style="padding:6px 12px;">${escapeHtml(lead.preferred_location || "—")}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Type</td><td style="padding:6px 12px;">${escapeHtml(lead.property_type || "—")}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Timeline</td><td style="padding:6px 12px;">${escapeHtml(lead.investment_timeline || "—")}</td></tr>
        </table>
      `;

      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MAI Prop <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject: `🏠 New Lead: ${escapeHtml(lead.full_name)} — €${Number(lead.investment_budget).toLocaleString()}`,
            html: emailHtml,
          }),
        });
        const emailData = await emailRes.json();
        results.email_sent = emailRes.ok;
        if (!emailRes.ok) console.error("Resend error:", JSON.stringify(emailData));
      } catch (e) {
        console.error("Email send failed:", e);
      }
    }

    // ---- Telegram Bot ----
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramText = [
        `🔔 *New Lead Alert*`,
        ``,
        `*Name:* ${lead.full_name}`,
        `*Phone:* ${lead.phone}`,
        `*Email:* ${lead.email}`,
        `*Nationality:* ${lead.nationality}`,
        `*Budget:* €${Number(lead.investment_budget).toLocaleString()}`,
        `*Location:* ${lead.preferred_location || "—"}`,
        `*Type:* ${lead.property_type || "—"}`,
        `*Timeline:* ${lead.investment_timeline || "—"}`,
      ].join("\n");

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: "Markdown",
          }),
        });
        const tgData = await tgRes.json();
        results.telegram_sent = tgData.ok === true;
        if (!tgData.ok) console.error("Telegram error:", JSON.stringify(tgData));
      } catch (e) {
        console.error("Telegram send failed:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, ...results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Notification error:", error);
    return new Response(JSON.stringify({ success: false, error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});