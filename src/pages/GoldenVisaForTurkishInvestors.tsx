import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Globe, Shield, TrendingUp,
  Home, Users, DollarSign, AlertCircle, ChevronRight, Building,
} from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-turkish-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can Turkish citizens apply for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Turkish nationals are fully eligible for the Greek Golden Visa program. There are no nationality restrictions — all non-EU citizens can qualify. The minimum investment is €250,000 in eligible Greek real estate, with no requirement to reside in Greece. For Turkish passport holders, the Greek Golden Visa provides EU Schengen residency and visa-free access to 27 European countries.",
      },
    },
    {
      "@type": "Question",
      "name": "How does the Greek Golden Visa compare to Turkish residency-by-investment programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Greek Golden Visa (€250,000) provides full EU Schengen residency — granting the right to live in Greece and travel visa-free across 27 European countries. Turkey's citizenship-by-investment program ($400,000) provides Turkish citizenship but no EU access. For Turkish investors seeking EU Schengen travel rights and EU-jurisdiction property ownership, the Greek program is unmatched in value relative to cost.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the minimum investment for Turkish investors in the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum investment starts at €250,000 for real estate outside high-demand zones such as central Athens, Thessaloniki, Mykonos, and Santorini. The threshold is €800,000 for a single residential property (120m²+) anywhere in Greece, or for properties within the designated high-demand zones. Piraeus and the Athenian Riviera offer pre-verified compliant properties at the €250,000 threshold.",
      },
    },
    {
      "@type": "Question",
      "name": "Can Turkish investors manage the Greek Golden Visa process remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Property selection, legal due diligence, purchase, and application submission can all be managed remotely from Turkey through a power of attorney. A Greek tax number (AFM) and bank account are required but can be opened remotely. Only one trip to Greece is required — for the biometrics appointment — which can be scheduled at your convenience.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the Greek Golden Visa property eligible for rental income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. There is no restriction on generating rental income from a Golden Visa property in Greece. Many Turkish investors use their Athens properties for short-term Airbnb rental or long-term tenancy, targeting net annual yields of 5–7%. mAI Investments provides optional post-acquisition rental management services.",
      },
    },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for Turkish Investors — EU Residency Guide 2026",
  "description": "How Turkish nationals can obtain EU Schengen residency through Greek real estate investment. Investment thresholds, process, Schengen travel, and comparison with Turkish residency programs.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
  "about": { "@type": "Thing", "name": "Greek Golden Visa for Turkish Investors" },
  "inLanguage": ["en", "tr"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "Azerbaijan" },
    ],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa for Turkish Investors — EU Residency from €250K",
  "description": "How Turkish nationals can obtain EU Schengen residency through Greek real estate investment starting at €250,000.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "tr"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "Turkish Investors", "item": PAGE_URL },
  ],
};

const benefits = [
  { icon: Globe, title: "EU Schengen Residency", desc: "Visa-free travel across all 27 Schengen countries. No more individual Schengen visa applications for European travel." },
  { icon: Home, title: "No Minimum Stay", desc: "Keep your life in Turkey. Your Greek EU residency remains fully valid with zero physical presence required." },
  { icon: Users, title: "Full Family Coverage", desc: "Spouse, children under 21, and parents of both spouses all included in one application at no extra investment." },
  { icon: TrendingUp, title: "5–7% Rental Yields", desc: "Pre-verified Athens properties generate consistent 5–7% net annual rental yields with strong capital growth." },
  { icon: Shield, title: "5-Year Renewable Permit", desc: "Renewable indefinitely. Path to permanent residency and Greek citizenship after 7 years of physical residence." },
  { icon: DollarSign, title: "€250K Entry", desc: "The lowest threshold for EU Schengen residency by real estate investment — significantly below €500K programs." },
];

const investmentTiers = [
  { tier: "€250,000", areas: "Properties in Piraeus, Athenian Riviera, Greek mainland cities, and regional islands outside designated high-demand zones." },
  { tier: "€800,000", areas: "Single residential property (120m²+) in central Athens, Thessaloniki, Mykonos, or Santorini." },
];

const processSteps = [
  { n: "01", title: "Consultation & Property Shortlist", desc: "Align on budget, location, and timeline. Receive pre-verified, Golden Visa-compliant properties matched to your investment profile." },
  { n: "02", title: "Due Diligence", desc: "Our Greek legal team conducts title searches, tax clearance checks, and encumbrance verification for your selected property." },
  { n: "03", title: "Remote Legal Setup", desc: "Open your Greek tax number (AFM) and bank account remotely via power of attorney from Turkey — no initial trip required." },
  { n: "04", title: "Purchase & Land Registry", desc: "Sign the notarial deed. Register with the Land Registry. Transfer taxes ~3.09% of purchase price." },
  { n: "05", title: "Residency Application", desc: "Full application submitted. Temporary 180-day permit issued immediately. Processing begins." },
  { n: "06", title: "Biometrics — One Trip", desc: "Single trip to Greece for the biometrics appointment. Whole family attends together. Permit cards issued within 2–4 months." },
];

