import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Globe, Shield, TrendingUp,
  Home, Users, DollarSign, AlertCircle, ChevronRight, Building,
} from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-russian-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can Russian citizens apply for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Russian nationals are fully eligible to apply for the Greek Golden Visa through real estate investment. The program has no nationality restrictions — any non-EU citizen can qualify. The minimum investment is €250,000 in eligible Greek real estate, with no requirement to relocate or spend time in Greece.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the Greek Golden Visa grant Schengen travel rights to Russian passport holders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A Greek Golden Visa provides a 5-year renewable EU residency permit that grants the right to live in Greece and travel freely across all 27 Schengen Area countries without needing additional visas. For Russian passport holders, this is one of the most practical legal pathways to unrestricted European travel.",
      },
    },
    {
      "@type": "Question",
      "name": "How can Russian investors transfer funds for a Greek property purchase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Property purchases must be paid through a Greek bank account opened in the buyer's name. Funds can be transferred internationally from any compliant financial institution. Our team coordinates the Greek bank account opening process remotely. We recommend consulting a financial compliance advisor to ensure the transfer route is appropriate for your specific situation.",
      },
    },
    {
      "@type": "Question",
      "name": "Can family members of Russian investors be included in the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The spouse or registered partner, children under 21, and parents of both the main applicant and their spouse are all eligible for inclusion in a single application at no additional investment cost. All included family members receive the same 5-year renewable EU residency permit.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the complete investment threshold for the Greek Golden Visa in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The investment thresholds are: €250,000 for properties outside high-demand zones (applicable in Piraeus, the Athenian Riviera, and most of the Greek mainland); €800,000 for residential properties in central Athens, Thessaloniki, Mykonos, and Santorini. All properties sourced by mAI Investments are pre-verified for Golden Visa compliance under the applicable threshold.",
      },
    },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for Russian Investors — EU Residency Guide 2026",
  "description": "How Russian nationals can obtain EU Schengen residency through Greek real estate investment. Investment thresholds, process timeline, Schengen travel rights, and family inclusion.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
  "about": { "@type": "Thing", "name": "Greek Golden Visa for Russian Investors" },
  "inLanguage": ["en", "ru"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "Russia" },
      { "@type": "Country", "name": "Kazakhstan" },
      { "@type": "Country", "name": "Belarus" },
      { "@type": "Country", "name": "Georgia" },
      { "@type": "Country", "name": "Armenia" },
    ],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa for Russian Investors — EU Residency from €250K",
  "description": "How Russian nationals can obtain EU residency through Greek real estate investment starting at €250,000.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "ru"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "Russian Investors", "item": PAGE_URL },
  ],
};

const benefits = [
  { icon: Globe, title: "Schengen-Free Travel", desc: "Live in Greece and travel visa-free across all 27 EU Schengen countries. No per-trip visa applications." },
  { icon: Home, title: "No Minimum Stay", desc: "Your EU residency remains valid with zero physical presence required in Greece." },
  { icon: Users, title: "Full Family Coverage", desc: "Spouse, children under 21, and parents of both spouses included in one application at no extra cost." },
  { icon: TrendingUp, title: "5–7% Rental Yields", desc: "Athens investment properties consistently deliver 5–7% net annual yields with strong capital appreciation." },
  { icon: Shield, title: "5-Year Renewable Permit", desc: "Renewable indefinitely. Path to permanent residency and eventual citizenship after 7 years of physical residence." },
  { icon: DollarSign, title: "€250K Entry Point", desc: "Europe's most accessible Golden Visa threshold — significantly lower than Portugal, Spain, or Italy." },
];

const investmentTiers = [
  { tier: "€250,000", areas: "Properties in Piraeus, Athenian Riviera, Greek mainland cities, and regional islands outside the designated high-demand zones." },
  { tier: "€800,000", areas: "Single residential property (120m²+) in central Athens, Thessaloniki, Mykonos, or Santorini." },
];

