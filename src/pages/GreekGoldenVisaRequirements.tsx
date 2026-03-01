import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, ArrowRight, AlertCircle } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-requirements/`;

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa Requirements — Documents & Eligibility 2025",
  "description": "Full checklist of Greek Golden Visa requirements. Documents needed, eligibility criteria, investment thresholds, and step-by-step process.",
  "url": `${BASE_URL}/greek-golden-visa-requirements/`,
  "datePublished": "2024-01-01",
  "dateModified": "2025-02-01",
  "author": { "@type": "Organization", "name": "mAI Prop" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/greek-golden-visa-requirements/` },
  "about": { "@type": "Thing", "name": "Greek Golden Visa Requirements" },
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
  "name": "Greek Golden Visa Requirements — Documents & Eligibility",
  "description": "Full checklist of Greek Golden Visa requirements. Documents needed, eligibility criteria, investment thresholds, and step-by-step process.",
  "url": PAGE_URL,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": BASE_URL + "/greek-golden-visa/" },
      { "@type": "ListItem", "position": 3, "name": "Requirements", "item": PAGE_URL },
    ],
  },
};

const eligibility = [
  "Non-EU / non-EEA national (any nationality)",
  "Minimum age: 18 years old",
  "Clean criminal record (from country of origin and residence)",
  "Valid travel document / passport",
  "Proof of health insurance covering Greece",
  "No prior illegal entry or overstay in Greece",
];

const investmentOptions = [
  { tier: "€250,000", desc: "Commercial property converted to residential, or properties outside high-demand zones (Athens city center, Mykonos, Santorini, Thessaloniki, South Athens)." },
  { tier: "€400,000", desc: "Residential property in high-demand areas: central Athens, Thessaloniki, Mykonos, Santorini, South Athens coast." },
  { tier: "€800,000", desc: "Single residential unit of at least 120m² anywhere in Greece (premium threshold introduced 2024)." },
];

const steps = [
  { n: "01", title: "Initial Consultation & Property Selection", desc: "Align on budget, location, and objectives. Review pre-verified shortlist from mAI Investments." },
  { n: "02", title: "Legal & Due Diligence", desc: "Appoint a Greek notary and lawyer. Title search, tax clearance, and property encumbrance checks." },
  { n: "03", title: "Open Greek Tax Number (AFM)", desc: "Required for all property transactions. Obtained in 1–2 business days." },
  { n: "04", title: "Open Greek Bank Account", desc: "For payment transfer. Most major Greek banks accept non-resident investors." },
  { n: "05", title: "Purchase Contract & Registration", desc: "Sign notarial deed. Register with the Land Registry and pay relevant transfer taxes (~3.09%)." },
  { n: "06", title: "Golden Visa Application Submission", desc: "Submit residency application with documents. Receive temporary permit (180 days) to proceed." },
  { n: "07", title: "Biometrics Appointment", desc: "Attend appointment in Greece (one trip required). Entire family applies together." },
  { n: "08", title: "Residency Permit Issued", desc: "5-year Golden Visa card issued. Renewable indefinitely while investment is maintained." },
];

