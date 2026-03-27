import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, MapPin, Maximize, Bed, DollarSign, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { optimizeImage } from "@/lib/optimizeImage";
import { useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-rental-income-properties/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I rent out my Golden Visa property in Greece?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. There is no restriction on renting your Greek Golden Visa property. You can rent it short-term via Airbnb and Booking.com, or enter a long-term lease agreement. Many investors generate 4–7% net annual yields, making the investment partially or fully self-financing.",
      },
    },
    {
      "@type": "Question",
      name: "What are typical rental yields on Golden Visa properties in Athens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Renovated properties in central Athens, Piraeus, and Glyfada typically yield 4–7% net annually. Short-term Airbnb rentals in tourist-heavy neighbourhoods can achieve gross yields of 6–10% in peak season. Net yield after management fees, taxes, and maintenance typically settles at 4–7% for well-selected, renovated stock.",
      },
    },
    {
      "@type": "Question",
      name: "How is rental income taxed in Greece for non-residents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece taxes rental income for non-residents at a progressive scale: 15% on income up to €12,000/year, 35% on €12,001–€35,000, and 45% above €35,000. Local rental income from Greek properties is always taxed in Greece regardless of residency status.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be present in Greece to manage a rental property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Our properties include full property management — guest check-in, cleaning, maintenance, and rental channel management — so you don't need to visit to generate income. You receive monthly statements and payments to your nominated bank account regardless of where you are in the world.",
      },
    },
    {
      "@type": "Question",
      name: "Which areas in Greece offer the best rental income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For short-term rentals: central Athens (Koukaki, Monastiraki, Psirri), Piraeus marina area, and Glyfada deliver the highest occupancy and nightly rates. For long-term rentals: Kifissia, Chalandri, and the northern suburbs attract corporate tenants and expats. The Athenian Riviera combines seasonal premium short-term rates with strong long-term demand.",
      },
    },
  ],
};

interface Property { id: string; title: string; location: string; price: number | null; size: number | null; bedrooms: number | null; yield: string; status: string; images: string[]; }

