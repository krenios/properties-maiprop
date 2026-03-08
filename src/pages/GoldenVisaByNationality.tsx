import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Globe, Users, Shield, TrendingUp } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/golden-visa-by-nationality/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which nationalities are eligible for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All non-EU/EEA nationals are eligible for the Greek Golden Visa program. There are no nationality restrictions. Chinese, Russian, Turkish, UAE, American, Indian, Israeli, and investors from any non-EU country can apply with a minimum real estate investment of €250,000 in eligible Greek properties.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the application process differ by nationality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The core eligibility requirements and process are identical for all nationalities. Differences may arise in the bank account opening process and international funds transfer logistics — particularly for investors from countries with currency controls. Our team provides nationality-specific guidance on each aspect of the process.",
      },
    },
    {
      "@type": "Question",
      "name": "Which nationality makes up the most Greek Golden Visa applicants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chinese investors have historically been the largest single nationality group in the Greek Golden Visa program, followed by Turkish, Russian, Lebanese, and UAE-based investors. The program has expanded significantly since 2022, with growing demand from South Asian and Middle Eastern investors.",
      },
    },
    {
      "@type": "Question",
      "name": "Can an investor hold dual residency — for example Greek Golden Visa and UAE Golden Visa simultaneously?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. There is no restriction on holding multiple residency permits in different countries simultaneously. Many UAE-based investors hold both programs at once: the UAE Golden Visa for regional access and work rights, and the Greek Golden Visa for EU Schengen travel rights and EU-jurisdiction property ownership.",
      },
    },
    {
      "@type": "Question",
      "name": "Is there a hub page comparing all investor nationality guides for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — this page at /golden-visa-by-nationality/ provides an overview of all nationality-specific guides available: Chinese investors, UAE investors, Russian investors, and Turkish investors. Each guide covers nationality-specific considerations, investment thresholds, process steps, and FAQ.",
      },
    },
  ],
};

const hubLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa by Nationality — All Investor Guides",
  "description": "Dedicated Greek Golden Visa guides for Chinese, UAE, Russian, and Turkish investors. EU Schengen residency from €250,000 — open to all non-EU nationals.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-08",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "zh", "ar", "ru", "tr"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "By Nationality", "item": PAGE_URL },
  ],
};

