import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";
const PAGE_URL = `${BASE_URL}/guides/`;

const guides = [
  {
    slug: "benefits-greek-golden-visa-non-eu-citizens",
    title: "Benefits of Greek Golden Visa for Non-EU Citizens",
    description: "Discover why the Greek Golden Visa is one of Europe's most attractive residency-by-investment programs — Schengen access, no minimum stay, full family coverage, and strong rental yields.",
    category: "Golden Visa",
    readTime: "6 min read",
    icon: TrendingUp,
    tag: "Most Popular",
  },
  {
    slug: "athens-vs-thessaloniki-where-to-invest",
    title: "Athens vs. Thessaloniki: Where to Invest in Greek Real Estate",
    description: "A data-driven comparison of Greece's two largest cities for real estate investors — price per sqm, rental yields, Golden Visa eligibility, market liquidity, and growth trajectory.",
    category: "Market Analysis",
    readTime: "7 min read",
    icon: BookOpen,
    tag: "Market Insight",
  },
  {
    slug: "how-to-calculate-roi-greek-rental-properties",
    title: "How to Calculate ROI on Greek Rental Properties",
    description: "A practical step-by-step guide to calculating gross yield, net yield, and total return on Greek investment properties — with real Athens market examples and tax considerations.",
    category: "Investment Strategy",
    readTime: "8 min read",
    icon: TrendingUp,
    tag: "Investor Guide",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": PAGE_URL },
  ],
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Real Estate Investment Guides — mAI Investments</title>
        <meta name="description" content="Expert guides on Greek Golden Visa, Athens real estate ROI, and property investment strategy for non-EU investors. Research-stage resources for serious investors." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Greek Real Estate Investment Guides — mAI Investments" />
        <meta property="og:description" content="Expert guides on Greek Golden Visa and real estate investment strategy for non-EU investors." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <Navbar forceScrolled />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <span>/</span>
              <li className="text-foreground">Guides</li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Investor Resources
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Greek Investment{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Guides &amp; Research
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you need to make an informed decision — from Golden Visa program mechanics to city-by-city yield comparisons and ROI calculators.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-background/40 p-8 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(179_90%_63%/0.08)] transition-all duration-300"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {guide.category}
                  </span>
                  <span className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {guide.tag}
                  </span>
                </div>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <guide.icon className="h-6 w-6 text-primary" />
                </div>

                <h2 className="mb-3 text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-muted-foreground mb-8">
            Browse our pre-verified €250K+ properties or speak with an investment advisor to start your Golden Visa journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 gap-2" asChild>
              <Link to="/250k-golden-visa-properties/">
                Browse Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => openWithLocation("guides")}>
              Free Consultation
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

const Guides = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default Guides;
