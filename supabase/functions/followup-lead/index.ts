import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_URL = "https://properties.maiprop.co";
const LOGO_URL = "https://cqxcztafhnwkhxgaylne.supabase.co/storage/v1/object/public/email-assets/logo-new.png";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const CALENDLY_URL = "https://calendly.com/maipropos/consultation";

function brandWrap(innerHtml: string, ctaText: string, ctaHref: string): string {
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Inter','Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:0;">
    <!-- Header -->
    <div style="background:#000014;padding:28px 0;text-align:center;border-radius:8px 8px 0 0;">
      <img src="${LOGO_URL}" alt="mAI Prop" width="180" style="display:block;margin:0 auto;" />
    </div>

    <!-- Body -->
    <div style="background:#faf6f0;padding:32px 30px;border-radius:0 0 8px 8px;">
      ${innerHtml}
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:30px 0;">
      <a href="${ctaHref}" style="display:inline-block;background:#4ef5f1;color:#000014;font-weight:700;font-size:16px;padding:16px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
        ${ctaText}
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:0 0 20px;">
      <p style="margin:0 0 8px;font-size:13px;color:#777;">
        You received this because you submitted an inquiry on our platform.
      </p>
      <p style="margin:0;font-size:13px;color:#666;">
        © ${new Date().getFullYear()} mAI Prop · <a href="${SITE_URL}" style="color:#8755f2;text-decoration:none;">properties.maiprop.co</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildPropertyCardsHtml(properties: any[]): string {
  if (!properties.length) return "";
  return properties
    .map((p: any) => {
      const img = (p.images || [])[0] || "";
      const link = `${SITE_URL}/#property-${p.id}`;
      const priceStr = p.price ? `€${Number(p.price).toLocaleString()}` : "";
      const details = [
        p.size ? `${p.size}m²` : "",
        p.bedrooms ? `${p.bedrooms} bed${p.bedrooms > 1 ? "s" : ""}` : "",
        p.yield || "",
      ]
        .filter(Boolean)
        .join(" · ");
      return `
    <a href="${link}" style="display:block;text-decoration:none;margin:12px 0;border-radius:8px;overflow:hidden;border:1px solid #1a1e3a;">
      ${img ? `<img src="${img}" alt="${escapeHtml(p.title)}" width="460" style="display:block;width:100%;max-height:180px;object-fit:cover;" />` : ""}
      <div style="padding:14px 16px;background:#0f1340;">
        <p style="margin:0 0 4px;color:#4ef5f1;font-size:15px;font-weight:600;">${escapeHtml(p.title)}</p>
        <p style="margin:0 0 4px;color:#e0fafa;font-size:13px;">${escapeHtml(p.location)} ${priceStr ? `— ${priceStr}` : ""}</p>
        ${details ? `<p style="margin:0;color:#a0b0c0;font-size:12px;">${details}</p>` : ""}
      </div>
    </a>`;
    })
    .join("");
}

function textToHtml(text: string): string {
  return escapeHtml(text)
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("•")) {
        return `<div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span>${trimmed.slice(1).trim()}</div>`;
      }
      if (!trimmed) return "<br/>";
      return `<p style="margin:0 0 12px;color:#2a2318;font-size:16px;line-height:1.75;">${trimmed}</p>`;
    })
    .join("");
}