const comparisonData = [
  { program: "🇬🇷 Greece Golden Visa", invest: "€250,000", output: "EU Schengen Residency", stay: "None" },
  { program: "🇵🇹 Portugal Golden Visa", invest: "€500,000", output: "EU Schengen Residency", stay: "7 days/year" },
  { program: "🇪🇸 Spain Golden Visa", invest: "€500,000", output: "EU Schengen Residency", stay: "None" },
  { program: "🇹🇷 Turkey CBI", invest: "$400,000", output: "Turkish Citizenship (no EU)", stay: "None" },
  { program: "🇦🇪 UAE Golden Visa", invest: "AED 2M (~€500K)", output: "UAE Residency (no EU)", stay: "None" },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for Turkish Investors — EU Residency from €250K | mAI Investments</title>
        <meta name="description" content="Complete 2026 guide for Turkish nationals on the Greek Golden Visa. EU Schengen residency from €250,000. No minimum stay, full family inclusion, 5–7% rental yields. One trip to Greece." />
        <meta name="keywords" content="Greek Golden Visa Turkish investors, Turkey Golden Visa Greece, EU residency Turkish nationals, Yunan altın vize Türk yatırımcılar, Greece property Turkey, Schengen visa Turkey, Yunanistan altın vize" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="tr-TR"     href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa for Turkish Investors — EU Residency from €250K" />
        <meta property="og:description" content="EU Schengen residency from €250,000 for Turkish nationals. No minimum stay, full family inclusion, 5–7% rental yields." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa for Turkish investors — mAI Investments" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
              <span className="text-foreground font-medium" itemProp="name">Turkish Investors</span>
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
            Greek Golden Visa · Turkish Investors · Türk Yatırımcılar
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Turkish Investors
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU Schengen residency from <strong className="text-foreground">€250,000</strong> — fully open to Turkish nationals. Visa-free travel across 27 European countries, full family coverage, 5–7% rental yields. No minimum stay requirement.
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground/80">
            €250.000'dan başlayan AB Schengen oturma izni — Türk vatandaşlarına açık. 27 Avrupa ülkesinde vizesiz seyahat, aile dahil, asgari ikamet zorunluluğu yok.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("turkish-investors")}>
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
          <h2 className="mb-3 text-3xl font-bold text-center">Why Turkish Investors Choose Greece</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Greece offers the lowest EU Schengen residency threshold in Europe — with a transparent legal system, strong rental demand, and the freedom to travel across 27 countries.
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
            Greece uses a tiered investment system based on property location. All investors — regardless of nationality — have access to both tiers.
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
              <strong className="text-foreground">Note:</strong> All mAI Investments properties are pre-verified for Golden Visa compliance. Zone classification is confirmed before purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Program comparison */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Greek Golden Visa vs. Turkish CBI & Other Programs</h2>
          <p className="mb-8 text-muted-foreground">
            For Turkish investors, the Greek Golden Visa provides the only cost-effective path to EU Schengen residency and rights — something Turkish citizenship or UAE programs cannot offer.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-5 py-4 text-left font-semibold">Program</th>
                  <th className="px-5 py-4 text-left font-semibold">Min. Investment</th>
                  <th className="px-5 py-4 text-left font-semibold">What You Get</th>
                  <th className="px-5 py-4 text-left font-semibold">Stay Required</th>
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
                    <td className="px-5 py-4 text-muted-foreground">{row.output}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.stay}</td>
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
          <h2 className="mb-3 text-3xl font-bold">Step-by-Step Process from Turkey</h2>
          <p className="mb-10 text-muted-foreground">
            Manage the entire process remotely. Our team handles legal coordination from Istanbul to Athens.
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

      {/* FAQ */}
      <section className="py-20 bg-background/50">
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

      {/* Investor nationality cluster */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-xl font-bold">Greek Golden Visa by Nationality</h2>
          <p className="mb-6 text-sm text-muted-foreground">Dedicated guides for investors from each key source market.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { to: "/greek-golden-visa-chinese-investors/", label: "🇨🇳 Chinese Investors", desc: "Schengen access for Chinese nationals" },
              { to: "/greek-golden-visa-uae-investors/", label: "🇦🇪 UAE Investors", desc: "Manage from Dubai — one trip only" },
              { to: "/greek-golden-visa-russian-investors/", label: "🇷🇺 Russian Investors", desc: "EU residency & legal protection" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex flex-col gap-1 rounded-xl border border-border bg-background/40 px-4 py-4 text-sm hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <span className="font-semibold">{link.label}</span>
                <span className="text-xs text-muted-foreground">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-xl font-bold">Further Reading</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/greek-golden-visa/", label: "Greek Golden Visa — Full Overview" },
              { to: "/greek-golden-visa-requirements/", label: "Requirements & Document Checklist" },
              { to: "/250k-golden-visa-properties/", label: "€250K Pre-Verified Properties" },
              { to: "/golden-visa-journey/", label: "Step-by-Step Application Journey" },
              { to: "/golden-visa-for-investors/", label: "Golden Visa for Investors" },
              { to: "/golden-visa-family-included/", label: "Family Inclusion — Spouse & Children" },
              { to: "/golden-visa-by-nationality/", label: "Golden Visa by Nationality — All Guides" },
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
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Ready to Secure Your EU Residency?</h2>
            <p className="text-muted-foreground mb-2">Speak with our investment advisors — serving Turkish investors across Istanbul, Ankara, and Izmir.</p>
            <p className="text-sm text-muted-foreground mb-8">Yatırım danışmanlarımızla görüşün — İstanbul, Ankara ve İzmir'deki Türk yatırımcılara hizmet veriyoruz.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("turkish-investors")}>
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

const GoldenVisaForTurkishInvestors = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisaForTurkishInvestors;