const statusColors: Record<string, string> = {
  available: "bg-primary/20 text-primary border-primary/30",
  booked: "bg-secondary/20 text-secondary border-secondary/30",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Golden Visa Properties with Rental Income — 4–7% Yield Greece",
  "description": "Greek Golden Visa properties generating 4–7% net rental yield. Pre-renovated, Airbnb-ready investments in Athens & Riviera. Managed income from day one.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2025-03-01",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greek Golden Visa Rental Yield Properties" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("properties").select("id,title,location,price,size,bedrooms,yield,status,images")
      .in("project_type", ["ready", "under-construction", "new"]).order("sort_order", { ascending: true })
      .then(({ data }) => { setProperties((data as Property[]) || []); setLoading(false); });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Golden Visa Properties with Rental Income — 4–7% Yield Greece | mAI Investments</title>
        <meta name="description" content="Greek Golden Visa properties generating 4–7% net rental yield. Pre-renovated, Airbnb-ready investments in Athens & Riviera. Managed income from day one." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Golden Visa Properties with Rental Income — 4–7% Yield Greece" />
        <meta property="og:description" content="Greek Golden Visa properties generating 4–7% net rental yield. Pre-renovated investments in Athens and the Riviera." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta name="keywords" content="Greek Golden Visa rental income, Greece investment property yield, Athens rental yield property, Golden Visa rental property Greece, Athens Airbnb investment, 4-7% yield Greece real estate, rental income property Greece investor" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Golden Visa Properties with Rental Income",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2026-03-06",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "Rental Income Properties", item: PAGE },
          ]},
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </Helmet>

      <Navbar forceScrolled />

      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <span>/</span>
              <li><Link to="/greek-golden-visa" className="hover:text-primary transition-colors">Greek Golden Visa</Link></li>
              <span>/</span><li className="text-foreground">Rental Income Properties</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("4–7% Net Yield — Income Strategy")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Golden Visa Properties")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("That Pay for Themselves")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Why let €250,000 sit idle? Our Golden Visa properties generate 4–7% net annual rental income from day one — while qualifying you for EU residency.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("rental-income-properties")}>
              {t("Request Yield Reports")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("View the Program")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto text-center">
            {[
              { stat: "4–7%", label: "Net Annual Rental Yield", icon: TrendingUp },
              { stat: "€1,000+", label: "Avg Monthly Income on €250K", icon: DollarSign },
              { stat: "85%+", label: "Average Occupancy in Peak Season", icon: MapPin },
            ].map(({ stat, label, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-border bg-background/40 p-8">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-4xl font-bold text-primary mb-2">{stat}</div>
                <p className="text-sm text-muted-foreground">{t(label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("How the Rental Income Strategy Works")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("Most Golden Visa investors think of their property as a cost centre — a €250,000 commitment that secures residency but generates no return. The reality for well-selected properties in Athens and the Athenian Riviera is the opposite. Athens became one of Europe's fastest-growing short-term rental markets. Tourism arrivals hit a record 35 million in 2023 and continued climbing in 2024.")}</p>
            <p>{t("The Athenian Riviera — from Glyfada to Vouliagmeni — commands nightly rates of €120–€350 for well-presented apartments during the April–October season. Net annual yields of 4–7% after management fees, taxes, and maintenance are typical for our pre-renovated stock. The renovation-first model is critical: properties fully renovated before listing command 25–40% higher nightly rates than unrenovated competition.")}</p>
            <p>{t("Every property in our portfolio has been renovated to a consistent specification — new kitchens, bathrooms, HVAC, and smart-lock access — before being handed to our property management team. Investors receive monthly statements with occupancy data and revenue breakdown. Rental proceeds are remitted to a nominated bank account monthly.")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Pre-renovation completed before purchase",
              "Full Airbnb & Booking.com channel management",
              "Monthly income statements and transfers",
              "Maintenance handled by our local team",
              "Occupancy optimisation and dynamic pricing",
              "Tax filing assistance for Greek rental income",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(p)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live property grid */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-2xl font-bold">{t("Available Rental Income Properties")}</h2>
          <p className="mb-10 text-muted-foreground">{t("Pre-renovated, Golden Visa eligible, and managed for income from day one.")}</p>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 rounded-2xl border border-border bg-background/40 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <article key={p.id} className="group rounded-2xl border border-border bg-background/40 overflow-hidden hover:border-primary/30 transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.images?.[0]
                      ? <img src={optimizeImage(p.images[0], { width: 600, height: 450 })} alt={`${p.title} rental income property ${p.location}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={600} height={450} />
                      : <div className="h-full w-full bg-muted" />}
                    {p.status && <Badge className={`absolute left-3 top-3 border text-xs ${statusColors[p.status] || ""}`}>{p.status.replace("-", " ")}</Badge>}
                    {p.yield && <Badge className="absolute right-3 top-3 border text-xs bg-primary/20 text-primary border-primary/30"><TrendingUp className="h-3 w-3 mr-1" />{p.yield}</Badge>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3"><MapPin className="h-3 w-3" /> {p.location}, Greece</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.price && <Badge variant="outline" className="rounded-full text-xs"><span className="font-bold text-primary">€{p.price.toLocaleString()}</span></Badge>}
                      {p.size && <Badge variant="outline" className="rounded-full text-xs"><Maximize className="h-3 w-3 text-muted-foreground mr-1" />{p.size} m²</Badge>}
                      {p.bedrooms && <Badge variant="outline" className="rounded-full text-xs"><Bed className="h-3 w-3 text-muted-foreground mr-1" />{p.bedrooms} bd</Badge>}
                    </div>
                    <Button size="sm" variant="outline" className="w-full rounded-full text-xs" asChild>
                      <Link to={`/property/${p.id}`} aria-label={`View ${p.title} — rental income property in ${p.location}`}>View {p.title} →</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Get Full Yield Reports for Any Property")}</h2>
          <p className="text-muted-foreground mb-8">{t("We provide documented rental history and projected yield analysis for every property before you commit. No estimates — real data.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("rental-income-properties")}>
            {t("Request Yield Analysis")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Frequently Asked Questions")}</h2>
          <div className="space-y-6">
            {faqLd.mainEntity.map((q: any) => (
              <div key={q.name} className="rounded-xl border border-border bg-background/40 p-6">
                <h3 className="mb-2 font-semibold">{t(q.name)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(q.acceptedAnswer.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { to: "/greek-golden-visa", title: "Greek Golden Visa", desc: "Full program overview." },
              { to: "/250k-golden-visa-properties", title: "€250K Properties", desc: "Entry-level qualifying listings." },
              { to: "/golden-visa-tax-benefits", title: "Tax Benefits", desc: "Greece's non-dom regime explained." },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{t(l.title)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t(l.desc)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background text-center py-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} mAI Prop. All rights reserved.</p>
      </footer>
    </main>
  );
};

const GoldenVisaRentalIncomeProperties = () => <Inner />;
export default GoldenVisaRentalIncomeProperties;
