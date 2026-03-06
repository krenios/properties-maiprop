import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Building2, MapPin, CheckCircle2, Gem } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-for-high-net-worth/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the €800,000 Greek Golden Visa threshold and where does it apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of September 2023, the Municipality of Athens, Municipality of Thessaloniki, Mykonos island, Santorini island, and any island with a population exceeding 3,100 residents require a minimum real estate investment of €800,000. This single-property threshold applies to the most in-demand urban and island locations. The rest of Greece retains the €250,000 minimum.",
      },
    },
    {
      "@type": "Question",
      name: "What types of premium property qualify for the €800,000 threshold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Luxury apartments in Kolonaki, Vouliagmeni, or central Athens, prestige villas in the Athenian Riviera, boutique hotel investments in Mykonos or Santorini, and commercial-to-residential conversions in prime Athens districts all qualify. The investment must be a single property. Our team sources off-market opportunities in these premium zones specifically for HNW investors.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine a Greek Golden Visa with Greece's non-dom tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — but the two programmes have different requirements. The Golden Visa requires a minimum €250,000 or €800,000 property investment and no minimum stay. The non-dom tax regime (€100K flat annual tax on global income) requires a minimum €500,000 investment in Greece AND becoming a Greek tax resident (183+ days/year). HNW investors planning to use both must structure their residency carefully with a qualified tax advisor.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best Athens neighbourhoods for an €800,000+ investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kolonaki (Athens' most prestigious address), Vouliagmeni (seafront luxury with marina access), Glyfada Riviera (coastal lifestyle, strong rental market), and the Ellinikon development zone (premium new builds with long-term appreciation potential) are the top locations for premium capital deployment. Each offers a different balance of lifestyle, yield, and appreciation.",
      },
    },
    {
      "@type": "Question",
      name: "Is Greek real estate a suitable alternative investment for a diversified HNW portfolio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Greek prime real estate offers low correlation with equity and bond markets, inflation protection, hard EU asset domicile, and improving institutional liquidity. For HNW investors with 10–20% of their portfolio in alternative assets, Greek property provides yield, appreciation, and a residency option in a jurisdiction with one of Europe's most competitive tax regimes.",
      },
    },
  ],
};

const tiers = [
  { threshold: "€250K", label: "Standard", zones: "All of Greece except high-demand zones", yield: "4–7% net", cap: "+10–15% YoY in prime areas" },
  { threshold: "€800K", label: "Premium", zones: "Athens, Thessaloniki, Mykonos, Santorini", yield: "4–6% net", cap: "+12–18% YoY in ultra-prime locations" },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for High Net Worth Investors — €800K Athens Strategy",
  "description": "The Greek Golden Visa for HNW investors: €800K premium threshold for Athens and Mykonos, non-dom €100K flat tax, off-market luxury property sourcing, and full concierge service.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2026-03-06",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greek Golden Visa High Net Worth" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for High Net Worth Investors — €800K Athens Strategy | mAI Investments</title>
        <meta name="description" content="The Greek Golden Visa for HNW investors: €800K premium threshold for Athens and Mykonos, non-dom €100K flat tax, off-market luxury property sourcing, and full concierge service." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greek Golden Visa for High Net Worth Investors — €800K Athens Strategy" />
        <meta property="og:description" content="HNW Greek Golden Visa guide: premium €800K threshold zones, non-dom tax planning, off-market sourcing, and ultra-prime Athens property analysis." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta name="keywords" content="Greek Golden Visa 800k Athens, Athens luxury property Golden Visa, high net worth Greece residency, Kolonaki property investment, HNW Greece Golden Visa, Vouliagmeni property investment, premium Athens real estate investor" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greek Golden Visa for High Net Worth Investors",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2026-03-06",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "For High Net Worth", item: PAGE },
          ]},
        })}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
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
              <span>/</span><li className="text-foreground">For High Net Worth</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("HNW Investor Strategy — Greek Golden Visa")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Greece for the")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("High Net Worth Investor")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("The €800K premium threshold in Athens and the islands is not a barrier — it is a filter that concentrates the most exclusive inventory and the highest-quality buyers. For HNW investors, it is an opportunity.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("golden-visa-hnw")}>
              {t("Request Private Consultation")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/properties">{t("View Premium Properties")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Threshold tiers */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Investment Tiers: Where You Invest Determines Your Market")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {tiers.map((tier) => (
              <div key={tier.label} className={`rounded-xl border p-8 ${tier.label === "Premium" ? "border-primary/50 bg-primary/5" : "border-border bg-background/40"}`}>
                <div className="flex items-center gap-3 mb-4">
                  {tier.label === "Premium" ? <Crown className="h-6 w-6 text-primary" /> : <Building2 className="h-6 w-6 text-muted-foreground" />}
                  <div>
                    <div className="text-2xl font-bold text-primary">{tier.threshold}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{t(tier.label)} {t("Threshold")}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">{t("Zones:")}</strong> {t(tier.zones)}</p>
                <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">{t("Net Yield:")}</strong> {tier.yield}</p>
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">{t("Capital Growth:")}</strong> {tier.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HNW strategy */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Why the €800K Threshold Is an Opportunity, Not a Barrier")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("When the Greek government introduced the €800,000 threshold for Athens, Thessaloniki, Mykonos, and Santorini in September 2023, many headlines framed it as a programme restriction. The HNW investor view is different: the threshold cleared speculative small-ticket buyers from Athens' most prestigious addresses, improving deal quality and reducing competition for premium inventory.")}</p>
            <p>{t("In Kolonaki — Athens' equivalent of Kensington or the 16th arrondissement — properties now trade at €4,000–€7,000/m². At these levels, an €800,000 investment secures a 120–200m² flagship apartment in the most sought-after residential address in Greece. The same capital in Paris, London, or Zurich buys 50–80m² in a comparable neighbourhood. The value differential is structural, not cyclical.")}</p>
            <p>{t("Vouliagmeni, on the Riviera, is the premium coastal alternative. Seafront villas and marina-access apartments in Vouliagmeni trade at €5,000–€10,000/m² for top-tier stock. Short-term rental rates reach €600–€1,200 per night in peak season for premium villas. Capital appreciation has averaged 15–18% annually in this submarket since 2021.")}</p>
            <p>{t("For HNW investors with a diversification mandate, Greek real estate at the €800K level provides: EU hard asset domicile, no annual wealth tax, path to the €100K non-dom tax regime with proper structuring, Schengen freedom for the entire family, and a hard asset with growing institutional buy-side interest that supports future liquidity.")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Off-market Athens and Riviera sourcing",
              "Premium Kolonaki and Vouliagmeni listings",
              "Non-dom tax regime structuring support",
              "Property management for absentee owners",
              "Full legal and notary coordination",
              "Dedicated advisor for the full lifecycle",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(p)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <Gem className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("Private Access to Athens' Best Properties")}</h2>
          <p className="text-muted-foreground mb-8">{t("The best properties in Kolonaki, Vouliagmeni, and the Riviera never reach public portals. Our network surfaces them first. Speak with a senior advisor.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("golden-visa-hnw")}>
            {t("Request Private Briefing")} <ArrowRight className="h-4 w-4" />
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
              { to: "/golden-visa-tax-benefits", title: "Tax Benefits", desc: "Non-dom regime and property taxes." },
              { to: "/properties", title: "Premium Properties", desc: "Browse the full portfolio." },
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
      <Suspense fallback={null}><LeadCaptureBot /></Suspense>
    </main>
  );
};

const GoldenVisaForHighNetWorth = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GoldenVisaForHighNetWorth;
