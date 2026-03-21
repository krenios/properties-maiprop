import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Globe, Shield, TrendingUp,
  Home, Users, Plane, DollarSign, AlertCircle, ChevronRight, Building,
} from "lucide-react";
import { useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-uae-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can UAE residents and nationals apply for the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Both UAE nationals and expat residents based in the UAE are fully eligible for the Greek Golden Visa program. Any non-EU national can apply regardless of their country of residence. The minimum real estate investment is €250,000 in qualifying zones, with no requirement to relocate from the UAE.",
      },
    },
    {
      "@type": "Question",
      "name": "How does the Greek Golden Visa compare to the UAE Golden Visa for property investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Greek Golden Visa provides full EU Schengen residency from €250,000 — granting visa-free access to 27 European countries and the right to live anywhere in Greece. The UAE Golden Visa requires a minimum AED 2 million (~$545,000) property investment and provides UAE residency only. For investors who travel to Europe frequently or want EU residency for family members, the Greek program offers significantly broader benefits at a lower entry cost.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the minimum investment for UAE investors in the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum investment starts at €250,000 for real estate outside high-demand zones such as central Athens, Thessaloniki, Mykonos, and Santorini. For properties in Greater Athens and premium tourist areas, the threshold is €800,000. Piraeus and the Athenian Riviera offer pre-verified compliant properties at the €250,000 threshold.",
      },
    },
    {
      "@type": "Question",
      "name": "Can UAE-based investors include their family in the Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The spouse or registered partner, children under 21, and parents of both the main applicant and spouse are all eligible for inclusion in a single application at no additional investment cost. All family members receive the same 5-year renewable EU residency permit.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need to leave the UAE to apply for a Greek Golden Visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The entire process — property selection, legal due diligence, purchase, and application submission — can be managed remotely from the UAE through a power of attorney. Only one trip to Greece is required for the biometrics appointment, which takes a single day and can be scheduled at your convenience.",
      },
    },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for UAE Investors — EU Residency from €250K",
  "description": "How UAE-based investors and nationals can obtain EU residency through Greek real estate investment. Complete guide covering eligibility, investment thresholds, process timeline, and a comparison with the UAE Golden Visa.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
  "about": { "@type": "Thing", "name": "Greek Golden Visa for UAE Investors" },
  "inLanguage": ["en", "ar"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Bahrain" },
    ],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa for UAE Investors — EU Residency from €250K",
  "description": "How UAE-based investors can obtain EU residency through Greek real estate investment starting at €250,000.",
  "url": PAGE_URL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-06",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "ar"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "UAE Investors", "item": PAGE_URL },
  ],
};

const benefits = [
  { icon: Globe, title: "EU Schengen Access", desc: "Visa-free travel across all 27 Schengen countries. No more visa queues for business or leisure in Europe." },
  { icon: Home, title: "No Minimum Stay", desc: "Keep your life in the UAE. Your Greek residency stays valid with no physical presence requirement." },
  { icon: Users, title: "Full Family Coverage", desc: "Spouse, children under 21, and parents of both spouses included — all at no additional investment." },
  { icon: TrendingUp, title: "5–7% Net Rental Yield", desc: "Athens investment properties generate strong rental income, with capital appreciation averaging 8–12%/year since 2019." },
  { icon: Shield, title: "5-Year Renewable Permit", desc: "Renewable indefinitely. Leads to permanent residency and Greek citizenship pathway after 7 years." },
  { icon: Building, title: "Transparent Legal System", desc: "Greek property law is EU-regulated — strong title protection, notarial deeds, and Land Registry transparency." },
];

const comparisonData = [
  { label: "Min. Investment", greece: "€250,000", uae: "AED 2,000,000 (~€500K)" },
  { label: "Residency Type", greece: "EU Schengen (27 countries)", uae: "UAE only" },
  { label: "Stay Requirement", greece: "None", uae: "None (180 days/2yr)" },
  { label: "Family Included", greece: "Yes — spouse, children, parents", uae: "Yes — spouse & children" },
  { label: "Permit Duration", greece: "5 years (renewable)", uae: "10 years (renewable)" },
  { label: "Path to Citizenship", greece: "Yes — after 7 years residence", uae: "No" },
  { label: "Rental Income", greece: "Allowed — 5–7% net yield", uae: "Allowed — varies" },
];

