import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, AlertTriangle, CheckCircle2, MapPin, TrendingUp } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/greece-vs-dubai-golden-visa/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Greece offer that Dubai's Golden Visa cannot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece's Golden Visa provides: full EU residency rights under international law, Schengen Area travel across 27 European countries, a pathway to EU citizenship after 7 years, and ownership of property in a stable, decades-old EU legal framework. Dubai's visa provides residency in the UAE, which has no citizenship pathway for most nationalities, limited international travel rights on a UAE residence permit alone, and exposure to a single-city, oil-dependent economy with no democratic accountability or international legal protections.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Dubai Golden Visa cheaper than Greece?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UAE Golden Visa requires a minimum AED 2,000,000 (~€500,000) real estate investment for the 10-year visa, or AED 500,000 (~€125,000) for a 2-year renewable visa. Greece's qualifying threshold starts at €250,000 for a 5-year renewable EU residency with Schengen travel rights. On a cost-per-right basis — considering EU access, citizenship pathway, and asset stability — Greece delivers significantly more value per euro invested.",
      },
    },
    {
      "@type": "Question",
      name: "How does geopolitical risk compare between Greece and Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece is a NATO member and EU member state, with the full security, legal, and military backing of both institutions. The Athenian conflict risk is effectively zero. The UAE — despite its relative stability within the region — is located in the Middle East, a geopolitically volatile area where conflicts escalate rapidly. The October 2024 attack and broader MENA instability have reaffirmed the risk premium that Middle Eastern residency carries compared to Southern European alternatives.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine a Greece Golden Visa with UAE residency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many sophisticated investors hold both. The UAE provides zero income tax and strong business infrastructure. Greece provides EU access, Schengen travel, and a stable asset base. Using the UAE as a primary tax base while holding Greek property for residency optionality and rental income is a common HNW multi-jurisdiction strategy that our advisors can help structure.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to Dubai property investments during MENA crises?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During MENA geopolitical crises, Dubai typically sees capital flight into the market (as investors from affected countries liquidate other assets and park capital in UAE property), which temporarily inflates prices. However, this creates an unstable investor base susceptible to rapid reversal when crises resolve or when regional dynamics shift. Greek property attracts European and institutionally-backed capital flows, which are more stable and less correlated to regional conflict risk.",
      },
    },
  ],
};

