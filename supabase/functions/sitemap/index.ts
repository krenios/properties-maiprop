import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://properties.maiprop.co";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: properties } = await supabase
    .from("properties")
    .select("id, updated_at")
    .order("sort_order", { ascending: true });

  const today = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: `${BASE_URL}/`, changefreq: "weekly", priority: "1.0", lastmod: today },
    { loc: `${BASE_URL}/`, changefreq: "monthly", priority: "0.5", lastmod: today, hreflang: "zh", href: `${BASE_URL}/?lang=zh` },
    { loc: `${BASE_URL}/`, changefreq: "monthly", priority: "0.5", lastmod: today, hreflang: "ar", href: `${BASE_URL}/?lang=ar` },
  ];

  const propertyUrls = (properties || []).map((p) => ({
    loc: `${BASE_URL}/property/${p.id}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: p.updated_at ? p.updated_at.split("T")[0] : today,
  }));

  const allUrls = [staticUrls[0], ...propertyUrls];

  const urlEntries = allUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
