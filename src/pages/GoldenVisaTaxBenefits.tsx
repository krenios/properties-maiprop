import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, Globe, FileText, CheckCircle2, TrendingDown } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-tax-benefits/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Greek non-domicile tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece's non-dom program (Article 5A of the Income Tax Code, Law 4172/2013) allows foreign nationals who transfer their tax residency to Greece to pay a flat annual tax of €100,000 on all globally sourced income, regardless of the amount. The regime lasts for up to 15 years and requires 183+ days/year in Greece plus a minimum €500,000 investment in Greece.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to live in Greece to benefit from the non-dom tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — unlike the Golden Visa itself (which requires no minimum stay), the non-dom tax regime requires you to become a Greek tax resident, which means spending at least 183 days per year in Greece. Investors who want both the Golden Visa and the tax benefits need to plan their physical presence accordingly.",
      },
    },
    {
      "@type": "Question",
      name: "Is a Golden Visa required to access Greek tax benefits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — Greek tax benefits are available to any foreign national who becomes a Greek tax resident regardless of how they obtained residency. However, the Golden Visa is the most common pathway for non-EU investors to gain residency, making it a natural first step toward the non-dom tax regime.",
      },
    },
    {
      "@type": "Question",
      name: "How does Greece's non-dom compare to Portugal's abolished NHR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Portugal's Non-Habitual Resident (NHR) regime was abolished for new applicants from January 2024, replaced by a more limited IFICI scheme targeting specific sectors. Greece's non-dom regime remains fully active and open to all qualifying investors. For 2025 applicants, Greece now offers the most competitive expat tax regime among Southern European options.",
      },
    },
    {
      "@type": "Question",
      name: "What taxes do I pay on rental income from a Greek property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rental income from Greek properties is taxed at: 15% on the first €12,000/year, 35% on €12,001–€35,000, and 45% above €35,000. This applies whether you are a resident or non-resident. Local Greek rental income is always taxed in Greece — only foreign-sourced income benefits from the non-dom flat tax.",
      },
    },
  ],
};

