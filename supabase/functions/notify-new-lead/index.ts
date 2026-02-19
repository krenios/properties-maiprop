import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_EMAIL = "kostisrenios@gmail.com"; // Switch to kr@maiprop.co after domain verification

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lead = await req.json();

    const results = { email_sent: false, telegram_sent: false };

    // ---- Email via Resend ----
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
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
