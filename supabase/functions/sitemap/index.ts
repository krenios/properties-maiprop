import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://properties.maiprop.co";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: properties } = await supabase
    .from("properties")
    .select("id, updated_at, status, project_type")
    .order("sort_order", { ascending: true });

  const today = new Date().toISOString().split("T")[0];

  // Priority by status and type
  const getPriority = (p: { status: string; project_type: string }) => {
    if (p.status === "available") return "0.9";
    if (p.status === "booked") return "0.8";
    if (p.project_type === "delivered") return "0.6";
    return "0.7";
  };

  const getChangefreq = (p: { status: string }) => {
    if (p.status === "available" || p.status === "booked") return "weekly";
    return "monthly";
  };

  // Static homepage entry with hreflang alternates
  const homepageBlock = `  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${BASE_URL}/?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>
  </url>`;

  const propertyEntries = (properties || []).map((p) => {
    const lastmod = p.updated_at ? p.updated_at.split("T")[0] : today;
    const priority = getPriority(p);
    const changefreq = getChangefreq(p);
    const loc = `${BASE_URL}/property/${p.id}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homepageBlock}
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