const taxFeatures = [
  { icon: PiggyBank, title: "€100K Flat Tax Cap", desc: "Transfer tax residency to Greece and pay a flat €100,000 per year on all global income — no matter how large. Valid for up to 15 years." },
  { icon: Globe, title: "No Wealth Tax", desc: "Greece imposes no annual wealth tax on worldwide assets. Your global portfolio is not subject to Greek wealth levies — unlike some OECD countries." },
  { icon: TrendingDown, title: "Capital Gains on Property", desc: "Capital gains tax on Greek residential property sales has been suspended for most resale transactions. Confirm status with a local advisor for 2025." },
  { icon: FileText, title: "57 Double-Tax Treaties", desc: "Greece has signed 57 double tax treaties. Most investors can apply treaty benefits to avoid double taxation on dividends, interest, and business income." },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa Tax Benefits — Non-Dom €100K Flat Tax Guide",
  "description": "How Greece's Golden Visa unlocks the non-dom €100K flat-tax regime, zero wealth tax, suspended capital gains, and 57 double-tax treaties for international investors.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2025-03-01",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greek Golden Visa Tax Benefits" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa Tax Benefits — Non-Dom €100K Flat Tax Guide | mAI Investments</title>
        <meta name="description" content="How Greece's Golden Visa unlocks the non-dom €100K flat-tax regime, zero wealth tax, suspended capital gains, and 57 double-tax treaties for international investors." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greek Golden Visa Tax Benefits — Non-Dom €100K Flat Tax Guide" />
        <meta property="og:description" content="Greece's Golden Visa can unlock a €100K flat-tax non-dom regime on global income for 15 years. Full investor tax guide for 2025." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greek Golden Visa Tax Benefits",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2025-03-01",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "Tax Benefits", item: PAGE },
          ]},
        })}</script>
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
              <span>/</span><li className="text-foreground">Tax Benefits</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Tax Efficiency — Greek Residency")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("The Tax Case for the")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Greek Golden Visa")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Greece's residency program can unlock one of Europe's most competitive tax regimes: a €100,000 flat annual tax on global income, no wealth tax, and a capital gains framework designed for real estate investors.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("tax-benefits")}>
              {t("Speak with a Tax Advisor")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("View the Program")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("Four Tax Advantages of Greek Residency")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("The tax architecture of choosing Greece over other EU jurisdictions.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {taxFeatures.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-all">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(f.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Greece's Non-Dom Regime: How It Works")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("Introduced in 2020 under Article 5A of the Greek Income Tax Code (Law 4172/2013), the non-domicile program targets high-net-worth individuals who transfer their tax residency to Greece. The mechanism is straightforward: pay a lump-sum €100,000 per year in lieu of any Greek income tax on foreign-sourced income. Business income, dividends, capital gains, rental income from overseas properties — all covered under the flat payment.")}</p>
            <p>{t("To qualify, you must not have been a Greek tax resident for at least 7 of the previous 8 years, must spend at least 183 days per year in Greece, and must invest at least €500,000 in Greek real estate, securities, or business. The Golden Visa property investment can count toward this requirement if structured appropriately with a qualified Greek tax advisor.")}</p>
            <p>{t("The regime lasts a maximum of 15 years and can be extended to family members for €20,000 each per year. Combined with Greece's 57 double-tax treaties, this makes Greek tax residency a compelling alternative to UAE, Malta, or Cyprus — with the added benefit of full EU residency and Schengen access.")}</p>
            <p>{t("Important distinction: the non-dom regime requires becoming a Greek tax resident (183+ days/year). This is different from the Golden Visa, which requires no minimum stay. Investors interested in combining both must plan their residency structure carefully with qualified legal and tax counsel.")}</p>
          </div>
        </div>
      </section>

      {/* Property tax table */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("Greek Property & Investment Tax Summary")}</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-6 py-3 text-left font-semibold">{t("Tax")}</th>
                  <th className="px-6 py-3 text-left font-semibold text-primary">{t("Rate / Details (2025)")}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Property Transfer Tax (resale)", "3.09% of purchase price"],
                  ["VAT on New Builds (post-2006 permits)", "24% — suspension expired end-2024"],
                  ["Annual Property Tax (ENFIA)", "~€3–€10/m² depending on zone"],
                  ["Rental Income Tax (non-resident)", "15% ≤€12K / 35% ≤€35K / 45% above"],
                  ["Capital Gains on Residential Sale", "Suspended at 0% (verify with advisor)"],
                  ["Non-Dom Annual Flat Tax", "€100,000/year on all global income (15 yrs max)"],
                  ["Inheritance Tax — Direct Family", "1–10%"],
                  ["Inheritance Tax — Non-Family", "20–40%"],
                ].map(([item, rate], i) => (
                  <tr key={item} className={`border-b border-border ${i % 2 === 0 ? "bg-background/20" : "bg-background/40"}`}>
                    <td className="px-6 py-3 font-medium text-foreground">{t(item)}</td>
                    <td className="px-6 py-3">{t(rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t("* Indicative rates as of 2025. Always consult a qualified Greek tax attorney before making investment decisions.")}</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Structure Your Investment for Maximum Tax Efficiency")}</h2>
          <p className="text-muted-foreground mb-8">{t("Our advisors work alongside qualified Greek tax attorneys to structure each investment for optimal outcome. Speak with us before you invest.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("tax-benefits")}>
            {t("Get a Tax Analysis")} <ArrowRight className="h-4 w-4" />
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
              { to: "/golden-visa-for-high-net-worth", title: "HNW Investor Guide", desc: "Strategies for larger capital deployment." },
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

const GoldenVisaTaxBenefits = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GoldenVisaTaxBenefits;
