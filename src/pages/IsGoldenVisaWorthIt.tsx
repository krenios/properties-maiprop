import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle, ThumbsUp, Scale, TrendingUp } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/is-golden-visa-worth-it/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Greek Golden Visa worth it financially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most investors, yes — especially those who would have invested in European real estate anyway. The incremental cost of obtaining EU residency through a qualifying Greek property purchase is primarily the 3.09% transfer tax and €10,000–€15,000 in legal and government fees on top of the property purchase. Given that the property itself generates 4–7% net annual yield and 10–15% annual capital appreciation in prime areas, the residency benefit is effectively free for a well-selected asset.",
      },
    },
    {
      "@type": "Question",
      name: "What are the main reasons investors regret their Golden Visa purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common sources of regret are: buying the wrong property (wrong location, poor renovation quality, or overpaying), not planning for ongoing costs (ENFIA property tax, management fees, maintenance), underestimating processing times, and failing to use the residency rights due to no minimum-stay requirement. All of these are avoidable with proper due diligence and advisor guidance.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the Greek Golden Visa NOT right for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Golden Visa is less suitable if: your primary goal is EU citizenship quickly (Portugal's 5-year path is faster), you don't want property management responsibility, your capital is better deployed in higher-liquidity assets, or you have no long-term interest in Greece or EU access. It is an investment in an illiquid asset class with a residency bonus — not a substitute for financial planning.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Greek Golden Visa compare to UAE residency in terms of value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UAE residency is cheaper (Golden Visa from AED 2M / ~€500K) and simpler to obtain, but provides no Schengen access, no EU citizenship pathway, and sits in a geopolitically less stable region. Greece's Golden Visa provides full Schengen travel, EU property rights, a pathway to Greek/EU citizenship, and an asset in one of the world's most liquid real estate markets. For investors who value EU optionality and geographic diversification, Greece delivers superior strategic value.",
      },
    },
    {
      "@type": "Question",
      name: "What is the total cost of a Greek Golden Visa including all fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a standard €250,000 property investment, total costs including property transfer tax (3.09% = ~€7,725), legal and notary fees (~€3,000–€5,000), government permit fees (~€2,000 for main applicant), and administrative costs typically add €12,000–€18,000 to the investment. Ongoing annual costs include ENFIA property tax (~€300–€800/year for a typical apartment) and property management fees if renting.",
      },
    },
  ],
};

const pros = [
  "EU residency for the whole family under one investment",
  "Schengen travel across 27 countries, visa-free",
  "Real estate asset generating 4–7% net annual yield",
  "10–15% annual capital appreciation in prime Athens",
  "No minimum stay requirement",
  "Path to Greek (EU) citizenship after 7 years",
  "Access to Greece's €100K non-dom tax regime",
  "Political and economic diversification from home country",
];

const cons = [
  "Illiquid asset — property can't be sold quickly",
  "Transfer tax and legal fees add ~5–7% on entry",
  "Citizenship path is 7 years (longer than Portugal)",
  "Rental income management requires active oversight or management fees",
  "Non-dom tax regime requires 183+ days/year in Greece",
  "Property values can decline in downturns",
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Is the Greek Golden Visa Worth It? Honest Analysis 2025 | mAI Investments</title>
        <meta name="description" content="An honest, balanced assessment of whether the Greek Golden Visa is worth it in 2025 — pros, cons, total costs, who it suits, and who should look elsewhere." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Is the Greek Golden Visa Worth It? Honest Analysis 2025" />
        <meta property="og:description" content="Honest pros and cons: is the Greek Golden Visa worth €250,000? Investment returns, true costs, who benefits most, and when to say no." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Is the Greek Golden Visa Worth It?",
          url: PAGE,
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "Is It Worth It?", item: PAGE },
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
              <span>/</span><li className="text-foreground">Is It Worth It?</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Honest Assessment — 2025")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Is the Greek Golden Visa")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Worth It?")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("A completely honest breakdown — the real costs, the genuine benefits, who it's right for, and the situations where we'd tell you to think twice.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("is-worth-it")}>
              {t("Get a Personalised Assessment")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("View the Program")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Verdict up front */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("The Short Answer: For Most International Investors, Yes")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("The Greek Golden Visa is worth it if you are planning to invest in European real estate anyway and you value the optionality of EU residency. The incremental cost of residency — on top of a property purchase that you would have made regardless — is essentially the transfer tax (3.09%) and legal fees (€10,000–€15,000). Against that cost, you receive EU residency for your entire family, Schengen travel freedom, and a pathway to EU citizenship after 7 years.")}</p>
            <p>{t("What makes the calculation compelling in 2025 is that the underlying asset performs. Prime Athens and Riviera properties have delivered 10–15% annual capital appreciation in 2023–2024. Net rental yields of 4–7% are achievable on pre-renovated, managed stock. A €250,000 investment made in 2022 in the right Athens property is now worth €320,000–€360,000, has generated €30,000–€50,000 in rental income, and continues to deliver EU residency for the whole family.")}</p>
            <p>{t("The calculation is less favourable if you are buying specifically to 'get the visa' without genuine interest in Greece or European real estate. Overpaying for a poorly located or poorly maintained property — of which there are many marketed as 'Golden Visa ready' — will underperform. The visa is not the return. The property is the return. The visa is the bonus.")}</p>
          </div>
        </div>
      </section>

      {/* Pros and cons */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Complete Pros & Cons")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="mb-4 font-semibold text-primary flex items-center gap-2"><ThumbsUp className="h-4 w-4" />{t("Advantages")}</h3>
              <ul className="space-y-3">
                {pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t(p)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background/40 p-6">
              <h3 className="mb-4 font-semibold flex items-center gap-2"><Scale className="h-4 w-4 text-muted-foreground" />{t("Considerations")}</h3>
              <ul className="space-y-3">
                {cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />{t(c)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's right for */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("Who Gets the Most Value from the Greek Golden Visa?")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("The investor profile that extracts maximum value from the Greek Golden Visa is typically: a non-EU national with liquid capital of €300,000–€500,000, a strategic interest in maintaining EU access regardless of political developments in their home country, and a genuine appreciation for the Mediterranean lifestyle and investment environment.")}</p>
            <p>{t("This profile is common among Turkish, Lebanese, Egyptian, Chinese, and increasingly American and British investors. For these investors, the Greek Golden Visa is not primarily a residency play — it is an optionality play. EU residency is the insurance policy. The property is the investment. The lifestyle is the dividend.")}</p>
            <p>{t("It is also well-suited to investors approaching retirement who want a plan B in a stable, beautiful EU country — where healthcare is excellent, the cost of living is lower than Western Europe, and the quality of life is among the highest in the Mediterranean.")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("Find Out If It's Right for You")}</h2>
          <p className="text-muted-foreground mb-8">{t("We give honest assessments — including telling investors when the programme isn't the right fit for their situation. Speak with an advisor, no pressure.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("is-worth-it")}>
            {t("Get My Honest Assessment")} <ArrowRight className="h-4 w-4" />
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

const IsGoldenVisaWorthIt = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default IsGoldenVisaWorthIt;
