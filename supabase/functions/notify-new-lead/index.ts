import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_EMAIL = "kostisrenios@gmail.com"; // Switch to kr@maiprop.co after domain verification

async function generateLeadEmail(lead: any): Promise<{ subject: string; body: string }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.error("LOVABLE_API_KEY not configured, using fallback email");
    return {
      subject: `Welcome to mAI Prop — Your Golden Visa Journey Starts Here`,
      body: getFallbackEmailHtml(lead),
    };
  }

  try {
    const prompt = `You are a professional investment consultant at mAI Prop, a Greek Golden Visa real estate company.

Write a warm, personalized welcome email for a new lead. Keep it professional but friendly, 3-4 short paragraphs max.

Lead details:
- Name: ${lead.full_name}
- Nationality: ${lead.nationality}
- Budget: €${Number(lead.investment_budget).toLocaleString()}
- Preferred location: ${lead.preferred_location || "not specified"}
- Property type: ${lead.property_type || "not specified"}
- Timeline: ${lead.investment_timeline || "not specified"}

Guidelines:
- Address them by first name
- Acknowledge their interest in the Greek Golden Visa program
- Reference their budget range and location preference naturally
- Mention that a dedicated advisor will reach out within 24 hours
- Keep the tone confident and welcoming, not salesy
- Do NOT use markdown — write plain text only
- Sign off as "The mAI Prop Team"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "You write professional, concise emails for a real estate investment company. Output only the email body text, no subject line." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      return { subject: `Welcome to mAI Prop — Your Golden Visa Journey Starts Here`, body: getFallbackEmailHtml(lead) };
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content?.trim() || "";

    if (!aiText) {
      return { subject: `Welcome to mAI Prop — Your Golden Visa Journey Starts Here`, body: getFallbackEmailHtml(lead) };
    }

    const firstName = lead.full_name.split(" ")[0];
    const subject = `Welcome ${firstName} — Your Greek Golden Visa Journey with mAI Prop`;
    const bodyHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a2e;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; color: #4dd0c8; margin: 0;">mAI Prop</h1>
          <p style="font-size: 12px; color: #888; margin-top: 4px; letter-spacing: 2px; text-transform: uppercase;">Golden Visa Real Estate</p>
        </div>
        <div style="line-height: 1.7; font-size: 15px; white-space: pre-line;">${escapeHtml(aiText)}</div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          mAI Prop — Greek Golden Visa Real Estate<br/>
          This email was sent because you submitted an inquiry on our platform.
        </p>
      </div>
    `;

    return { subject, body: bodyHtml };
  } catch (e) {
    console.error("AI email generation failed:", e);
    return { subject: `Welcome to mAI Prop — Your Golden Visa Journey Starts Here`, body: getFallbackEmailHtml(lead) };
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function getFallbackEmailHtml(lead: any): string {
  const firstName = lead.full_name.split(" ")[0];
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a2e;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 24px; color: #4dd0c8; margin: 0;">mAI Prop</h1>
        <p style="font-size: 12px; color: #888; margin-top: 4px; letter-spacing: 2px; text-transform: uppercase;">Golden Visa Real Estate</p>
      </div>
      <p style="line-height: 1.7; font-size: 15px;">Dear ${escapeHtml(firstName)},</p>
      <p style="line-height: 1.7; font-size: 15px;">Thank you for your interest in the Greek Golden Visa program. We've received your inquiry and a dedicated investment advisor will be in touch within 24 hours to discuss your goals.</p>
      <p style="line-height: 1.7; font-size: 15px;">In the meantime, feel free to explore our portfolio of visa-eligible properties on our platform.</p>
      <p style="line-height: 1.7; font-size: 15px;">Warm regards,<br/>The mAI Prop Team</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        mAI Prop — Greek Golden Visa Real Estate<br/>
        This email was sent because you submitted an inquiry on our platform.
      </p>
    </div>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lead = await req.json();

    const results = { email_sent: false, telegram_sent: false, lead_email_sent: false };

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    // ---- AI-Powered Welcome Email to Lead ----
    if (RESEND_API_KEY && lead.email) {
      try {
        const { subject, body } = await generateLeadEmail(lead);
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
            html: body,
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
    if (RESEND_API_KEY) {
      const emailHtml = `
        <h2>🔔 New Lead Received</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${lead.full_name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Nationality</td><td style="padding:6px 12px;">${lead.nationality}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Budget</td><td style="padding:6px 12px;">€${Number(lead.investment_budget).toLocaleString()}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Location</td><td style="padding:6px 12px;">${lead.preferred_location || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Type</td><td style="padding:6px 12px;">${lead.property_type || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Timeline</td><td style="padding:6px 12px;">${lead.investment_timeline || "—"}</td></tr>
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
            subject: `🏠 New Lead: ${lead.full_name} — €${Number(lead.investment_budget).toLocaleString()}`,
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
        const tgRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramText,
              parse_mode: "Markdown",
            }),
          }
        );
        const tgData = await tgRes.json();
        results.telegram_sent = tgData.ok === true;
        if (!tgData.ok) console.error("Telegram error:", JSON.stringify(tgData));
      } catch (e) {
        console.error("Telegram send failed:", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, ...results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Notification error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});