const processSteps = [
  { n: "01", title: "Initial Consultation", desc: "Align on investment budget, location preferences, and timeline. Receive a pre-verified property shortlist matched to your criteria." },
  { n: "02", title: "Property Selection & Due Diligence", desc: "Select a Golden Visa-compliant property. Our team coordinates title searches, tax clearance, and encumbrance checks." },
  { n: "03", title: "Remote Legal Setup", desc: "Open a Greek tax number (AFM) and Greek bank account remotely via power of attorney. No initial trip to Greece required." },
  { n: "04", title: "Purchase & Registration", desc: "Sign the notarial deed and register with the Land Registry. Transfer taxes approximately 3.09% of purchase price." },
  { n: "05", title: "Residency Application", desc: "Full application package submitted. A temporary 180-day permit is issued immediately while processing continues." },
  { n: "06", title: "Biometrics — One Trip", desc: "One single trip to Greece required for the biometrics appointment. The entire family attends together. Permits issued within 2–4 months." },
];

const comparisonData = [
  { program: "🇬🇷 Greece", invest: "€250,000", stay: "None", schengen: "✅ 27 countries", family: "✅ Yes" },
  { program: "🇵🇹 Portugal", invest: "€500,000", stay: "7 days/year", schengen: "✅ 27 countries", family: "✅ Yes" },
  { program: "🇪🇸 Spain", invest: "€500,000", stay: "None", schengen: "✅ 27 countries", family: "✅ Yes" },
  { program: "🇮🇹 Italy", invest: "€250,000", stay: "None", schengen: "✅ 27 countries", family: "✅ Yes" },
  { program: "🇦🇪 UAE", invest: "AED 2M (~€500K)", stay: "None", schengen: "❌ UAE only", family: "✅ Yes" },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for Russian Investors — EU Residency from €250K | mAI Investments</title>
        <meta name="description" content="Complete 2026 guide for Russian nationals on the Greek Golden Visa. EU Schengen residency from €250,000. No minimum stay, full family inclusion, 5–7% rental yields. One trip to Greece." />
        <meta name="keywords" content="Greek Golden Visa Russian investors, Russia Golden Visa Greece, EU residency Russian nationals, греческая золотая виза для россиян, Greece property Russia, Schengen visa Russians, греческая виза резидент" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="ru-RU"     href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="tr-TR"     href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa for Russian Investors — EU Residency from €250K" />
        <meta property="og:description" content="EU Schengen residency from €250,000 for Russian nationals. No minimum stay, full family inclusion, 5–7% rental yields." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa for Russian investors — mAI Investments" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(pageLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar forceScrolled />

      {/* Breadcrumb */}
      <nav className="mt-[64px] border-b border-border/40 bg-background/80 backdrop-blur-sm" aria-label="Breadcrumb">
        <div className="container mx-auto px-6 py-4">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">{t("Home")}</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-muted-foreground/50 select-none">›</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/greek-golden-visa/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">{t("Greek Golden Visa")}</span></Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-muted-foreground/50 select-none">›</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-foreground font-medium" itemProp="name">Russian Investors</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative">
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Greek Golden Visa · Russian Investors · Российские инвесторы
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Russian Investors
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU Schengen residency from <strong className="text-foreground">€250,000</strong> — fully open to Russian nationals. Travel freely across 27 European countries, include the whole family, and generate 5–7% rental income. Zero minimum stay requirement.
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground/80">
            Европейское резидентство от €250 000 — доступно для граждан России. Шенгенская зона, семейное включение, доходность 5–7%.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("russian-investors")}>
              Start My Application <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties/">View €250K Properties</Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
            {[
              { value: "€250K", label: "Minimum investment" },
              { value: "27", label: "Schengen countries" },
              { value: "5yr", label: "Renewable permit" },
              { value: "1", label: "Trip to Greece" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background/40 p-4 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">Why Russian Investors Choose Greece</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            The Greek Golden Visa offers the lowest real estate investment threshold for EU Schengen residency in Europe — with full legal transparency, strong rental demand, and no stay requirements.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-colors">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Thresholds */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Investment Thresholds — 2026</h2>
          <p className="mb-8 text-muted-foreground">
            Greece operates a tiered system based on property location. The threshold applies to all investors equally — regardless of nationality.
          </p>
          <div className="space-y-4">
            {investmentTiers.map((t) => (
              <div key={t.tier} className="rounded-xl border border-border bg-background/40 p-6 flex items-start gap-5">
                <span className="shrink-0 text-2xl font-bold text-primary">{t.tier}</span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{t.areas}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Important:</strong> All mAI Investments properties are pre-verified for Golden Visa compliance. Zone classification and eligibility are confirmed before purchase commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Program comparison */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Greece vs. Other Residency Programs</h2>
          <p className="mb-8 text-muted-foreground">
            Compared to Portugal, Spain, and Italy — Greece offers the same Schengen access at the lowest entry cost with the fewest restrictions.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-5 py-4 text-left font-semibold">Program</th>
                  <th className="px-5 py-4 text-left font-semibold">Min. Investment</th>
                  <th className="px-5 py-4 text-left font-semibold">Stay Required</th>
                  <th className="px-5 py-4 text-left font-semibold">Schengen</th>
                  <th className="px-5 py-4 text-left font-semibold">Family</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.program} className={`border-b border-border/40 ${i === 0 ? "bg-primary/5" : ""}`}>
                    <td className="px-5 py-4 font-medium">
                      {row.program}
                      {i === 0 && <span className="ml-2 text-xs text-primary font-semibold">Recommended</span>}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{row.invest}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.stay}</td>
                    <td className="px-5 py-4">{row.schengen}</td>
                    <td className="px-5 py-4">{row.family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-3xl font-bold">Step-by-Step Process</h2>
          <p className="mb-10 text-muted-foreground">
            The full process takes 6–9 months. Most steps are handled remotely — only one trip to Greece is required.
          </p>
          <div className="space-y-4">
            {processSteps.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-xl border border-border bg-background/40 p-5">
                <span className="shrink-0 text-3xl font-bold text-primary/30">{s.n}</span>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Athens market */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-3xl font-bold">The Athens Property Market</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { stat: "8–12%", desc: "Average annual capital appreciation in prime Athens neighbourhoods since 2019" },
              { stat: "5–7%", desc: "Net rental yield on pre-verified Golden Visa investment properties" },
              { stat: "€2,800", desc: "Average price per m² in central Athens — significantly below Paris, Madrid, or Lisbon" },
            ].map((item) => (
              <div key={item.stat} className="rounded-xl border border-border bg-background/40 p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            Athens has experienced one of the strongest real estate recoveries in Europe over the past six years. Low price-per-square-metre compared to Western European capitals, strong short-term rental demand from tourism, and a growing digital nomad and expat population have all contributed to consistent yield and value growth. For Russian investors seeking a hard-asset hedge denominated in euros within the EU legal framework, Athens represents a compelling combination of yield and security.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqLd.mainEntity.map((q) => (
              <div key={q.name} className="rounded-xl border border-border bg-background/40 p-6">
                <h3 className="mb-2 font-semibold">{q.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-xl font-bold">Further Reading</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/greek-golden-visa/", label: "Greek Golden Visa — Full Overview" },
              { to: "/greek-golden-visa-requirements/", label: "Requirements & Document Checklist" },
              { to: "/250k-golden-visa-properties/", label: "€250K Pre-Verified Properties" },
              { to: "/golden-visa-journey/", label: "Step-by-Step Application Journey" },
              { to: "/golden-visa-tax-benefits/", label: "Tax Benefits for Golden Visa Holders" },
              { to: "/golden-visa-family-included/", label: "Family Inclusion — Spouse & Children" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-4 py-3 text-sm hover:border-primary/30 hover:text-primary transition-all"
              >
                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Ready to Secure Your EU Residency?</h2>
            <p className="text-muted-foreground mb-2">Speak with our investment advisors — English and Russian available.</p>
            <p className="text-sm text-muted-foreground mb-8">Свяжитесь с нашими инвестиционными консультантами — доступны на английском и русском языках.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("russian-investors")}>
                Contact Us <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/golden-visa-journey/">View Full Process</Link>
              </Button>
            </div>
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

const GoldenVisaForRussianInvestors = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisaForRussianInvestors;
