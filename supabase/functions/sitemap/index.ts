import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://properties.maiprop.co";

const HREFLANG_LOCALES = ["el", "ar", "ar-AE", "zh", "zh-CN", "ru", "fr", "hi", "he", "tr"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function hreflangBlock(path: string) {
  const clean = `${BASE_URL}${path}`;
  const lines = [
    `    <xhtml:link rel="alternate" hreflang="en"        href="${clean}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en-US"     href="${clean}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en-GB"     href="${clean}"/>`,
    ...HREFLANG_LOCALES.map((l) => {
      const langCode = l.split("-")[0];
      return `    <xhtml:link rel="alternate" hreflang="${l}"        href="${clean}?lang=${langCode}"/>`;
    }),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${clean}"/>`,
  ];
  return lines.join("\n");
}

function urlEntry({
  path,
  lastmod,
  changefreq,
  priority,
  withHreflang = false,
}: {
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  withHreflang?: boolean;
}) {
  return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${withHreflang ? "\n" + hreflangBlock(path) : ""}
  </url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const today = new Date().toISOString().split("T")[0];

  // Fetch properties and articles in parallel
  const [{ data: properties }, { data: articles }] = await Promise.all([
    supabase
      .from("properties")
      .select("id, updated_at, status, project_type")
      .order("sort_order", { ascending: true }),
    supabase
      .from("articles")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false }),
  ]);

  // Priority/changefreq helpers for properties
  const getPriority = (p: { status: string; project_type: string }) => {
    if (p.status === "available") return "0.9";
    if (p.status === "booked") return "0.8";
    if (p.project_type === "delivered") return "0.6";
    return "0.7";
  };
  const getChangefreq = (p: { status: string }) =>
    p.status === "available" || p.status === "booked" ? "weekly" : "monthly";

  // ── Static SEO pages (with full hreflang) ──────────────────────────────
  const staticPages = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/greek-golden-visa/", changefreq: "monthly", priority: "0.9" },
    { path: "/greek-golden-visa-requirements/", changefreq: "monthly", priority: "0.85" },
    { path: "/250k-golden-visa-properties/", changefreq: "weekly", priority: "0.9" },
    { path: "/guides/", changefreq: "weekly", priority: "0.8" },
    { path: "/golden-visa-journey/", changefreq: "monthly", priority: "0.85" },
    { path: "/process/", changefreq: "monthly", priority: "0.9" },
    { path: "/properties/", changefreq: "weekly", priority: "0.85" },
    { path: "/trackrecord/", changefreq: "monthly", priority: "0.8" },
    // SEO Landing Pages
    { path: "/buy-the-lifestyle/", changefreq: "monthly", priority: "0.8" },
    { path: "/greece-vs-portugal-golden-visa/", changefreq: "monthly", priority: "0.85" },
    { path: "/golden-visa-family-included/", changefreq: "monthly", priority: "0.85" },
    { path: "/golden-visa-rental-income-properties/", changefreq: "weekly", priority: "0.85" },
    { path: "/golden-visa-tax-benefits/", changefreq: "monthly", priority: "0.85" },
    { path: "/golden-visa-for-investors/", changefreq: "monthly", priority: "0.85" },
    { path: "/golden-visa-for-high-net-worth/", changefreq: "monthly", priority: "0.8" },
    { path: "/golden-visa-property-compliance/", changefreq: "monthly", priority: "0.8" },
    { path: "/is-golden-visa-worth-it/", changefreq: "monthly", priority: "0.85" },
    { path: "/greece-vs-dubai-golden-visa/", changefreq: "weekly", priority: "0.85" },
  ].map(({ path, changefreq, priority }) =>
    urlEntry({ path, lastmod: today, changefreq, priority, withHreflang: true })
  );

  // ── Published guide articles ────────────────────────────────────────────
  const guideEntries = (articles || []).map((a) => {
    const lastmod = a.updated_at ? a.updated_at.split("T")[0] : today;
    return urlEntry({
      path: `/guides/${a.slug}/`,
      lastmod,
      changefreq: "monthly",
      priority: "0.75",
      withHreflang: false,
    });
  });

  // ── Property pages ──────────────────────────────────────────────────────
  const propertyEntries = (properties || []).map((p) => {
    const lastmod = p.updated_at ? p.updated_at.split("T")[0] : today;
    return urlEntry({
      path: `/property/${p.id}/`,
      lastmod,
      changefreq: getChangefreq(p),
      priority: getPriority(p),
      withHreflang: false,
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.join("\n")}
${guideEntries.join("\n")}
${propertyEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
