import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Globe, Shield, TrendingUp,
  Home, Users, Plane, DollarSign, AlertCircle, ChevronRight,
} from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-chinese-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can Chinese nationals apply for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Chinese nationals are fully eligible for the Greek Golden Visa program. China is one of the top source countries for Greek Golden Visa applicants. The process requires a minimum real estate investment of €250,000 in qualifying areas, with no requirement to reside in Greece.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the minimum investment for a Greek Golden Visa from China?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum real estate investment is €250,000 for properties outside high-demand zones such as central Athens, Thessaloniki, Mykonos, and Santorini. Properties in Greater Athens and premium tourist areas require a minimum of €800,000. Piraeus and the Athenian Riviera offer pre-verified compliant properties starting at €250,000.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the Greek Golden Visa allow travel across Europe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A Greek Golden Visa grants a 5-year renewable EU residency permit that allows visa-free travel across all 27 Schengen Area countries. For Chinese passport holders, this eliminates the need for individual Schengen visas for business or leisure travel throughout Europe.",
      },
    },
    {
      "@type": "Question",
      "name": "Can Chinese investors include their family in a Greek Golden Visa application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The spouse, children under 21, and parents of both the main applicant and their spouse can all be included in a single application at no additional investment cost. The entire family receives the same 5-year renewable EU residency permit.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does the Greek Golden Visa process take for Chinese investors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The full process typically takes 6–9 months: 1–2 months for property selection and due diligence, 1–2 months for the legal purchase and land registry transfer, 4–6 weeks for the entry visa application, and 2–4 months for the biometrics appointment in Greece followed by residency permit issuance. Only one trip to Greece is required.",
      },
    },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for Chinese Investors — Complete 2026 Guide",
  "description": "How Chinese nationals can obtain EU residency through Greek real estate investment. Complete guide covering eligibility, investment thresholds, process timeline, and tax benefits.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
  "about": { "@type": "Thing", "name": "Greek Golden Visa for Chinese Investors" },
  "inLanguage": ["en", "zh"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "China" },
      { "@type": "Country", "name": "Hong Kong" },
      { "@type": "Country", "name": "Taiwan" },
      { "@type": "Country", "name": "Singapore" },
    ],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa for Chinese Investors — Complete Guide 2026",
  "description": "How Chinese nationals can obtain EU residency through Greek real estate investment starting at €250,000.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "zh"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "Chinese Investors", "item": PAGE_URL },
  ],
};

const benefits = [
  { icon: Globe, title: "Schengen-Free Travel", desc: "Visa-free access to all 27 EU Schengen countries — France, Germany, Italy, Spain and more." },
  { icon: Home, title: "No Minimum Stay", desc: "Maintain your Greek residency without relocating. No physical presence required." },
  { icon: Users, title: "Full Family Coverage", desc: "Spouse, children under 21, and parents of both spouses included in one application." },
  { icon: TrendingUp, title: "Strong Rental Yields", desc: "Athens properties typically generate 5–7% net annual rental yields, plus capital appreciation." },
  { icon: Shield, title: "5-Year Renewable Permit", desc: "Renewable indefinitely. Path to permanent residency and citizenship after 7 years." },
  { icon: DollarSign, title: "€250K Entry Point", desc: "One of the lowest real estate investment thresholds for EU residency in the world." },
];

const investmentTiers = [
  { tier: "€250,000", areas: "Properties outside high-demand zones — Piraeus, Athenian Riviera, Greek mainland towns." },
  { tier: "€800,000", areas: "Central Athens, Thessaloniki, Mykonos, Santorini, and premium coastal areas." },
];