const processSteps = [
  { n: "01", title: "Initial Consultation", desc: "Align on budget, timeline, and property preferences. Confirm eligibility and receive a personalised pre-verified property shortlist." },
  { n: "02", title: "Property Selection & Due Diligence", desc: "Select from Golden Visa-compliant properties in Athens, Piraeus, or the Athenian Riviera. Legal and title checks handled by our team." },
  { n: "03", title: "Remote Legal Setup", desc: "Open a Greek tax number (AFM) and bank account remotely via power of attorney from Dubai or Abu Dhabi — no initial trip required." },
  { n: "04", title: "Purchase & Registration", desc: "Sign the notarial deed and register with the Land Registry. Transfer taxes ~3.09%. Full completion within 4–6 weeks of due diligence." },
  { n: "05", title: "Visa Application Submission", desc: "Submit the residency application. A temporary 180-day permit is issued immediately. Application processing begins." },
  { n: "06", title: "One Trip to Greece", desc: "A single biometrics appointment — the whole family attends together. Typically completed in one day. Residency cards issued within 2–4 months." },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for UAE Investors — EU Residency from €250K | mAI Investments</title>
        <meta name="description" content="Complete guide for UAE-based investors on the Greek Golden Visa. EU Schengen residency from €250,000, no minimum stay, full family inclusion. Manage from Dubai — one trip to Greece." />
        <meta name="keywords" content="Greek Golden Visa UAE investors, Dubai Greece property investment, EU residency from UAE, Golden Visa UAE residents, تأشيرة ذهبية يونانية الإمارات, Greece property investment Arabs, Schengen visa UAE investors" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"     href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="zh"        href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"     href={`${PAGE_URL}?lang=zh`} />
        <link rel="alternate" hrefLang="ru"        href={`${PAGE_URL}?lang=ru`} />
        <link rel="alternate" hrefLang="tr"        href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="tr-TR"     href={`${PAGE_URL}?lang=tr`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa for UAE Investors — EU Residency from €250K" />
        <meta property="og:description" content="EU Schengen residency from €250,000 for UAE-based investors. No minimum stay, full family inclusion, 5–7% rental yields." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa for UAE investors — mAI Investments" />
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
              <span className="text-foreground font-medium" itemProp="name">UAE Investors</span>
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
            Greek Golden Visa · UAE Investors · مستثمرو الإمارات
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              UAE Investors
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU Schengen residency from <strong className="text-foreground">€250,000</strong> — manage the entire process from Dubai or Abu Dhabi. No minimum stay, full family coverage, and rental yields of 5–7%. One trip to Greece required.
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground/80" dir="rtl">
            إقامة أوروبية شنغن من €250,000 — إدارة كاملة من دبي أو أبوظبي. لا يشترط الإقامة، تغطية كاملة للعائلة.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("uae-investors")}>
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
          <h2 className="mb-3 text-3xl font-bold text-center">Why UAE Investors Choose Greece</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Greece provides the lowest cost of entry to EU Schengen residency globally — combined with a transparent legal framework, strong yields, and a lifestyle most investors actively value.
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

      {/* Greece vs UAE Comparison */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">Greek Golden Visa vs. UAE Golden Visa</h2>
          <p className="mb-8 text-muted-foreground">
            Many UAE-based investors hold or are considering the UAE Golden Visa. Here is how the Greek program compares — and why they are increasingly chosen together.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-5 py-4 text-left font-semibold">Feature</th>
                  <th className="px-5 py-4 text-left font-semibold text-primary">🇬🇷 Greece</th>
                  <th className="px-5 py-4 text-left font-semibold">🇦🇪 UAE</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border/40 ${i % 2 === 0 ? "bg-background/20" : ""}`}>
                    <td className="px-5 py-4 font-medium text-muted-foreground">{row.label}</td>
                    <td className="px-5 py-4 text-primary font-medium">{row.greece}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.uae}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Best of both worlds:</strong> Many UAE residents hold both programs simultaneously — UAE Golden Visa for regional residency and Greek Golden Visa for EU Schengen access.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-3xl font-bold">Step-by-Step Process from the UAE</h2>
          <p className="mb-10 text-muted-foreground">
            Manage the entire process remotely from the UAE. Our team coordinates all legal, banking, and documentation steps on your behalf.
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

      {/* Investor nationality cluster */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-xl font-bold">Greek Golden Visa by Nationality</h2>
          <p className="mb-6 text-sm text-muted-foreground">Dedicated guides for investors from each key source market.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { to: "/greek-golden-visa-chinese-investors/", label: "🇨🇳 Chinese Investors", desc: "Schengen access for Chinese nationals" },
              { to: "/greek-golden-visa-russian-investors/", label: "🇷🇺 Russian Investors", desc: "EU residency & legal protection" },
              { to: "/greek-golden-visa-turkish-investors/", label: "🇹🇷 Turkish Investors", desc: "EU vs. Turkish CBI compared" },
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
      <section className="py-16 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-xl font-bold">Further Reading</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/greek-golden-visa/", label: "Greek Golden Visa — Full Overview" },
              { to: "/greek-golden-visa-requirements/", label: "Requirements & Document Checklist" },
              { to: "/250k-golden-visa-properties/", label: "€250K Pre-Verified Properties" },
              { to: "/golden-visa-journey/", label: "Step-by-Step Application Journey" },
              { to: "/greece-vs-dubai-golden-visa/", label: "Greece vs. Dubai Golden Visa Comparison" },
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Ready to Add EU Residency to Your Portfolio?</h2>
            <p className="text-muted-foreground mb-2">Speak with our investment advisors — serving UAE-based investors since 2021.</p>
            <p className="text-sm text-muted-foreground mb-8" dir="rtl">تواصل مع مستشارينا الاستثماريين — نخدم المستثمرين في الإمارات منذ عام 2021.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("uae-investors")}>
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
    </main>
  );
};

const GoldenVisaForUAEInvestors = () => <Inner />;

export default GoldenVisaForUAEInvestors;
