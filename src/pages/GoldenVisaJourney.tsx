import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, FileText, ArrowRight, AlertCircle,
  MessageCircle, Home, Gavel, CreditCard, Fingerprint, BadgeCheck,
} from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/golden-visa-journey/`;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "Your Golden Visa Journey", "item": PAGE_URL },
  ],
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a Greek Golden Visa",
  "description": "Step-by-step process to obtain a Greek Golden Visa through real estate investment.",
  "url": PAGE_URL,
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Initial Consultation & Property Selection", "text": "Align on budget, location, and objectives. Review pre-verified shortlist from mAI Investments." },
    { "@type": "HowToStep", "position": 2, "name": "Legal & Due Diligence", "text": "Appoint a Greek notary and lawyer. Title search, tax clearance, and property encumbrance checks." },
    { "@type": "HowToStep", "position": 3, "name": "Open Greek Tax Number (AFM)", "text": "Required for all property transactions. Obtained in 1–2 business days." },
    { "@type": "HowToStep", "position": 4, "name": "Open Greek Bank Account", "text": "For payment transfer. Most major Greek banks accept non-resident investors." },
    { "@type": "HowToStep", "position": 5, "name": "Purchase Contract & Registration", "text": "Sign notarial deed. Register with the Land Registry and pay relevant transfer taxes (~3.09%)." },
    { "@type": "HowToStep", "position": 6, "name": "Golden Visa Application Submission", "text": "Submit residency application with documents. Receive temporary permit (180 days) to proceed." },
    { "@type": "HowToStep", "position": 7, "name": "Biometrics Appointment", "text": "Attend appointment in Greece (one trip required). Entire family applies together." },
    { "@type": "HowToStep", "position": 8, "name": "Residency Permit Issued", "text": "5-year Golden Visa card issued. Renewable indefinitely while investment is maintained." },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the Greek Golden Visa process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The process typically takes 6–9 months end-to-end: 1–2 months for property selection and due diligence, 1–2 months for legal purchase and registration, 4–6 weeks for the entry visa, and 2–4 months for the biometrics appointment followed by permit issuance.",
      },
    },
    {
      "@type": "Question",
      name: "How many trips to Greece are required for the Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only one trip to Greece is required — for the biometrics appointment where all family members apply together. Property purchase, legal processes, and application submission can all be handled remotely through a power of attorney.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in mAI Investments' Golden Visa service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "mAI Investments provides end-to-end support: eligibility assessment, pre-verified property shortlisting, legal coordination (notary, lawyer, AFM, bank account), full application document preparation, family inclusion management, and post-visa rental management and yield optimisation.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after the Golden Visa is issued?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After the 5-year Golden Visa card is issued, it is renewable indefinitely as long as the qualifying real estate investment is maintained. After 7 years of physical residence in Greece (183+ days/year), holders may apply for Greek citizenship.",
      },
    },
  ],
};

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Consultation & Eligibility Check",
    desc: "Align on budget, location, and objectives. Our advisors confirm your eligibility and build a personalised investment plan.",
    detail: "1–2 weeks",
  },
  {
    n: "02",
    icon: Home,
    title: "Property Selection",
    desc: "Browse our pre-verified, Golden Visa-eligible portfolio. We shortlist options that match your criteria and arrange viewings.",
    detail: "2–4 weeks",
  },
  {
    n: "03",
    icon: Gavel,
    title: "Legal & Due Diligence",
    desc: "Appoint a Greek notary and lawyer. Title search, tax clearance, and encumbrance checks — fully coordinated by mAI.",
    detail: "1–2 weeks",
  },
  {
    n: "04",
    icon: CreditCard,
    title: "Purchase & Registration",
    desc: "Open your Greek tax number (AFM) and bank account. Sign the notarial deed and register with the Land Registry. Transfer taxes ~3.09%.",
    detail: "2–4 weeks",
  },
  {
    n: "05",
    icon: FileText,
    title: "Visa Application",
    desc: "We compile and submit your full residency application. A temporary 180-day permit is issued immediately to allow you to proceed.",
    detail: "4–6 weeks",
  },
  {
    n: "06",
    icon: Fingerprint,
    title: "Biometrics Appointment",
    desc: "One trip to Greece required. The entire family — spouse, children under 21, and parents of both spouses — applies together.",
    detail: "1 day in Greece",
  },
  {
    n: "07",
    icon: BadgeCheck,
    title: "Permit Issued",
    desc: "Your 5-year Golden Visa residency card is issued. Renewable indefinitely while the property investment is maintained.",
    detail: "2–4 months",
  },
];

const timeline = [
  { phase: "Property search & due diligence", duration: "1–2 months" },
  { phase: "Purchase completion & legal registration", duration: "1–2 months" },
  { phase: "Visa/entry permit application", duration: "4–6 weeks" },
  { phase: "Biometrics + permit issuance", duration: "2–4 months" },
  { phase: "Total end-to-end", duration: "6–9 months", highlight: true },
];

const included = [
  "Eligibility assessment & investment strategy",
  "Pre-verified property shortlisting",
  "Legal coordination (notary, lawyer, AFM, bank account)",
  "Full application document preparation",
  "Family inclusion — spouse, children, parents",
  "Post-visa rental management & yield optimisation",
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Your Golden Visa Journey — Step-by-Step Guide | mAI Investments</title>
        <meta name="description" content="The complete step-by-step Greek Golden Visa journey — from consultation and property selection to biometrics and permit issuance. Full support from mAI Investments." />
        <meta name="keywords" content="Greek Golden Visa process, Golden Visa application steps, how to get Greek Golden Visa, Golden Visa timeline Greece, Greece residency by investment process, Golden Visa guide" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="fr"        href={`${PAGE_URL}?lang=fr`} />
        <link rel="alternate" hrefLang="hi"        href={`${PAGE_URL}?lang=hi`} />
        <link rel="alternate" hrefLang="he"        href={`${PAGE_URL}?lang=he`} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Your Golden Visa Journey — Step-by-Step Guide" />
        <meta property="og:description" content="The complete step-by-step Greek Golden Visa journey — from consultation to permit issuance." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(howToLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Your Golden Visa Journey — Step-by-Step Guide",
          "description": "The complete step-by-step Greek Golden Visa journey — from consultation and property selection to biometrics and permit issuance.",
          "url": PAGE_URL,
          "datePublished": "2024-06-01",
          "dateModified": "2026-03-06",
          "author": { "@id": `${BASE_URL}/#organization` },
          "publisher": { "@id": `${BASE_URL}/#organization` },
          "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
          "about": { "@type": "Thing", "name": "Greek Golden Visa Application Process" },
          "inLanguage": "en",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${PAGE_URL}#webpage`,
          "name": "Your Golden Visa Journey — Step-by-Step Guide",
          "description": "The complete step-by-step Greek Golden Visa journey — from consultation and property selection to biometrics and permit issuance.",
          "url": PAGE_URL,
          "datePublished": "2024-06-01",
          "dateModified": "2026-03-06",
          "isPartOf": { "@id": `${BASE_URL}/#website` },
          "author": { "@id": `${BASE_URL}/#organization` },
          "publisher": { "@id": `${BASE_URL}/#organization` },
          "inLanguage": "en",
        })}</script>
      </Helmet>

      <Navbar forceScrolled />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/5" />
        <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-secondary/8 blur-[100px]" />

        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">{t("Home")}</Link></li>
              <span>/</span>
              <li><Link to="/greek-golden-visa/" className="hover:text-primary transition-colors">{t("Greek Golden Visa")}</Link></li>
              <span>/</span>
              <li className="text-foreground">{t("Your Journey")}</li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full border border-secondary/40 bg-secondary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
            {t("Your Golden Visa Journey")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Simple Path to")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("EU Residency")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("From first consultation to 5-year residency permit — we guide you through every step of the Greek Golden Visa process. Typically completed in 6–9 months.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("journey")}>
              {t("Start My Journey")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements/">{t("View Requirements")}</Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
            {[
              { value: "6–9", label: t("months end-to-end") },
              { value: "1", label: t("trip to Greece required") },
              { value: "5yr", label: t("renewable permit") },
              { value: "€250K", label: t("entry investment") },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background/40 p-4 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step journey */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("The Journey, Step by Step")}</h2>
            <p className="mt-3 text-muted-foreground">{t("Full support at every stage — no surprises, no hidden steps.")}</p>
          </div>

          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="relative flex gap-6 sm:gap-8">
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/40 bg-background shadow-[0_0_20px_hsl(179_90%_63%/0.15)]">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="rounded-xl border border-border bg-background/40 p-5 hover:border-primary/30 transition-colors">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <span className="text-xs font-bold text-primary/50 tracking-widest">{t("STEP")} {s.n}</span>
                            <h3 className="mt-0.5 font-semibold text-base">{t(s.title)}</h3>
                          </div>
                          <span className="shrink-0 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary font-medium">
                            {s.detail}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.desc)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline summary */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold mb-8">{t("Expected Timeline")}</h2>
          <div className="space-y-3">
            {timeline.map((item) => (
              <div
                key={item.phase}
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  item.highlight
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-background/40"
                }`}
              >
                <span className={`text-sm ${item.highlight ? "font-semibold" : "text-muted-foreground"}`}>
                  {t(item.phase)}
                </span>
                <span className={`text-sm font-semibold ${item.highlight ? "text-primary" : ""}`}>
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-sm text-muted-foreground">
              {t("Timelines vary depending on document readiness and government processing queues. Starting early and having all apostilled documents prepared in advance significantly reduces the overall duration.")}
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {t("Full-Service Support")}
              </span>
              <h2 className="text-3xl font-bold mb-4">{t("What's Included with mAI")}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("We don't just list properties — we manage the entire journey from first enquiry to permit in hand. Our team coordinates every professional involved.")}
              </p>
              <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("journey-included")}>
                {t("Book a Free Consultation")} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-xl font-bold mb-6">{t("Continue Your Research")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/greek-golden-visa-requirements/", label: t("Requirements & Documents"), desc: t("Full checklist of documents & investment thresholds") },
              { to: "/250k-golden-visa-properties/", label: t("€250K Properties"), desc: t("Browse pre-verified Golden Visa eligible properties") },
              { to: "/guides/", label: t("Investor Guides"), desc: t("In-depth articles on yields, tax, and strategy") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group rounded-xl border border-border bg-background/40 p-5 hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(179_90%_63%/0.08)]"
              >
                <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">{link.label}</p>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{link.desc}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Frequently Asked Questions")}</h2>
          <div className="space-y-6">
            {faqLd.mainEntity.map((q) => (
              <div key={q.name} className="rounded-xl border border-border bg-background/40 p-6">
                <h3 className="mb-2 font-semibold">{t(q.name)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(q.acceptedAnswer.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Ready to Begin Your Journey?")}</h2>
          <p className="text-muted-foreground mb-8">{t("Our advisors handle the entire process — from property selection to permit issuance. Start with a free 20-minute call.")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("journey-cta")}>
              {t("Book Free Consultation")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10">
              <Link to="/250k-golden-visa-properties/">{t("Browse Properties")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <LeadCaptureBot />
      </Suspense>
    </main>
  );
};

const GoldenVisaJourney = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GoldenVisaJourney;