const processSteps = [
  { n: "01", title: "Initial Consultation", desc: "Align on budget, timeline, and property preferences. Our advisors confirm your eligibility and provide a personalised investment shortlist." },
  { n: "02", title: "Property Selection & Due Diligence", desc: "Select from pre-verified, Golden Visa-compliant properties. Title search, legal clearance, and encumbrance checks handled by our team." },
  { n: "03", title: "Open Greek Tax Number (AFM) & Bank Account", desc: "Required for all Greek property transactions. Can be handled remotely via power of attorney — no initial trip to Greece needed." },
  { n: "04", title: "Purchase & Land Registry Transfer", desc: "Sign the notarial deed and register the property. Transfer taxes are approximately 3.09% of purchase price." },
  { n: "05", title: "Golden Visa Application Submission", desc: "Submit the full residency application package. A temporary 180-day permit is issued immediately while processing continues." },
  { n: "06", title: "Biometrics Appointment in Greece", desc: "One trip to Greece required — the entire family attends together. All residency cards are issued at this stage." },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for Chinese Investors — EU Residency from €250K | mAI Investments</title>
        <meta name="description" content="Complete guide for Chinese nationals on the Greek Golden Visa. EU residency from €250,000, Schengen travel, full family coverage, and strong rental yields. 6–9 month process." />
        <meta name="keywords" content="Greek Golden Visa Chinese investors, China Golden Visa Greece, EU residency Chinese nationals, 中国投资者希腊黄金签证, Greece property investment China, Schengen visa China" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="tr-TR"     href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="zh_TW" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa for Chinese Investors — EU Residency from €250K" />
        <meta property="og:description" content="Complete guide for Chinese nationals. EU residency from €250,000, Schengen travel, full family coverage, and strong rental yields." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa for Chinese investors — mAI Investments" />
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
              <span className="text-foreground font-medium" itemProp="name">Chinese Investors</span>
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
            Greek Golden Visa · Chinese Investors · 中国投资者
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Chinese Investors
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU residency from <strong className="text-foreground">€250,000</strong> — open to all Chinese nationals. Schengen-free travel across Europe, full family coverage, and zero minimum stay requirements. One of the world's most accessible pathways to EU residency.
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground/80">
            欧盟居留权从25万欧元起 — 面向所有中国国籍投资者开放。申根免签证旅行，全家覆盖，无最低居住要求。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("chinese-investors")}>
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

      {/* Why China investors choose Greece */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">Why Chinese Investors Choose Greece</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Greece offers the lowest entry threshold for EU residency among all European Golden Visa programs — with strong yields, stable property rights, and a transparent legal framework.
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
          <h2 className="mb-4 text-3xl font-bold">Investment Thresholds for Chinese Nationals</h2>
          <p className="mb-8 text-muted-foreground">
            Greece operates a tiered investment system. The threshold depends entirely on the property's geographic zone — not on your nationality. Chinese investors have access to both tiers.
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
              <strong className="text-foreground">Tip:</strong> All properties sourced by mAI Investments are pre-verified for Golden Visa compliance. Zone classification is confirmed before purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-3xl font-bold">Step-by-Step Process for Chinese Investors</h2>
          <p className="mb-10 text-muted-foreground">
            The entire process can be managed remotely. Only one trip to Greece is required — for the biometrics appointment.
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

      {/* Greece vs other programs */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">Greece vs. Other EU Golden Visa Programs</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-5 py-4 text-left font-semibold">Program</th>
                  <th className="px-5 py-4 text-left font-semibold">Min. Investment</th>
                  <th className="px-5 py-4 text-left font-semibold">Stay Requirement</th>
                  <th className="px-5 py-4 text-left font-semibold">Family Included</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { country: "🇬🇷 Greece", invest: "€250,000", stay: "None", family: "✅ Yes" },
                  { country: "🇵🇹 Portugal", invest: "€500,000", stay: "7 days/year", family: "✅ Yes" },
                  { country: "🇪🇸 Spain", invest: "€500,000", stay: "None", family: "✅ Yes" },
                  { country: "🇮🇹 Italy", invest: "€250,000", stay: "None", family: "✅ Yes" },
                  { country: "🇦🇪 UAE", invest: "$750,000+", stay: "None", family: "✅ Yes" },
                ].map((row, i) => (
                  <tr key={row.country} className={`border-b border-border/40 ${i === 0 ? "bg-primary/5" : ""}`}>
                    <td className="px-5 py-4 font-medium">{row.country}{i === 0 && <span className="ml-2 text-xs text-primary font-semibold">Recommended</span>}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.invest}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.stay}</td>
                    <td className="px-5 py-4">{row.family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              { to: "/greek-golden-visa-uae-investors/", label: "🇦🇪 UAE Investors", desc: "Manage from Dubai — one trip only" },
              { to: "/greek-golden-visa-russian-investors/", label: "🇷🇺 Russian Investors", desc: "Schengen access & EU legal protection" },
              { to: "/greek-golden-visa-turkish-investors/", label: "🇹🇷 Turkish Investors", desc: "EU residency vs. Turkish CBI compared" },
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
              { to: "/golden-visa-tax-benefits/", label: "Tax Benefits for Golden Visa Holders" },
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
            <h2 className="text-2xl font-bold mb-3">Ready to Start Your EU Residency Journey?</h2>
            <p className="text-muted-foreground mb-2">Speak with our investment advisors — available in English and Mandarin.</p>
            <p className="text-sm text-muted-foreground mb-8">与我们的投资顾问联系 — 提供英文及普通话服务。</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("chinese-investors")}>
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

const GoldenVisaForChineseInvestors = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisaForChineseInvestors;
