import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe, TrendingUp, ShieldCheck, CheckCircle2, DollarSign } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-for-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the return on investment for a Greek Golden Visa property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A well-selected Greek Golden Visa property generates two return streams: rental income (4–7% net annually) and capital appreciation (10–15% YoY in prime Athens and Riviera areas as of 2024–2025). Over a 5-year hold, total returns including appreciation and rental income can reach 35–55%, depending on location and asset quality.",
      },
    },
    {
      "@type": "Question",
      name: "Can I invest in multiple Greek properties with one Golden Visa application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A single Golden Visa application can cover a portfolio of properties as long as the cumulative investment meets the qualifying threshold (€250,000 for most of Greece, €800,000 for Athens municipality, Thessaloniki, Mykonos, and Santorini). The full threshold must be met — partial investments across multiple properties are allowed.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my Golden Visa if I sell the property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you sell your qualifying property without immediately reinvesting in a new qualifying property, your Golden Visa residency permit will not be renewed at its next renewal date. You may reinvest the proceeds into a new qualifying property and apply to continue the residency permit chain. The permit remains valid until its expiry date regardless of sale.",
      },
    },
    {
      "@type": "Question",
      name: "Is real estate the only qualifying investment for a Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. While real estate is the most popular pathway, Greece also accepts capital contributions to Greek companies, investments in Greek government bonds, and deposits in Greek financial institutions as qualifying investments. Real estate is preferred by most investors due to its tangible asset value, rental income, and capital appreciation potential.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Greek property market compare to other EU markets for investors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece offers the most attractive entry-cost-to-yield ratio among major EU real estate markets. At €2,000–€5,000/m² in prime Athens vs €8,000–€15,000/m² in Paris, Barcelona, or Amsterdam, Greece delivers superior yield and higher appreciation potential from a lower base. The market is in an early-to-mid cycle of recovery and institutional interest is rising rapidly.",
      },
    },
  ],
};

