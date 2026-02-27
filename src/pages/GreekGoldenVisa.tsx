import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Globe, Users, Home, TrendingUp, Sun, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa/`;

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa — EU Residency Through Real Estate Investment",
  "description": "Complete guide to the Greek Golden Visa program. Invest €250,000+ in real estate and get EU residency with access to 27 Schengen countries.",
  "url": `${BASE_URL}/greek-golden-visa/`,
  "datePublished": "2024-01-01",
  "dateModified": "2025-02-01",
  "author": { "@type": "Organization", "name": "mAI Prop" },
  "publisher": {
    "@type": "Organization",
    "name": "mAI Prop",
    "logo": { "@type": "ImageObject", "url": `${BASE_URL}/images/maiprop-logo.webp` }
  },
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
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa — EU Residency Through Real Estate | mAI Investments</title>
        <meta name="description" content="Complete guide to the Greek Golden Visa. Invest €250K+ in real estate and get EU residency, Schengen access, and family coverage. Learn requirements, timeline & benefits." />
        <meta name="keywords" content="Greek Golden Visa, Greece Golden Visa, EU residency Greece, Greek residency by investment, Golden Visa benefits, Schengen access Greece" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        {/* Hreflang — US, UAE, Turkey, UK, China */}
        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB" href={PAGE_URL} />
        <link rel="alternate" hrefLang="ar" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="tr" href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="zh" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa — EU Residency Through Real Estate" />
        <meta property="og:description" content="Complete guide to the Greek Golden Visa. Invest €250K+ in real estate and get EU residency, Schengen access, and family coverage." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
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
            Greek Golden Visa Program
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Greek Golden Visa —{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EU Residency Through Real Estate
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Greece's Golden Visa program grants non-EU investors and their families a 5-year renewable EU residency permit in exchange for a real estate investment starting at <strong className="text-foreground">€250,000</strong>. It is one of Europe's most accessible and rewarding residency-by-investment pathways.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("greek-golden-visa")}>
              Start Your Application <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements/">View Requirements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">Why Choose the Greek Golden Visa?</h2>
          <p className="mb-12 text-center text-muted-foreground">Six reasons international investors choose Greece over other EU programs.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-background/40 p-6 backdrop-blur transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(179_90%_63%/0.06)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program overview */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">What Is the Greek Golden Visa Program?</h2>
          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Introduced in 2013, Greece's <strong className="text-foreground">Golden Visa program</strong> (Law 4146/2013) allows citizens of non-EU/EEA countries to obtain a long-term EU residency permit by investing in Greek real estate. It has since become one of the most popular investor visa programs in Europe, attracting thousands of applications from Asia, the Middle East, the Americas, and beyond.
            </p>
            <p>
              The permit is valid for <strong className="text-foreground">5 years</strong> and is fully renewable as long as the investment is maintained. Holders can live, work, and study anywhere in Greece, and travel without visas across the entire <strong className="text-foreground">Schengen zone</strong>.
            </p>
            <p>
              Unlike many competing programs, the Greek Golden Visa imposes <strong className="text-foreground">no minimum stay requirements</strong> — making it ideal for investors who want EU access without relocating. After 7 years of residency, holders may apply for Greek citizenship.
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
                <span className="text-sm text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqLd.mainEntity.map((q: any) => (
              <div key={q.name} className="rounded-xl border border-border bg-background/40 p-6">
                <h3 className="mb-2 font-semibold">{q.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-2xl font-bold text-center">Explore Further</h2>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <Link to="/greek-golden-visa-requirements/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Requirements</h3>
              <p className="mt-1 text-xs text-muted-foreground">Full documentation checklist and eligibility criteria.</p>
            </Link>
            <Link to="/250k-golden-visa-properties/" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">€250K Properties</h3>
              <p className="mt-1 text-xs text-muted-foreground">Pre-verified investment properties starting at €250,000.</p>
            </Link>
            <Link to="/#contact" className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Get a Consultation</h3>
              <p className="mt-1 text-xs text-muted-foreground">Speak with our investment advisors today.</p>
            </Link>
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

const GreekGoldenVisa = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GreekGoldenVisa;
