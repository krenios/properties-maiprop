import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, TrendingUp } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/greece-vs-portugal-golden-visa/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Greece or Portugal Golden Visa better for real estate investment in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece currently offers superior real estate investment fundamentals: a €250,000 minimum threshold in most of the country, faster processing (6–12 months vs 12–24 months), and stronger rental yield potential of 4–7% net in Athens and the Riviera. Portugal has restricted residential property as a qualifying asset in Lisbon, Porto, and coastal zones, making Greece the dominant EU real estate residency option in 2025.",
      },
    },
    {
      "@type": "Question",
      name: "Which program is cheaper — Greece or Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece is significantly cheaper for real estate investment. The Greek Golden Visa starts at €250,000 for properties in qualifying areas outside the high-demand zones. Portugal's program no longer allows residential property investment in Lisbon, Porto, or coastal areas — shifting investors to fund investments at €500,000 minimum. Greece wins decisively on entry cost.",
      },
    },
    {
      "@type": "Question",
      name: "Which Golden Visa leads to citizenship faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Portugal's path to citizenship is faster: 5 years from permit issuance with minimal physical presence required. Greece requires 7 years of continuous residency. For investors prioritising EU citizenship as the primary goal, Portugal has the edge. For investors prioritising low-cost property investment and rental yield, Greece is the stronger choice.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to live in Greece or Portugal to maintain residency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece requires no minimum stay to maintain the Golden Visa residency permit. Portugal requires 7 days per year of physical presence. Neither program demands full-time residency. However, citizenship applications in both countries require meaningful physical presence over the qualifying period.",
      },
    },
    {
      "@type": "Question",
      name: "Is Greece a better Golden Visa option in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For real estate investors, yes. Portugal has progressively restricted its property investment pathway, while Greece has maintained clear, investor-friendly rules. Greece's €250,000 threshold, 6–12 month processing, strong rental market, and appreciating asset prices make it the most competitive EU real estate Golden Visa in 2025.",
      },
    },
  ],
};

