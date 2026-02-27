import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Maximize, Bed, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { optimizeImage } from "@/lib/optimizeImage";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useNavigate } from "react-router-dom";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/250k-golden-visa-properties/`;

const offerLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "€250K Golden Visa Properties in Greece",
  "description": "Pre-verified Greek real estate investment properties eligible for the Golden Visa program.",
  "url": `${BASE_URL}/250k-golden-visa-properties/`,
  "provider": {
    "@type": "RealEstateAgent",
    "name": "mAI Prop",
    "url": BASE_URL,
    "areaServed": [
      { "@type": "City", "name": "Athens" },
      { "@type": "City", "name": "Piraeus" },
      { "@type": "City", "name": "Glyfada" }
    ]
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "250000",
    "offerCount": "10+",
    "eligibleRegion": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "China" }
    ]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "€250K Golden Visa Properties in Greece",
  "description": "Browse pre-verified Greek real estate investment properties starting at €250,000 — eligible for the Golden Visa residency program.",
  "url": PAGE_URL,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": BASE_URL + "/greek-golden-visa/" },
      { "@type": "ListItem", "position": 3, "name": "€250K Properties", "item": PAGE_URL },
    ],
  },
};

const statusColors: Record<string, string> = {
  available: "bg-primary/20 text-primary border-primary/30",
  booked: "bg-secondary/20 text-secondary border-secondary/30",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
  "under-construction": "bg-muted/30 text-muted-foreground border-muted-foreground/30",
};

interface Property {
  id: string;
  title: string;
  location: string;
  price: number | null;
  size: number | null;
  bedrooms: number | null;
  yield: string;
  status: string;
  images: string[];
  tags: string[];
  project_type: string;
}

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("properties")
      .select("id, title, location, price, size, bedrooms, yield, status, images, tags, project_type")
      .eq("project_type", "current")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setProperties((data as Property[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>€250K Golden Visa Properties Greece — Pre-Verified Investments | mAI Investments</title>
        <meta name="description" content="Browse €250,000+ Golden Visa eligible properties in Athens, Piraeus, Glyfada & the Athenian Riviera. Pre-verified, rental-ready real estate for EU residency." />
        <meta name="keywords" content="250000 Golden Visa Greece, €250K Golden Visa property, Greece investment property, Athens Golden Visa, Golden Visa real estate Greece, affordable Golden Visa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        {/* Hreflang — all supported languages */}
        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB" href={PAGE_URL} />
        <link rel="alternate" hrefLang="el" href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="zh" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="ru" href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="fr" href={`${PAGE_URL}?lang=fr`} />
        <link rel="alternate" hrefLang="hi" href={`${PAGE_URL}?lang=hi`} />
        <link rel="alternate" hrefLang="he" href={`${PAGE_URL}?lang=he`} />
        <link rel="alternate" hrefLang="tr" href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="€250K Golden Visa Properties Greece — Pre-Verified Investments" />
        <meta property="og:description" content="Browse €250,000+ Golden Visa eligible properties in Athens and the Athenian Riviera. Rental-ready real estate for EU residency." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(offerLd)}</script>
      </Helmet>

      <Navbar forceScrolled />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/greek-golden-visa/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">Greek Golden Visa</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-foreground" itemProp="name">€250K Properties</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Pre-Verified Investment Properties
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            €250K{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Golden Visa Properties
            </span>{" "}
            in Greece
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Hand-picked, pre-verified properties in Athens, Piraeus, Glyfada, and the Athenian Riviera — each qualifying for the <strong className="text-foreground">Greek Golden Visa program</strong> starting at €250,000. All properties are renovated and rental-ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("250k-properties")}>
              Request Property Info <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements/">View Requirements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Properties grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-2xl font-bold">Available Investment Properties</h2>
          <p className="mb-10 text-muted-foreground">All listings are pre-verified, Golden Visa eligible, and managed by mAI Investments.</p>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 rounded-2xl border border-border bg-background/40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => {
                const img = p.images?.[0];
                return (
                  <article
                    key={p.id}
                    className="group cursor-pointer rounded-2xl border border-border bg-background/40 overflow-hidden hover:border-primary/30 transition-all hover:shadow-[0_0_30px_hsl(179_90%_63%/0.08)]"
                    onClick={() => navigate(`/property/${p.id}`)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {img ? (
                        <img
                          src={optimizeImage(img, { width: 600, height: 450 })}
                          alt={`${p.title} — €250K Golden Visa property in ${p.location}, Greece`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          width={600}
                          height={450}
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                      {p.status && (
                        <Badge className={`absolute left-3 top-3 border text-xs ${statusColors[p.status] || ""}`}>
                          {p.status.replace("-", " ")}
                        </Badge>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-base leading-snug mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3" /> {p.location}, Greece
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.price && (
                          <Badge variant="outline" className="rounded-full text-xs gap-1">
                            <span className="font-bold text-primary">€{p.price.toLocaleString()}</span>
                          </Badge>
                        )}
                        {p.size && (
                          <Badge variant="outline" className="rounded-full text-xs gap-1">
                            <Maximize className="h-3 w-3 text-muted-foreground" /> {p.size} m²
                          </Badge>
                        )}
                        {p.bedrooms && (
                          <Badge variant="outline" className="rounded-full text-xs gap-1">
                            <Bed className="h-3 w-3 text-muted-foreground" /> {p.bedrooms} bd
                          </Badge>
                        )}
                        {p.yield && (
                          <Badge variant="outline" className="rounded-full text-xs gap-1">
                            <TrendingUp className="h-3 w-3 text-muted-foreground" /> {p.yield}
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="w-full rounded-full text-xs">
                        View Property →
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && properties.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No properties currently available. <button className="text-primary underline" onClick={() => openWithLocation("250k-properties")}>Contact us</button> for off-market listings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why these properties */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">Why These Properties Qualify for the Golden Visa</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Pre-verified ownership titles", desc: "Every property undergoes a full title and encumbrance search before listing." },
              { title: "Golden Visa zone confirmed", desc: "We confirm whether the €250K or €400K threshold applies before you commit." },
              { title: "Renovation complete", desc: "Properties are fully renovated — no hidden costs or construction delays." },
              { title: "Rental income ready", desc: "Tenant placement or short-term rental management available from day one." },
              { title: "Legal support included", desc: "In-house legal team handles purchase, permit application, and renewals." },
              { title: "AI-powered due diligence", desc: "mAI Prop OS provides independent valuation and market reports for every listing." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background/40 p-5">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-2xl font-bold text-center">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
            <Link to="/greek-golden-visa/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Greek Golden Visa Guide</h3>
              <p className="mt-1 text-xs text-muted-foreground">Full overview of the program, benefits, and process.</p>
            </Link>
            <Link to="/greek-golden-visa-requirements/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Requirements & Documents</h3>
              <p className="mt-1 text-xs text-muted-foreground">Eligibility checklist and full document requirements.</p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background text-center py-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} mAI Prop. All rights reserved.</p>
      </footer>
      <Suspense fallback={null}><LeadCaptureBot /></Suspense>
    </main>
  );
};

const GoldenVisa250k = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisa250k;
