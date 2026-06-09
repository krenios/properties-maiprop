import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyModal from "@/components/PropertyModal";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Globe, Shield, TrendingUp,
  Home, Users, DollarSign, AlertCircle, ChevronRight, MapPin,
} from "lucide-react";
import { useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import { useProperties } from "@/contexts/PropertyContext";
import { Property } from "@/data/properties";
import { getEffectiveProjectType, getEffectiveStatus } from "@/lib/propertyMeta";
import { optimizeImage } from "@/lib/optimizeImage";
import Footer from "@/components/Footer";

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/greek-golden-visa-indian-investors/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can Indian nationals apply for the Greek Golden Visa?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Indian citizens are fully eligible. The program requires a minimum real estate investment of €250,000 in qualifying areas, with no residency obligation in Greece." },
    },
    {
      "@type": "Question",
      "name": "How much can an Indian investor remit under the LRS for a Greek property?",
      "acceptedAnswer": { "@type": "Answer", "text": "Under RBI's Liberalised Remittance Scheme (LRS), each Indian resident may remit up to USD 250,000 per financial year. A family of four can pool LRS allowances to fund a €250,000 Golden Visa purchase in a single year." },
    },
    {
      "@type": "Question",
      "name": "Does the Greek Golden Visa allow visa-free travel across Europe?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Holders receive a 5-year renewable EU residency permit with visa-free access to all 27 Schengen countries — eliminating repeated Schengen visa applications for Indian passport holders." },
    },
    {
      "@type": "Question",
      "name": "Can Indian investors include parents and children in one application?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Spouse, children under 21, and parents of both spouses are included in a single application at no additional investment — covering up to three generations." },
    },
    {
      "@type": "Question",
      "name": "How long does the Greek Golden Visa process take for Indian investors?",
      "acceptedAnswer": { "@type": "Answer", "text": "Typically 6–9 months end to end. Only one trip to Greece is required for biometrics. Property selection and most paperwork can be handled remotely via power of attorney." },
    },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa for Indian Investors — 2026 Guide",
  "description": "How Indian nationals can secure EU residency through Greek real estate from €250,000. LRS guidance, family coverage, Schengen travel and pre-verified properties.",
  "url": PAGE_URL,
  "datePublished": "2025-09-01",
  "dateModified": "2026-06-09",
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
  "about": { "@type": "Thing", "name": "Greek Golden Visa for Indian Investors" },
  "inLanguage": ["en", "hi"],
  "audience": {
    "@type": "Audience",
    "geographicArea": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Singapore" },
      { "@type": "Country", "name": "United Kingdom" },
    ],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  "name": "Greek Golden Visa for Indian Investors — 2026 Guide",
  "description": "EU residency for Indian nationals from €250,000. Real opportunities curated for LRS-friendly budgets.",
  "url": PAGE_URL,
  "datePublished": "2025-09-01",
  "dateModified": "2026-06-09",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": ["en", "hi"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Greek Golden Visa", "item": `${BASE_URL}/greek-golden-visa/` },
    { "@type": "ListItem", "position": 3, "name": "Indian Investors", "item": PAGE_URL },
  ],
};

const benefits = [
  { icon: Globe, title: "Schengen Travel", desc: "Visa-free access to 27 EU countries — no more Schengen visa queues for business or family travel." },
  { icon: Home, title: "No Stay Requirement", desc: "Keep your life and business in India. Zero minimum residency days to renew the permit." },
  { icon: Users, title: "3 Generations Covered", desc: "Spouse, children under 21, and parents of both spouses — one application, one investment." },
  { icon: TrendingUp, title: "Hard-Currency Yields", desc: "Athens assets typically deliver 5–7% net rental yields in Euro, plus capital appreciation." },
  { icon: Shield, title: "EU Legal Framework", desc: "Freehold ownership, strong title registry and EU consumer-protection standards." },
  { icon: DollarSign, title: "LRS-Friendly Entry", desc: "Family LRS pooling can fund the €250K threshold within one financial year." },
];