const documents = [
  "Passport copies (valid for at least 12 months)",
  "Recent passport-size photographs",
  "Proof of property ownership (notarial deed)",
  "Property purchase receipt / bank transfer confirmation",
  "Health insurance policy covering Greece (min €30,000 coverage)",
  "Criminal record certificate (apostilled, translated to Greek)",
  "Greek tax number (AFM) certificate",
  "Marriage certificate (for spousal applications, apostilled)",
  "Birth certificates for dependent children (apostilled)",
  "Application form (signed by each family member)",
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum investment for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum investment starts at €250,000 for properties in low-demand areas (outside Greater Athens, Thessaloniki, Mykonos, and Santorini). In high-demand zones — including Greater Athens and tourist islands — the threshold is €800,000.",
      },
    },
    {
      "@type": "Question",
      "name": "What documents are required for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Required documents include a valid passport, birth certificate, marriage certificate (if applicable), clean criminal record certificate, proof of health insurance, proof of real estate purchase (notarised deed + land registry transfer certificate), and recent passport-size photographs. All foreign documents must be apostilled and accompanied by a certified Greek translation.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does the Greek Golden Visa application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From property purchase to residency permit issuance typically takes 6–9 months. The main steps are: property search and due diligence (1–2 months), purchase completion and legal registration (1–2 months), visa/entry permit application (4–6 weeks), and biometrics appointment in Greece followed by permit issuance (2–4 months).",
      },
    },
    {
      "@type": "Question",
      "name": "Can I include my family in the Greek Golden Visa application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The spouse or registered partner, children under 21, and parents of both the main applicant and spouse are all eligible for inclusion in a single application with no additional investment required.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need to live in Greece to maintain my Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. There is no minimum stay requirement. Your 5-year renewable residency permit remains valid as long as you continue to hold the qualifying real estate investment.",
      },
    },
    {
      "@type": "Question",
      "name": "Can the Golden Visa property be rented out?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. There is no restriction on renting out the investment property. Many investors earn net rental yields of 5–7% annually through short-term platforms such as Airbnb or long-term tenancies.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens after 5 years — can I apply for citizenship?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Golden Visa itself does not automatically lead to citizenship. However, if you physically reside in Greece for at least 7 years (183+ days/year) you may apply for permanent residency and eventually naturalisation. The permit is renewable indefinitely as long as the property investment is maintained.",
      },
    },
  ],
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa Requirements — Documents & Eligibility 2025 | mAI Investments</title>
        <meta name="description" content="Complete Greek Golden Visa requirements checklist for 2025. Documents needed, investment thresholds (€250K–€800K), eligibility, and step-by-step application process." />
        <meta name="keywords" content="Greek Golden Visa requirements, Golden Visa documents Greece, Greece residency investment requirements, Golden Visa eligibility, €250000 Golden Visa Greece" />
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
        <meta property="og:title" content="Greek Golden Visa Requirements — Documents & Eligibility 2025" />
        <meta property="og:description" content="Complete checklist of Greek Golden Visa requirements — documents, investment thresholds, and step-by-step application guide." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
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
                <Link to="/greek-golden-visa/" className="hover:text-primary transition-colors" itemProp="item"><span itemProp="name">Greek Golden Visa</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-foreground" itemProp="name">Requirements</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Requirements & Eligibility
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa Requirements{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">2025</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you need to qualify, apply, and receive your Greek Golden Visa — from investment thresholds to the full document checklist.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("requirements")}>
              Check My Eligibility <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties/">View €250K Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">Eligibility Criteria</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {eligibility.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment tiers */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-2xl font-bold">Investment Thresholds</h2>
          <p className="mb-8 text-muted-foreground">Greece operates a tiered investment system introduced in 2023–2024. The threshold depends on the property's location and type.</p>
          <div className="space-y-4">
            {investmentOptions.map((opt) => (
              <div key={opt.tier} className="rounded-xl border border-border bg-background/40 p-6 flex items-start gap-5">
                <span className="shrink-0 text-2xl font-bold text-primary">{opt.tier}</span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{opt.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Properties in high-demand zones (central Athens, Thessaloniki, Mykonos, Santorini) require the €400,000 threshold. Always confirm zoning with your legal advisor before purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-step process */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">Step-by-Step Application Process</h2>
          <div className="space-y-4">
            {steps.map((s) => (
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

      {/* Documents */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-2xl font-bold">Required Documents Checklist</h2>
          <p className="mb-8 text-muted-foreground">All foreign documents must be apostilled and accompanied by a certified Greek translation.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {documents.map((doc) => (
              <div key={doc} className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background/50">
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

      {/* CTA */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-8">Our advisors handle the entire process — from property selection to permit issuance. Talk to us today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("requirements")}>
              Start My Application <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties/">Browse €250K Properties</Link>
            </Button>
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

const GreekGoldenVisaRequirements = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GreekGoldenVisaRequirements;