// Step 1: New property suggestions (different from initial followup)
async function generateStep1(lead: any, supabase: any, LOVABLE_API_KEY: string) {
  const budget = Number(lead.investment_budget) || 250000;

  // Get different properties - order by date_added to show newer ones
  const { data: props } = await supabase
    .from("properties")
    .select("id, title, location, price, size, bedrooms, yield, project_type, images, description")
    .eq("status", "available")
    .lte("price", budget * 1.3)
    .order("date_added", { ascending: false })
    .limit(4);

  const topProps = props || [];

  const budgetStr = `€${Number(lead.investment_budget).toLocaleString()}`;
  const prompt = `You are mAI Prop's investment advisor. Write a SHORT follow-up email (max 8 lines) for a Golden Visa lead who hasn't responded yet.

Lead: ${escapeHtml(lead.full_name)}, ${escapeHtml(lead.nationality)}, budget ${budgetStr}, prefers ${escapeHtml(lead.preferred_location || "Greece")}.

CRITICAL: Centre the entire email around their ${budgetStr} budget:
- Open by referencing their specific budget and what it unlocks right now
- Explain what ${budgetStr} can get them: apartment size, location tier, expected rental yield
- If budget is ≥€250k mention Golden Visa eligibility at this price point
- If budget is <€250k mention high-yield renovation flips or rental income strategies
- Mention that properties in this price range are moving fast
- End with invitation to book a 15-minute call to discuss ${budgetStr}-range options

Do NOT list specific property details. Property cards with images will appear below.
Do NOT use markdown. Plain text only. Sign off: "The mAI Prop Team"`;

  const aiText = await callAI(LOVABLE_API_KEY, prompt);
  const htmlContent = textToHtml(aiText);
  const cardsHtml = buildPropertyCardsHtml(topProps);
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);

  // Process overview section for Step 1
  const processHtml = `
    <div style="margin-top:20px;border-top:1px solid #e0d8cc;padding-top:16px;">
      <p style="margin:0 0 14px;color:#0a0e2a;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">📌 How It Works</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:12px 14px;background:#0f1340;border-radius:6px 6px 0 0;border-bottom:1px solid #1a1e3a;">
            <p style="margin:0 0 2px;color:#4ef5f1;font-size:22px;font-weight:700;">1</p>
            <p style="margin:0 0 2px;color:#e0fafa;font-size:14px;font-weight:600;">Free Consultation</p>
            <p style="margin:0;color:#a0b0c0;font-size:12px;">We discuss your goals, budget & timeline in a 30-min call.</p>
          </td>
          <td style="padding:12px 14px;background:#0f1340;border-radius:6px 6px 0 0;border-bottom:1px solid #1a1e3a;">
            <p style="margin:0 0 2px;color:#4ef5f1;font-size:22px;font-weight:700;">2</p>
            <p style="margin:0 0 2px;color:#e0fafa;font-size:14px;font-weight:600;">Property Selection</p>
            <p style="margin:0;color:#a0b0c0;font-size:12px;">We curate Golden Visa-eligible properties matching your criteria.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 14px;background:#0f1340;border-bottom:1px solid #1a1e3a;">
            <p style="margin:0 0 2px;color:#4ef5f1;font-size:22px;font-weight:700;">3</p>
            <p style="margin:0 0 2px;color:#e0fafa;font-size:14px;font-weight:600;">Legal & Renovation</p>
            <p style="margin:0;color:#a0b0c0;font-size:12px;">Our legal team handles the visa paperwork while we renovate your property.</p>
          </td>
          <td style="padding:12px 14px;background:#0f1340;border-radius:0 0 6px 6px;">
            <p style="margin:0 0 2px;color:#4ef5f1;font-size:22px;font-weight:700;">4</p>
            <p style="margin:0 0 2px;color:#e0fafa;font-size:14px;font-weight:600;">Residency & Returns</p>
            <p style="margin:0;color:#a0b0c0;font-size:12px;">Receive your Golden Visa and start earning rental income.</p>
          </td>
        </tr>
      </table>
    </div>`;

  const fullContent = htmlContent +
    (cardsHtml ? `<div style="margin-top:20px;border-top:1px solid #e0d8cc;padding-top:16px;"><p style="margin:0 0 10px;color:#0a0e2a;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">🏠 New Listings For You</p>${cardsHtml}</div>` : "") +
    processHtml;

  return {
    subject: `${firstName}, new properties just listed — don't miss out`,
    body: brandWrap(fullContent, "Book a Free Consultation →", "https://calendly.com/maipropos/consultation"),
  };
}

