import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Globe, Users, Home, TrendingUp, Sun, Zap, ArrowRight, CheckCircle2, MapPin, Gavel, BadgeCheck } from "lucide-react";
import { useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import Footer from "@/components/Footer";

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa/`;

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa — EU Residency Through Real Estate Investment",
  "description": "Complete guide to the Greek Golden Visa program. Invest €250,000+ in real estate and get EU residency with access to 27 Schengen countries.",
  "url": `${BASE_URL}/greek-golden-visa/`,
  "datePublished": "2024-01-01",
  "dateModified": "2026-03-06",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/greek-golden-visa/` },
  "about": { "@type": "Thing", "name": "Greek Golden Visa" },
  "inLanguage": ["en", "ar", "zh", "tr"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "China" }
    ]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Greek Golden Visa Guide — EU Residency Through Real Estate",
  "description": "Complete guide to the Greek Golden Visa program. Invest €250,000+ in real estate and get EU residency with access to 27 Schengen countries.",
  "url": PAGE_URL,
  "datePublished": "2024-01-01",
  "dateModified": "2026-03-06",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": PAGE_URL },
    ],
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Greek Golden Visa is a residency-by-investment program that grants non-EU nationals and their families a 5-year renewable Greek residency permit in exchange for a qualifying real estate investment starting at €250,000.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does it take to get a Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process typically takes 6–9 months from initial consultation to residency permit approval, covering property selection, due diligence, legal registration, and the biometrics appointment.",
      },
    },
    {
      "@type": "Question",
      "name": "Can family members be included in a Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The main applicant's spouse, children under 21, and parents (of both spouses) can all be included in a single application at no additional investment threshold.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need to live in Greece to keep the Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No minimum stay is required. You maintain the residency permit simply by holding the qualifying real estate investment.",
      },
    },
  ],
};

const benefits = [
  { icon: Globe, title: "Schengen Access", desc: "Travel freely across all 27 Schengen Area countries without additional visas." },
  { icon: Users, title: "Full Family Coverage", desc: "Spouse, children under 21, and parents of both spouses included in one application." },
  { icon: Zap, title: "6–9 Month Processing", desc: "Streamlined process from initial consultation to residency permit." },
  { icon: Home, title: "No Minimum Stay", desc: "Maintain your permit without any compulsory time spent in Greece." },
  { icon: TrendingUp, title: "Investment Returns", desc: "Properties targeting 3–5% net rental yields with 8%+ annual appreciation." },
  { icon: Sun, title: "Mediterranean Quality of Life", desc: "300+ days of sunshine, world-class cuisine, and rich Hellenic culture." },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa — EU Residency Through Real Estate | mAI Investments</title>
        <meta name="description" content="Complete guide to the Greek Golden Visa. Invest €250K+ in real estate and get EU residency, Schengen access, and family coverage. Learn requirements, timeline & benefits." />
        <meta name="keywords" content="Greek Golden Visa, Greece Golden Visa, EU residency Greece, Greek residency by investment, Golden Visa benefits, Schengen access Greece" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        {/* Hreflang — all supported languages */}
        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB" href={PAGE_URL} />
        <link rel="alternate" hrefLang="el" href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="zh" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="ru" href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="fr" href={`${PAGE_URL}?lang=fr`} />
        <link rel="alternate" hrefLang="hi" href={`${PAGE_URL}?lang=hi`} />
        <link rel="alternate" hrefLang="he" href={`${PAGE_URL}?lang=he`} />
        <link rel="alternate" hrefLang="tr" href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta property="og:title" content="Greek Golden Visa — EU Residency Through Real Estate" />
        <meta property="og:description" content="Complete guide to the Greek Golden Visa. Invest €250K+ in real estate and get EU residency, Schengen access, and family coverage." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      </Helmet>

      <Navbar forceScrolled />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-foreground" itemProp="name">Greek Golden Visa</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Greek Golden Visa Program")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Greek Golden Visa")} —{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("EU Residency Through Real Estate")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Greece's Golden Visa program grants non-EU investors and their families a 5-year renewable EU residency permit in exchange for a real estate investment starting at")} <strong className="text-foreground">€250,000</strong>. {t("It is one of Europe's most accessible and rewarding residency-by-investment pathways.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("greek-golden-visa")}>
              {t("Start Your Application")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements/">{t("View Requirements")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("Why Choose the Greek Golden Visa?")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("Six reasons international investors choose Greece over other EU programs.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-background/40 p-6 backdrop-blur transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(179_90%_63%/0.06)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(b.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(b.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program overview */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("What Is the Greek Golden Visa Program?")}</h2>
          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t("Introduced in 2013, Greece's Golden Visa program (Law 4146/2013) allows citizens of non-EU/EEA countries to obtain a long-term EU residency permit by investing in Greek real estate. It has since become one of the most popular investor visa programs in Europe, attracting thousands of applications from Asia, the Middle East, the Americas, and beyond.")}
            </p>
            <p>
              {t("The permit is valid for 5 years and is fully renewable as long as the investment is maintained. Holders can live, work, and study anywhere in Greece, and travel without visas across the entire Schengen zone.")}
            </p>
            <p>
              {t("Unlike many competing programs, the Greek Golden Visa imposes no minimum stay requirements — making it ideal for investors who want EU access without relocating. After 7 years of residency, holders may apply for Greek citizenship.")}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              "€250,000 minimum real estate investment",
              "5-year renewable residency permit",
              "No minimum stay requirement",
              "Full Schengen Area travel freedom",
              "Entire family included in one application",
              "Path to Greek citizenship after 7 years",
              "Property can be rented out for income",
              "No requirement to transfer capital to Greece",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(point)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next step: Your Journey — contextual CTA */}
      <section className="py-16 bg-background/50 border-y border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex-1">
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
                {t("Next Step")}
              </span>
              <h2 className="text-2xl font-bold mb-2">{t("Your Golden Visa Journey")}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("Ready to go deeper? See the complete step-by-step process — from consultation and property selection to biometrics and your 5-year permit — with expected timelines at each stage.")}
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <Button asChild size="lg" className="rounded-full px-8 gap-2 whitespace-nowrap">
                <Link to="/golden-visa-journey/">
                  {t("See the Full Journey")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full px-6 text-center">
                <Link to="/greek-golden-visa-requirements/">{t("View Requirements")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background/50">
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

      {/* Internal links */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-2xl font-bold text-center">{t("Explore Further")}</h2>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <Link to="/greek-golden-visa-requirements/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Requirements")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t("Full documentation checklist and eligibility criteria.")}</p>
            </Link>
            <Link to="/250k-golden-visa-properties/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("€250K Properties")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t("Pre-verified investment properties starting at €250,000.")}</p>
            </Link>
            <Link to="/#contact" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Get a Consultation")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t("Speak with our investment advisors today.")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("Related Guides")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/golden-visa-tax-benefits" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Golden Visa Tax Benefits")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("Understand the tax advantages available to Golden Visa holders in Greece.")}</p>
            </Link>
            <Link to="/golden-visa-rental-income-properties" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Rental Income Properties")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("Properties selected for their rental income potential and net yields.")}</p>
            </Link>
            <Link to="/greek-golden-visa-requirements" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Requirements & Eligibility")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("Full documentation checklist and eligibility criteria for the Greek Golden Visa.")}</p>
            </Link>
            <Link to="/properties" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{t("Browse Properties")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("Explore the full portfolio of Golden Visa eligible properties in Athens and the Riviera.")}</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const GreekGoldenVisa = () => <Inner />;

export default GreekGoldenVisa;