const lrsTiers = [
  { tier: "€250,000", areas: "Piraeus, Athenian Riviera and Greek mainland towns — the most accessible Golden Visa zone." },
  { tier: "€800,000", areas: "Central Athens, Thessaloniki, Mykonos, Santorini and premium tourist coastlines." },
];

const processSteps = [
  { n: "01", title: "Discovery Call (IST friendly)", desc: "We align on budget, LRS planning, family structure and target yield. You receive a curated shortlist within 48 hours." },
  { n: "02", title: "Shortlist & Virtual Tours", desc: "Live video tours of pre-verified Golden Visa properties. Title search and zoning compliance pre-checked by our legal team." },
  { n: "03", title: "AFM & Greek Bank Account", desc: "Handled remotely via power of attorney — no trip to Greece required at this stage." },
  { n: "04", title: "LRS Remittance & Purchase", desc: "Coordinate LRS transfers from family members, sign the notarial deed and complete land-registry transfer." },
  { n: "05", title: "Golden Visa Application", desc: "Full residency package filed. A temporary 180-day permit is issued immediately on submission." },
  { n: "06", title: "Biometrics in Athens", desc: "One family trip to Greece for biometrics — residency cards issued shortly after." },
];

function formatPrice(p: number | null): string {
  if (!p) return "Price on request";
  return `€${p.toLocaleString("en-US")}`;
}