// Step 2: Consultation-focused with property highlights
async function generateStep2(lead: any, supabase: any, LOVABLE_API_KEY: string) {
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);
  const budgetStr = `€${Number(lead.investment_budget).toLocaleString()}`;

  const prompt = `You are mAI Prop's investment advisor. Write a SHORT follow-up email (max 10 lines total) to a Golden Visa lead. The PRIMARY goal is to get them to book a free consultation.

Lead: ${escapeHtml(lead.full_name)}, ${escapeHtml(lead.nationality)}, budget ${budgetStr}, prefers ${escapeHtml(lead.preferred_location || "Greece")}.

Format rules — follow EXACTLY:
1. One greeting line addressing them by first name
2. One sentence: "We've been reviewing opportunities in the ${budgetStr} range and have updates for you."
3. A short line: "Here are 3 opportunities matched to your profile:"
4. A bullet list of exactly 3 property opportunities:
   • Ideal Investment in a Historical Building, Thessaloniki — €325,000 · 3.5% yield
   • Family House in Agioi Anargiroi, Athens — €370,000 · Golden Visa eligible
   • Coastline Apartment in Glyfada, Athens — €320,000 · Premium coastal location
5. One sentence about why a consultation would help: "In a 15-minute call, we'll walk you through the numbers, rental projections, and visa timeline for these properties."
6. Sign off: "The mAI Prop Team"

Use bullet character • for list items. Do NOT use markdown. Plain text only. Keep it consultation-focused.`;

  const aiText = await callAI(LOVABLE_API_KEY, prompt);

  if (aiText) {
    const htmlContent = textToHtml(aiText);
    return {
      subject: `${firstName}, we've matched 3 properties to your profile — let's talk`,
      body: brandWrap(htmlContent, "Book Your Free Consultation →", CALENDLY_URL),
    };
  }

  // Fallback
  return {
    subject: `${firstName}, we've matched 3 properties to your profile — let's talk`,
    body: brandWrap(getStep2FallbackHtml(lead), "Book Your Free Consultation →", CALENDLY_URL),
  };
}

function getStep2FallbackHtml(lead: any): string {
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);
  return `
    <p style="margin:0 0 12px;color:#2a2318;font-size:16px;line-height:1.75;">Hi ${firstName},</p>
    <p style="margin:0 0 14px;color:#2a2318;font-size:16px;line-height:1.75;">We've been reviewing opportunities in your budget range and have updates we'd love to share in a <strong>free consultation</strong>.</p>
    <p style="margin:0 0 10px;color:#2a2318;font-size:16px;line-height:1.75;font-weight:600;">Here are 3 opportunities matched to your profile:</p>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Historical Building, Thessaloniki</strong> — €325,000 · 3.5% rental yield</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Family House, Agioi Anargiroi</strong> — €370,000 · Golden Visa eligible</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Coastline Apartment, Glyfada</strong> — €320,000 · Premium coastal location</div>
    <p style="margin:14px 0 10px;color:#2a2318;font-size:16px;line-height:1.75;">In a 15-minute call, we'll walk you through the numbers, rental projections, and visa timeline for these properties.</p>
    <p style="margin:0;color:#2a2318;font-size:16px;line-height:1.75;">Warm regards,<br/>The mAI Prop Team</p>
  `;
}

// Step 3: Final push — urgency + consultation booking
async function generateStep3(lead: any, supabase: any, LOVABLE_API_KEY: string) {
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);
  const budgetStr = `€${Number(lead.investment_budget).toLocaleString()}`;

  const prompt = `You are mAI Prop's senior Golden Visa advisor. Write a SHORT final follow-up email (max 10 lines total) for a lead who hasn't booked a consultation yet. The PRIMARY goal is to get them to book NOW.

Lead: ${escapeHtml(lead.full_name)}, ${escapeHtml(lead.nationality)}, budget ${budgetStr}.

Format rules — follow EXACTLY:
1. One greeting line addressing them by first name
2. One sentence creating gentle urgency: the Golden Visa threshold may increase and their ${budgetStr} budget qualifies now
3. A short line: "Quick reminder of opportunities still available for you:"
4. A bullet list of exactly 3 property opportunities:
   • Ideal Investment in a Historical Building, Thessaloniki — €325,000 · 3.5% yield
   • Family House in Agioi Anargiroi, Athens — €370,000 · Golden Visa eligible
   • Coastline Apartment in Glyfada, Athens — €320,000 · Premium coastal location
5. Key benefits as bullets:
   • EU residency for your entire family
   • No minimum stay requirement
   • Passive rental income from day one
6. One closing sentence: "Let's lock this in — book a free 15-minute consultation and we'll create your personalised investment plan."
7. Sign off: "The mAI Prop Team"

Use bullet character • for list items. Do NOT use markdown. Plain text only. Keep it urgent and consultation-focused.`;

  const aiText = await callAI(LOVABLE_API_KEY, prompt);

  if (aiText) {
    const htmlContent = textToHtml(aiText);
    return {
      subject: `${firstName}, last chance — your Golden Visa portfolio is waiting`,
      body: brandWrap(htmlContent, "Book Your Free Consultation →", CALENDLY_URL),
    };
  }

  // Fallback
  return {
    subject: `${firstName}, last chance — your Golden Visa portfolio is waiting`,
    body: brandWrap(getStep3FallbackHtml(lead), "Book Your Free Consultation →", CALENDLY_URL),
  };
}