const compare = [
  { cat: "Residency Type", gr: "EU Residency — internationally recognised", ae: "UAE Residency — UAE jurisdiction only" },
  { cat: "Citizenship Pathway", gr: "Yes — 7 years to Greek/EU citizenship", ae: "No — no citizenship pathway for most nationalities" },
  { cat: "Schengen Travel", gr: "Yes — 27 EU countries visa-free", ae: "No — UAE residency provides no EU travel rights" },
  { cat: "Minimum Investment", gr: "€250,000 (most of Greece)", ae: "AED 2M (~€500K) for 10-yr visa" },
  { cat: "NATO/EU Security", gr: "Full NATO + EU institutional protection", ae: "No NATO; GCC security framework only" },
  { cat: "MENA Conflict Exposure", gr: "Zero — Southern European geography", ae: "High — located in geopolitically volatile region" },
  { cat: "Property Market Stability", gr: "EU legal framework, improving institutions", ae: "Leasehold structure, no freehold law universality" },
  { cat: "Income Tax", gr: "Non-dom €100K flat tax regime available", ae: "0% income tax (requires tax residency in UAE)" },
  { cat: "Rental Yield", gr: "4–7% net in Athens & Riviera", ae: "5–8% gross (net closer to 4–6% after fees)" },
  { cat: "Legal System", gr: "EU civil law, ECJ enforcement", ae: "UAE civil law, no ECJ access" },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greece vs Dubai Golden Visa — Security, EU Access & MENA Risk 2025 | mAI Investments</title>
        <meta name="description" content="Greece vs Dubai Golden Visa: EU citizenship path vs no path, Schengen access vs none, NATO security vs MENA exposure. Honest side-by-side comparison for MENA investors in 2025." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greece vs Dubai Golden Visa — Security, EU Access & MENA Risk 2025" />
        <meta property="og:description" content="Greece vs Dubai: EU citizenship pathway, Schengen access, NATO security vs MENA geopolitical risk. The full comparison for 2025 investors." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greece vs Dubai Golden Visa",
          url: PAGE,
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greece vs Dubai Golden Visa", item: PAGE },
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
              <span>/</span><li className="text-foreground">Greece vs Dubai Golden Visa</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("MENA Security Context — 2025")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Greece vs Dubai")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Golden Visa")}
            </span>
            {" "}{t("— The Security Question")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("MENA investors are rethinking their residency strategy. Against a backdrop of regional instability, the comparison between EU safety and Gulf exposure has never been more relevant. Here's the honest analysis.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("greece-vs-dubai")}>
              {t("Speak with an Advisor")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("Greek Golden Visa Guide")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security context */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("The MENA Context in 2025")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("The Middle East and North Africa region continues to face elevated geopolitical risk in 2025. Ongoing conflicts, drone attacks on civilian infrastructure, and supply chain disruptions have increased the urgency with which regional investors review their residency optionality. For investors currently holding UAE residency as their primary Plan B, the question of a more geographically stable EU alternative has become critical.")}</p>
              </div>
            </div>
          </div>
          <h2 className="mb-8 text-3xl font-bold">{t("What MENA Investors Are Actually Asking")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("The most common question from our Middle Eastern and Turkish investor clients is not 'which country has better yields?' — it is 'where can I and my family go if things get worse?' The answer is not Dubai. Dubai is in the region. It is subject to the same risks, the same travel disruptions, and the same economic shockwaves as the rest of MENA.")}</p>
            <p>{t("Greece is in Europe. It is a NATO member state, protected by Article 5 of the NATO charter. It is an EU member state, protected by EU institutional law, the European Court of Justice, and the full weight of European economic integration. In 30 years of MENA instability — Gulf War, Arab Spring, Syria, Yemen, Gaza — Athens has remained stable, open, and prosperous relative to regional alternatives.")}</p>
            <p>{t("This is not a marketing pitch. It is a geographic and political fact. Investors who hold Greek residency have an unconditional right to enter Greece, transit through all 27 Schengen countries, and access EU legal protections — regardless of what happens in their home country, their home country's relationship with the EU, or regional conflict dynamics.")}</p>
            <p>{t("Dubai's Golden Visa, while genuinely useful for tax optimization and business purposes, provides none of this. A UAE residency is issued by the UAE government and can be revoked or restricted. It provides no Schengen travel rights. It has no citizenship pathway. It places you in a jurisdiction that, while internally stable, is surrounded by active conflict zones and sits outside the world's most powerful security alliance.")}</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Full Comparison: Greece vs Dubai")}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-6 py-4 text-left font-semibold text-muted-foreground w-1/3">{t("Category")}</th>
                  <th className="px-6 py-4 text-left font-semibold text-primary">{t("🇬🇷 Greece")}</th>
                  <th className="px-6 py-4 text-left font-semibold text-muted-foreground">{t("🇦🇪 Dubai / UAE")}</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr key={row.cat} className={`border-b border-border ${i % 2 === 0 ? "bg-background/20" : "bg-background/40"}`}>
                    <td className="px-6 py-4 font-medium text-foreground">{t(row.cat)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{t(row.gr)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{t(row.ae)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why MENA investors choose Greece */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("Why MENA Investors Are Choosing Greece as Their EU Anchor")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Shield, point: "NATO military protection — unconditional Article 5 security guarantee from all 32 member states" },
              { icon: Globe, point: "EU citizenship pathway — the only Golden Visa program that can eventually lead to an EU passport" },
              { icon: MapPin, point: "Closest EU country to the Middle East — Athens is 3.5 hours from Beirut, Dubai, and Istanbul" },
              { icon: TrendingUp, point: "Appreciating EU asset — Greek property has outperformed Dubai in appreciation since 2021" },
              { icon: CheckCircle2, point: "Lower entry point — €250K qualifies for 5-year EU residency vs AED 2M for UAE" },
              { icon: CheckCircle2, point: "Schengen freedom — travel across 27 European countries with one permit" },
            ].map(({ icon: Icon, point }) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-5">
                <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t(point)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("Secure Your EU Anchor Before You Need It")}</h2>
          <p className="text-muted-foreground mb-8">{t("The investors who benefit most from a Greek Golden Visa are those who act before a crisis, not after. Our advisors work with MENA-based investors on expedited timelines. Speak with us today.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("greece-vs-dubai")}>
            {t("Start My Application")} <ArrowRight className="h-4 w-4" />
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
              { to: "/golden-visa-for-investors", title: "For Investors", desc: "ROI and market analysis." },
              { to: "/250k-golden-visa-properties", title: "€250K Properties", desc: "Qualifying listings from €250K." },
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

const GreeceVsDubaiGoldenVisa = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GreeceVsDubaiGoldenVisa;