function oneLiner(p: Property): string {
  const parts: string[] = [];
  if (p.bedrooms) parts.push(`${p.bedrooms}-bed`);
  if (p.size) parts.push(`${p.size} m²`);
  if (p.location) parts.push(p.location);
  const yieldStr = p.net_yield || p.gross_yield || p.yield;
  if (yieldStr) parts.push(`${yieldStr} yield`);
  if (p.delivery_eta) parts.push(`ready ${p.delivery_eta}`);
  return parts.join(" · ");
}

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);

  // Shortlist: active, India-friendly LRS-pool budgets (€220K–€450K), sorted by price asc.
  const shortlist = useMemo(() => {
    return properties
      .filter((p) => {
        const type = getEffectiveProjectType(p.project_type, p.status);
        const status = getEffectiveStatus(p.status);
        if (status === "sold") return false;
        if (!type) return false;
        const price = p.price ?? 0;
        return price >= 220_000 && price <= 600_000;
      })
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      .slice(0, 6);
  }, [properties]);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa for Indian Investors — EU Residency from €250K</title>
        <meta name="description" content="Complete 2026 guide for Indian nationals. EU residency from €250,000 via Greek real estate, LRS pooling, family coverage and curated property shortlist." />
        <meta name="keywords" content="Greek Golden Visa Indian investors, India Golden Visa Greece, EU residency Indian nationals, LRS Greece property, Schengen visa India, ग्रीस गोल्डन वीज़ा भारत" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en"        href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-IN"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-US"     href={PAGE_URL} />
        <link rel="alternate" hrefLang="hi"        href={`${PAGE_URL}?lang=hi`} />
        <link rel="alternate" hrefLang="hi-IN"     href={`${PAGE_URL}?lang=hi`} />
        <link rel="alternate" hrefLang="el"        href={`${PAGE_URL}?lang=el`} />
        <link rel="alternate" hrefLang="ar"        href={`${PAGE_URL}?lang=ar`} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="hi_IN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Golden Visa for Indian Investors — EU Residency from €250K" />
        <meta property="og:description" content="Curated Greek property opportunities for Indian investors. LRS-friendly budgets, Schengen access and full family coverage." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Greek Golden Visa for Indian investors — mAI Investments" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Navbar forceScrolled />

      {/* Breadcrumb */}
      <nav className="mt-[64px] border-b border-border/40 bg-background/80 backdrop-blur-sm" aria-label="Breadcrumb">
        <div className="container mx-auto px-6 py-4">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">{t("Home")}</Link></li>
            <li className="text-muted-foreground/50 select-none">›</li>
            <li><Link to="/greek-golden-visa/" className="hover:text-primary transition-colors">{t("Greek Golden Visa")}</Link></li>
            <li className="text-muted-foreground/50 select-none">›</li>
            <li><span className="text-foreground font-medium">Indian Investors</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative">
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Greek Golden Visa · Indian Investors · भारतीय निवेशक
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Golden Visa for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Indian Investors
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            EU residency from <strong className="text-foreground">€250,000</strong> — Schengen-free travel, full family coverage, and zero minimum stay. Designed around RBI's LRS framework so a single Indian family can fund the threshold in one financial year.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("indian-investors")}>
              Get My Property Shortlist <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/250k-golden-visa-properties/">View €250K Properties</Link>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
            {[
              { value: "€250K", label: "Minimum investment" },
              { value: "$250K", label: "LRS per person / yr" },
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

      {/* Curated opportunities */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Curated Opportunities for Indian Investors</h2>
              <p className="text-muted-foreground max-w-2xl text-sm">
                Live deals from our portfolio — sized for LRS-pooled budgets. Tap any card for the full investment dossier.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link to="/properties/">See full portfolio <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>

          {shortlist.length === 0 ? (
            <div className="rounded-xl border border-border bg-background/40 p-10 text-center text-muted-foreground text-sm">
              No LRS-sized opportunities are live right now — <Link to="/properties/" className="text-primary underline">browse the full portfolio</Link> or contact us for off-market options.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shortlist.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="group text-left rounded-xl border border-border bg-background/40 overflow-hidden hover:border-primary/40 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.35)] transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                    {p.images?.[0] && (
                      <img
                        src={optimizeImage(p.images[0], { width: 600 })}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-3 left-3 rounded-full bg-background/85 backdrop-blur px-3 py-1 text-xs font-semibold text-primary">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold leading-tight mb-1.5 line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{oneLiner(p)}</p>
                    {p.location && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                        <MapPin className="h-3.5 w-3.5 text-primary/70" />
                        <span className="line-clamp-1">{p.location}</span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View dossier <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why India investors choose Greece */}
      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">Why Indian Investors Choose Greece</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Greece offers the lowest entry threshold for EU residency in Europe — paired with euro-denominated yields and a transparent legal framework familiar to Indian high-net-worth families.
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

      {/* LRS & Investment Thresholds */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold">LRS Planning & Investment Thresholds</h2>
          <p className="mb-8 text-muted-foreground">
            India's Liberalised Remittance Scheme allows each resident to remit up to USD 250,000 per financial year. By pooling LRS quotas across family members, the €250K Golden Visa threshold can be fully funded in one cycle.
          </p>
          <div className="space-y-4">
            {lrsTiers.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-border bg-background/40 p-6 flex items-start gap-5">
                <span className="shrink-0 text-2xl font-bold text-primary">{tier.tier}</span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{tier.areas}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> We coordinate with your CA / AD bank to time LRS remittances around the notary closing — no idle euro balances in escrow.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-3xl font-bold">Process Designed for Indian Families</h2>
          <p className="mb-10 text-muted-foreground">
            Everything except biometrics can be handled remotely from India — including notary execution via power of attorney.
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

      {/* Nationality cluster */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-xl font-bold">Greek Golden Visa by Nationality</h2>
          <p className="mb-6 text-sm text-muted-foreground">Dedicated guides for investors from each key source market.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { to: "/greek-golden-visa-chinese-investors/", label: "🇨🇳 Chinese Investors", desc: "Lowest entry point to EU residency" },
              { to: "/greek-golden-visa-uae-investors/", label: "🇦🇪 UAE Investors", desc: "Manage from Dubai — one trip only" },
              { to: "/greek-golden-visa-turkish-investors/", label: "🇹🇷 Turkish Investors", desc: "EU residency vs. Turkish CBI" },
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Ready to Anchor Your Family in the EU?</h2>
            <p className="text-muted-foreground mb-8">Book a 30-minute consultation with our advisors — IST-friendly slots available.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("indian-investors")}>
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/golden-visa-journey/">View Full Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </main>
    <Footer />
    </>
  );
};

const GoldenVisaForIndianInvestors = () => <Inner />;

export default GoldenVisaForIndianInvestors;