function getStep3FallbackHtml(lead: any): string {
  const firstName = escapeHtml(lead.full_name.split(" ")[0]);
  return `
    <p style="margin:0 0 12px;color:#2a2318;font-size:16px;line-height:1.75;">Hi ${firstName},</p>
    <p style="margin:0 0 14px;color:#2a2318;font-size:16px;line-height:1.75;">The Golden Visa threshold may increase soon — your budget qualifies <strong>now</strong>, but this window won't last.</p>
    <p style="margin:0 0 10px;color:#2a2318;font-size:16px;line-height:1.75;font-weight:600;">Quick reminder of opportunities still available for you:</p>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Historical Building, Thessaloniki</strong> — €325,000 · 3.5% rental yield</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Family House, Agioi Anargiroi</strong> — €370,000 · Golden Visa eligible</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span><strong>Coastline Apartment, Glyfada</strong> — €320,000 · Premium coastal location</div>
    <br/>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span>EU residency for your entire family</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span>No minimum stay requirement</div>
    <div style="padding:6px 0 6px 20px;position:relative;color:#2a2318;font-size:16px;line-height:1.75;"><span style="color:#0a0e2a;font-weight:bold;position:absolute;left:0;">•</span>Passive rental income from day one</div>
    <p style="margin:14px 0 10px;color:#2a2318;font-size:16px;line-height:1.75;">Let's lock this in — book a free 15-minute consultation and we'll create your personalised investment plan.</p>
    <p style="margin:0;color:#2a2318;font-size:16px;line-height:1.75;">Warm regards,<br/>The mAI Prop Team</p>
  `;
}

async function callAI(apiKey: string, prompt: string): Promise<string> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
    if (!response.ok) throw new Error(`AI error: ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "";
  } catch (e) {
    console.error("AI call failed:", e);
    return "";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead_id, step, preview_only } = await req.json();

    if (!lead_id || typeof lead_id !== "string") {
      return new Response(JSON.stringify({ error: "Missing lead_id" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (![1, 2, 3].includes(step)) {
      return new Response(JSON.stringify({ error: "Step must be 1, 2, or 3" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: lead, error: dbError } = await supabase.from("leads").select("*").eq("id", lead_id).single();
    if (dbError || !lead) {
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const BREVO_API_KEY = Deno.env.get("brevo");
    if (!BREVO_API_KEY && !preview_only) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") || "";

    let result: { subject: string; body: string };

    if (step === 1) {
      result = await generateStep1(lead, supabase, LOVABLE_API_KEY);
    } else if (step === 2) {
      result = await generateStep2(lead, supabase, LOVABLE_API_KEY);
    } else {
      result = await generateStep3(lead, supabase, LOVABLE_API_KEY);
    }

    // Fallback if AI failed
    if (!result.body) {
      const firstName = escapeHtml(lead.full_name.split(" ")[0]);
      result = {
        subject: `${firstName}, an update from mAI Prop`,
        body: brandWrap(
          `<p style="margin:0 0 8px;color:#e0fafa;font-size:15px;line-height:1.6;">Hi ${firstName},</p>
           <p style="margin:0 0 8px;color:#e0fafa;font-size:15px;line-height:1.6;">We wanted to follow up on your Golden Visa inquiry. Our team has curated a selection of properties that match your investment profile.</p>
           <p style="margin:0;color:#e0fafa;font-size:15px;line-height:1.6;">We'd love to schedule a call — reply to this email or visit our website.</p>
           <p style="margin:12px 0 0;color:#e0fafa;font-size:15px;">Warm regards,<br/>The mAI Prop Team</p>`,
          "Browse Our Portfolio →",
          `${SITE_URL}/#opportunities`
        ),
      };
    }

    // Preview mode — return HTML without sending
    if (preview_only) {
      return new Response(JSON.stringify({ success: true, preview: true, subject: result.subject, html: result.body }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send via Brevo
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY!,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "mAI Prop", email: "kr@maiprop.co" },
        to: [{ email: lead.email, name: lead.full_name }],
        subject: result.subject,
        htmlContent: result.body,
      }),
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      console.error("Brevo error:", JSON.stringify(emailData));
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update followup_step and mark as contacted if still new
    await supabase
      .from("leads")
      .update({ followup_step: step, ...(lead.status === "new" ? { status: "contacted" } : {}) })
      .eq("id", lead_id);

    return new Response(JSON.stringify({ success: true, step, email_id: emailData.id }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Followup error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