const nationalityGuides = [
  {
    flag: "🇨🇳",
    title: "Chinese Investors",
    nativeName: "中国投资者",
    locale: "zh_CN",
    to: "/greek-golden-visa-chinese-investors/",
    tag: "chinese-investors",
    summary: "One of the top source countries for Greek Golden Visa applications. Mandarin-language advisory available. EU residency with Schengen-free access to 27 countries — from €250,000.",
    highlights: ["Mandarin advisory available", "No minimum stay", "Full family coverage", "€250K threshold"],
    comparison: "Lowest cost EU residency for Chinese nationals",
  },
  {
    flag: "🇦🇪",
    title: "UAE Investors",
    nativeName: "مستثمرو الإمارات",
    locale: "ar_AE",
    to: "/greek-golden-visa-uae-investors/",
    tag: "uae-investors",
    summary: "Manage the full process remotely from Dubai or Abu Dhabi — one trip to Greece required. Many UAE residents hold the Greek Golden Visa alongside their UAE Golden Visa for combined EU + UAE access.",
    highlights: ["Remote process from Dubai", "One trip required", "Combine with UAE GV", "Arabic advisory"],
    comparison: "Greece €250K vs. UAE AED 2M (~€500K)",
  },
  {
    flag: "🇷🇺",
    title: "Russian Investors",
    nativeName: "Российские инвесторы",
    locale: "ru_RU",
    to: "/greek-golden-visa-russian-investors/",
    tag: "russian-investors",
    summary: "Full EU Schengen residency — visa-free access to 27 European countries, EU legal framework for property ownership, and a hard-asset investment denominated in euros. Russian language advisory available.",
    highlights: ["Schengen-free travel", "EU legal protection", "Russian advisory", "€250K entry"],
    comparison: "Greece offers EU access no other program provides",
  },
  {
    flag: "🇹🇷",
    title: "Turkish Investors",
    nativeName: "Türk Yatırımcılar",
    locale: "tr_TR",
    to: "/greek-golden-visa-turkish-investors/",
    tag: "turkish-investors",
    summary: "The Greek Golden Visa (€250,000) provides full EU Schengen residency — the only cost-effective path to unrestricted European travel for Turkish nationals. Turkish language advisory available.",
    highlights: ["Schengen access for Turkish passport", "EU vs. Turkish CBI compared", "Turkish advisory", "€250K threshold"],
    comparison: "Greece €250K Schengen vs. Turkish CBI $400K no EU",
  },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa by Nationality — Chinese, UAE, Russian & Turkish Investor Guides | mAI Investments</title>
        <meta name="description" content="Dedicated Greek Golden Visa guides for Chinese, UAE, Russian, and Turkish investors. EU Schengen residency from €250,000. All nationalities eligible — no minimum stay." />
        <meta name="keywords" content="Greek Golden Visa by nationality, China UAE Russia Turkey Golden Visa Greece, EU residency all nationalities, Greek Golden Visa investor guides, golden visa by nationality" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="ru-RU"     href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="tr-TR"     href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa by Nationality — All Investor Guides" />
        <meta property="og:description" content="EU Schengen residency from €250,000 — dedicated guides for Chinese, UAE, Russian, and Turkish investors." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa by Nationality — mAI Investments" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(hubLd)}</script>
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
              <span className="text-foreground font-medium" itemProp="name">By Nationality</span>
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
            Greek Golden Visa · All Nationalities
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              by Nationality
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU Schengen residency from <strong className="text-foreground">€250,000</strong> — open to all non-EU nationals. Dedicated guides tailored to the specific questions, comparisons, and considerations of each investor community.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("nationality-hub")}>
              Speak to an Advisor <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties/">View €250K Properties</Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
            {[
              { value: "€250K", label: "Min. investment" },
              { value: "27", label: "Schengen countries" },
              { value: "All", label: "Nationalities eligible" },
              { value: "0", label: "Min. stay required" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background/40 p-4 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nationality Cards */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">Choose Your Nationality Guide</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Each guide covers nationality-specific investment considerations, fund transfer logistics, program comparisons, and frequently asked questions.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {nationalityGuides.map((guide) => (
              <Link
                key={guide.to}
                to={guide.to}
                className="group rounded-2xl border border-border bg-background/40 p-7 hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl leading-none">{guide.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{guide.title}</h3>
                      <span className="text-sm text-muted-foreground">{guide.nativeName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.highlights.map((h) => (
                        <span key={h} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/40 pt-3 mt-2">
                      <span className="text-secondary">⚡</span>
                      <span>{guide.comparison}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why eligible for all nationalities */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Open to All Non-EU Nationalities</h2>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            The Greek Golden Visa program has no nationality restrictions. Any non-EU/EEA citizen can apply, regardless of country of birth, current residence, or passport held. The minimum investment of <strong>€250,000</strong> in eligible Greek real estate is the only financial threshold — and it applies equally to all investors.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            What does vary by nationality is the practical pathway: how funds are transferred, which banking institutions to use, whether a Chinese or Arabic-language advisor is needed, and how to coordinate the power of attorney from a given country. These considerations are addressed in detail in each nationality-specific guide.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, title: "27 Schengen countries", desc: "Every Golden Visa holder gets visa-free access across the Schengen Area" },
              { icon: Users, title: "Full family included", desc: "Spouse, children under 21, and parents of both spouses — all in one application" },
              { icon: Shield, title: "5-year renewable permit", desc: "Renewable indefinitely, with a path to permanent residency and citizenship" },
              { icon: TrendingUp, title: "5–7% rental yield", desc: "Athens investment properties generate consistent rental income and capital appreciation" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-border bg-background/40 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program comparison table */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Greece vs. Competing Programs by Region</h2>
          <p className="mb-8 text-muted-foreground">
            For investors from China, the UAE, Russia, and Turkey — Greece consistently offers the best combination of cost, Schengen access, and flexibility.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-5 py-4 text-left font-semibold">Investor Origin</th>
                  <th className="px-5 py-4 text-left font-semibold text-primary">🇬🇷 Greece Golden Visa</th>
                  <th className="px-5 py-4 text-left font-semibold">Alternative Program</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { origin: "China / Hong Kong", greece: "€250K — EU Schengen + family", alt: "Portugal €500K — Schengen, fewer cities" },
                  { origin: "UAE / GCC", greece: "€250K — EU Schengen + no stay", alt: "UAE Golden Visa AED 2M — UAE only" },
                  { origin: "Russia / CIS", greece: "€250K — EU Schengen + legal protection", alt: "Spain €500K — Schengen, higher cost" },
                  { origin: "Turkey", greece: "€250K — EU Schengen residency", alt: "Turkish CBI $400K — Turkish citizenship, no EU" },
                ].map((row, i) => (
                  <tr key={row.origin} className={`border-b border-border/40 ${i % 2 === 0 ? "bg-background/20" : ""}`}>
                    <td className="px-5 py-4 font-medium text-muted-foreground">{row.origin}</td>
                    <td className="px-5 py-4 font-medium text-primary">{row.greece}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.alt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* Further Reading */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-xl font-bold">Further Reading</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/greek-golden-visa/", label: "Greek Golden Visa — Full Overview" },
              { to: "/greek-golden-visa-requirements/", label: "Requirements & Document Checklist" },
              { to: "/250k-golden-visa-properties/", label: "€250K Pre-Verified Properties" },
              { to: "/golden-visa-journey/", label: "Step-by-Step Application Journey" },
              { to: "/golden-visa-family-included/", label: "Family Inclusion — Spouse & Children" },
              { to: "/golden-visa-tax-benefits/", label: "Tax Benefits for Golden Visa Holders" },
              { to: "/greece-vs-dubai-golden-visa/", label: "Greece vs. Dubai Golden Visa" },
              { to: "/greece-vs-portugal-golden-visa/", label: "Greece vs. Portugal Golden Visa" },
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
            <h2 className="text-2xl font-bold mb-3">Ready to Begin Your Application?</h2>
            <p className="text-muted-foreground mb-8">
              Our multilingual team serves investors from China, the UAE, Russia, Turkey, and beyond — in English, Mandarin, Arabic, Russian, and Turkish.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("nationality-hub")}>
                Speak to an Advisor <ArrowRight className="h-4 w-4" />
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

const GoldenVisaByNationality = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisaByNationality;