const rows = [
  { cat: "Minimum Real Estate Investment", gr: "€250,000 (most of Greece)", pt: "€500,000 (funds/heritage/low-density only)" },
  { cat: "Residential Property in Capital", gr: "€800,000 in Athens/Thessaloniki", pt: "Not permitted in Lisbon, Porto, or coast" },
  { cat: "Processing Time", gr: "6–12 months", pt: "12–24 months" },
  { cat: "Minimum Stay Required", gr: "None", pt: "7 days/year" },
  { cat: "Path to Citizenship", gr: "7 years", pt: "5 years" },
  { cat: "Net Rental Yield", gr: "4–7% (Athens & Riviera)", pt: "3–5% (Algarve/Lisbon)" },
  { cat: "Non-Dom Tax Regime", gr: "€100K flat tax on global income (15 yrs)", pt: "NHR abolished Jan 2024; IFICI limited scope" },
  { cat: "Family Inclusion", gr: "Spouse, children under 21, both sets of parents", pt: "Spouse, dependent children, parents" },
  { cat: "Property Market Trend", gr: "+10–15% YoY in prime areas (2024–2025)", pt: "Market softening post-2023 restrictions" },
  { cat: "EU Schengen Access", gr: "Full (27 countries)", pt: "Full (27 countries)" },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greece vs Portugal Golden Visa — 2025 Full Comparison",
  "description": "Greece vs Portugal Golden Visa: investment thresholds, processing times, citizenship paths, rental yields, and tax regimes compared side-by-side for 2025 investors.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2025-03-01",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greece vs Portugal Golden Visa Comparison" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greece vs Portugal Golden Visa — 2025 Full Comparison | mAI Investments</title>
        <meta name="description" content="Greece vs Portugal Golden Visa: investment thresholds, processing times, citizenship paths, rental yields, and tax regimes compared side-by-side for 2025 investors." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greece vs Portugal Golden Visa — 2025 Full Comparison" />
        <meta property="og:description" content="Side-by-side comparison: €250K Greece vs €500K Portugal. Processing times, yields, citizenship paths, and tax regimes for 2025." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta name="keywords" content="Greece vs Portugal Golden Visa 2025, Greece Portugal residency comparison, best Golden Visa Europe 2025, Portugal Golden Visa restrictions, Greece Golden Visa 250k vs Portugal, Golden Visa real estate 2025, EU residency comparison investors" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greece vs Portugal Golden Visa — 2025 Full Comparison",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2025-03-01",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greece vs Portugal Golden Visa", item: PAGE },
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
              <span>/</span><li className="text-foreground">Greece vs Portugal Golden Visa</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("2025 Golden Visa Comparison")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Greece vs Portugal")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("Golden Visa")}</span>
            {" "}{t("— Which Wins in 2025?")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Two of Europe's most popular residency-by-investment programs. One clear winner for real estate investors in 2025. Here's the unbiased breakdown.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("greece-vs-portugal")}>
              {t("Get Expert Advice")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("Greek Golden Visa Guide")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Side-by-Side Comparison")}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-6 py-4 text-left font-semibold text-muted-foreground w-1/3">{t("Category")}</th>
                  <th className="px-6 py-4 text-left font-semibold text-primary">{t("🇬🇷 Greece")}</th>
                  <th className="px-6 py-4 text-left font-semibold text-muted-foreground">{t("🇵🇹 Portugal")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.cat} className={`border-b border-border ${i % 2 === 0 ? "bg-background/20" : "bg-background/40"}`}>
                    <td className="px-6 py-4 font-medium text-foreground">{t(row.cat)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{t(row.gr)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{t(row.pt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Analysis */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Why Real Estate Investors Are Choosing Greece in 2025")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("Portugal's Golden Visa program was the benchmark between 2012 and 2022, attracting over €7 billion in real estate investment. Then the government began restricting qualifying property types — first removing Lisbon and Porto, then expanding exclusions to coastal zones. By 2023, residential property in Portugal's most desirable locations no longer qualified. Investors were pushed toward investment funds, heritage projects, and rural properties — assets with different risk and liquidity profiles.")}</p>
            <p>{t("Greece moved in the opposite direction. The program has remained consistently investor-friendly since its launch in 2013. The 2023 amendment — raising the threshold to €800,000 in Athens, Thessaloniki, Mykonos, and Santorini — actually benefited investors: it reduced speculative demand in premium zones while keeping the €250,000 option available across 95%+ of the country's geography, including attractive coastal markets like Piraeus, Glyfada, and the Athenian Riviera.")}</p>
            <p>{t("The yield differential is telling. Athens and the Riviera consistently deliver 4–7% net rental yields driven by strong short-term tourism demand and growing long-term rental markets. Lisbon and Porto, while desirable, have seen rental yields compress as property prices outpaced rental growth. For investors whose primary metric is income return on a €250K–€500K commitment, Greece offers the superior economics.")}</p>
            <p>{t("Portugal retains one clear advantage: citizenship timeline. At 5 years versus 7 for Greece, it is faster for investors who view a European passport as their primary goal. For investors seeking real estate yield, capital appreciation, and EU residency at the lowest entry point — Greece is the 2025 winner.")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="mb-3 font-semibold text-primary flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{t("Choose Greece If You Want:")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Lowest entry cost (€250K)", "Highest rental yield (4–7% net)", "Fastest processing (6–12 months)", "Real estate asset ownership", "Capital appreciation upside"].map(i => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary shrink-0" />{t(i)}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background/40 p-6">
              <h3 className="mb-3 font-semibold flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" />{t("Choose Portugal If You Want:")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["EU citizenship in 5 years", "Atlantic coastal lifestyle", "Fund or heritage investment", "Strong English-speaking community", "Existing Portugal connections"].map(i => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-muted-foreground shrink-0" />{t(i)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Ready to Start Your Greek Golden Visa?")}</h2>
          <p className="text-muted-foreground mb-8">{t("Our advisors have guided investors from 40+ countries through the Greek program. Get your personalised analysis in 24 hours.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("greece-vs-portugal")}>
            {t("Get My Free Analysis")} <ArrowRight className="h-4 w-4" />
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
              { to: "/greek-golden-visa", title: "Greek Golden Visa", desc: "Full program guide." },
              { to: "/250k-golden-visa-properties", title: "€250K Properties", desc: "Qualifying real estate listings." },
              { to: "/properties", title: "All Properties", desc: "Browse the full portfolio." },
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

const GreeceVsPortugalGoldenVisa = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GreeceVsPortugalGoldenVisa;