const metrics = [
  { icon: TrendingUp, title: "10–15% Annual Appreciation", desc: "Prime Athens and Riviera properties have appreciated 10–15% YoY in 2024–2025, driven by tourism growth and the Ellinikon development." },
  { icon: DollarSign, title: "4–7% Net Rental Yield", desc: "Pre-renovated, managed properties generate 4–7% net annual yield from Airbnb and long-term tenants — often more than Greek government bonds." },
  { icon: Globe, title: "EU Liquidity Premium", desc: "EU-domiciled assets command a structural premium. Greek property is increasingly attractive to institutional buyers, improving exit liquidity." },
  { icon: ShieldCheck, title: "Hard Asset Protection", desc: "Physical real estate in an EU jurisdiction is one of the most inflation-resistant, politically stable stores of value for capital preservation." },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for Investors — ROI, Yields & Market Analysis 2025 | mAI Investments</title>
        <meta name="description" content="A pure investment analysis of the Greek Golden Visa: 4–7% net yields, 10–15% annual appreciation, portfolio diversification into EU real estate from €250,000." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greek Golden Visa for Investors — ROI, Yields & Market Analysis 2025" />
        <meta property="og:description" content="Investment-grade analysis: Greek Golden Visa properties deliver 4–7% net yield and 10–15% annual appreciation in prime Athens." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greek Golden Visa for Investors",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2025-03-01",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "For Investors", item: PAGE },
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
              <span>/</span><li className="text-foreground">For Investors</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Investment Analysis — Greek Golden Visa")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("The Investment Case for the")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Greek Golden Visa")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Strip away the residency benefits. The pure investment fundamentals — 4–7% net yield, 10–15% annual appreciation, and EU asset domicile — make Greek property one of the most compelling yield-plus-growth plays in Europe right now.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("golden-visa-investors")}>
              {t("Request Investment Analysis")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties">{t("View Available Properties")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core metrics */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("Four Investment Pillars of Greek Property")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("The investment case beyond the visa.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {metrics.map((m) => (
              <div key={m.title} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-all">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(m.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(m.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Why Athens Is the EU's Most Attractive Yield Market in 2025")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("The typical framework for evaluating EU real estate investment compares gross yield against the 10-year government bond yield of the same country. In Germany, Switzerland, or the Netherlands, that spread has compressed to near zero. In Greece, the spread remains wide: Greek 10-year bonds yield approximately 3.5%, while prime Athenian residential yields net 4–7%. That risk premium — on an asset with hard collateral, EU jurisdiction, and appreciating capital value — is rare in 2025.")}</p>
            <p>{t("Athens has benefited from a structural supply deficit. Construction activity collapsed during the 2010–2018 austerity period, and new-build supply has been slow to recover. Meanwhile, demand — driven by tourism, expat influx, and Golden Visa buyers — has outpaced supply. The result: vacancy rates in prime areas below 3%, nightly Airbnb rates climbing 10–15% annually, and long-term rent growth averaging 8% per year in central districts.")}</p>
            <p>{t("The Ellinikon project — Europe's largest urban regeneration development — is transforming 6.2km of former airport land on the Athenian Riviera into a mixed-use district with a marina, international schools, luxury hotels, and premium residences. Properties within a 2km radius have already appreciated 15–20% since groundbreaking. Investors entering now are buying ahead of the institutional capital that will follow project completion between 2026 and 2030.")}</p>
            <p>{t("From a portfolio construction perspective, Greek real estate offers genuine diversification. It has low correlation with US and Northern European equity markets, demonstrates resilience during global rate cycles (it bottomed before rates peaked), and benefits from tourism tailwinds that are structurally unrelated to financial market volatility.")}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Lowest entry cost in the EU at qualifying yields",
              "Hard EU asset with legal title and property rights",
              "Tourism demand provides structural rental floor",
              "Ellinikon project driving medium-term appreciation",
              "Portfolio diversification away from home market risk",
              "Exit liquidity improving as institutional interest rises",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(p)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-yr model */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-2xl font-bold">{t("Illustrative 5-Year Return Model — €250,000 Investment")}</h2>
          <div className="rounded-xl border border-border overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-6 py-3 text-left font-semibold">{t("Return Component")}</th>
                  <th className="px-6 py-3 text-left font-semibold text-primary">{t("Conservative")}</th>
                  <th className="px-6 py-3 text-left font-semibold text-primary">{t("Base Case")}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Net rental yield (annual)", "4%", "5.5%"],
                  ["Rental income over 5 years", "€50,000", "€68,750"],
                  ["Capital appreciation (5 yrs)", "8% / yr = +47%", "12% / yr = +76%"],
                  ["Property value after 5 years", "€367,500", "€440,000"],
                  ["Total return (income + gain)", "~€167,500", "~€258,750"],
                  ["Total return %", "~67%", "~103%"],
                ].map(([item, cons, base], i) => (
                  <tr key={item} className={`border-b border-border ${i % 2 === 0 ? "bg-background/20" : "bg-background/40"}`}>
                    <td className="px-6 py-3 font-medium text-foreground">{t(item)}</td>
                    <td className="px-6 py-3">{cons}</td>
                    <td className="px-6 py-3 text-primary font-medium">{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">{t("* Illustrative only. Past performance does not guarantee future returns. Assumes no leverage, pre-tax basis, excludes transaction costs. Consult an advisor.")}</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("Get a Bespoke Investment Analysis")}</h2>
          <p className="text-muted-foreground mb-8">{t("We produce property-specific investment models for qualified investors — yield projections, comparable sales, and appreciation assumptions based on live market data.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("golden-visa-investors")}>
            {t("Request My Analysis")} <ArrowRight className="h-4 w-4" />
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
              { to: "/golden-visa-rental-income-properties", title: "Rental Income Properties", desc: "Live yield-generating listings." },
              { to: "/golden-visa-for-high-net-worth", title: "High Net Worth Guide", desc: "Strategies for €800K+ deployment." },
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

const GoldenVisaForInvestors = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GoldenVisaForInvestors;
