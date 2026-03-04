import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Wine, Utensils, Waves, Sun, Building,
  HeartHandshake, CheckCircle2, MapPin,
} from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/buy-the-lifestyle/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What lifestyle does a Greek Golden Visa actually give you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Greek Golden Visa grants EU residency with no minimum stay. You gain Schengen freedom across 27 countries plus access to Mediterranean living: world-class food, warm climate, 300+ sunny days, and a growing expat community in Athens. You can treat Greece as a second home while keeping your primary life wherever you choose.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my investment property as a holiday home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your Golden Visa property can be used as a personal holiday home, rented short-term via Airbnb, or leased long-term. Most investors use a hybrid model — personal use during peak season, rental income the rest of the year — achieving net yields of 4–7%.",
      },
    },
    {
      "@type": "Question",
      name: "Which Athens neighbourhoods offer the best lifestyle investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glyfada and the Athenian Riviera combine coastal lifestyle with strong capital appreciation. Kolonaki and Vouliagmeni offer upscale urban living. Piraeus is increasingly popular for its maritime culture and proximity to Athens Airport. Each area carries a different lifestyle profile — we match investors to the right location based on their priorities.",
      },
    },
    {
      "@type": "Question",
      name: "Is Greece safe for foreign property owners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece consistently ranks among the safest countries in Southern Europe. Crime rates in residential areas are low, the legal system protects foreign property ownership, and EU membership ensures robust property rights enforcement. Athens has undergone a significant quality-of-life renaissance since 2020.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Greek non-dom tax regime for new residents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greece offers a non-domiciled tax program allowing foreign investors who transfer their tax residency to Greece to pay a flat annual tax of €100,000 on global income for up to 15 years. This requires 183+ days/year in Greece and a €500,000 investment in Greece. It is one of Europe's most competitive expat tax regimes.",
      },
    },
  ],
};

const pillars = [
  { icon: Sun, title: "300+ Sunny Days", desc: "The Athenian Riviera averages 3,000 hours of sun per year — more than Miami, Dubai, or Los Angeles." },
  { icon: Utensils, title: "World-Class Cuisine", desc: "From Michelin-starred restaurants in Kolonaki to fresh tavernas on the coast, eating well is a way of life here." },
  { icon: Waves, title: "Private Coastal Access", desc: "Properties along Glyfada and Vouliagmeni put the Aegean Sea within walking distance of your front door." },
  { icon: Wine, title: "Culture & Nightlife", desc: "Athens is Europe's most underrated city — ancient ruins beside rooftop bars, jazz clubs, and a vibrant gallery scene." },
  { icon: Building, title: "European Infrastructure", desc: "EU-quality healthcare, airports, rail, and international schools — the full infrastructure of a modern European capital." },
  { icon: HeartHandshake, title: "Thriving Expat Community", desc: "A growing international community of entrepreneurs, remote workers, and investors has made Athens one of Europe's most welcoming expat hubs." },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Buy the Lifestyle, Not Just the Asset — Greek Golden Visa",
  "description": "Greece's Golden Visa isn't just an investment — it's a lifestyle upgrade. 300+ sunny days, coastal living, EU freedom, and 4–7% rental yields from €250,000.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2025-03-01",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greek Golden Visa Lifestyle" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Buy the Lifestyle, Not Just the Asset — Greek Golden Visa | mAI Investments</title>
        <meta name="description" content="Greece's Golden Visa isn't just an investment — it's a lifestyle upgrade. 300+ sunny days, coastal living, EU freedom, and 4–7% rental yields from €250,000." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Buy the Lifestyle, Not Just the Asset — Greek Golden Visa" />
        <meta property="og:description" content="Greece's Golden Visa isn't just an investment — it's a lifestyle upgrade. Discover Mediterranean living and why 12,000+ investors chose Greece." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Buy the Lifestyle, Not Just the Asset — Greek Golden Visa",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2025-03-01",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Buy the Lifestyle", item: PAGE },
          ]},
        })}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar forceScrolled />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <span>/</span><li className="text-foreground">Buy the Lifestyle</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("The Greek Golden Visa Lifestyle")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Buy the Lifestyle,")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Not Just the Asset")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("Most investors track yields. The smart ones track what €250,000 actually buys: EU residency, Schengen freedom, a coastal home on the Mediterranean, and an entirely different quality of life.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("buy-the-lifestyle")}>
              {t("Explore Properties")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa">{t("View the Program")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why lifestyle first */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Why the Smartest Investors Buy Lifestyle First")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("There's a pattern among the world's most sophisticated investors: they don't just buy assets — they buy access. Access to a better tax environment. Access to a simpler way of living. Access to a second passport corridor that keeps their options open regardless of what happens in their home country.")}</p>
            <p>{t("Greece's Golden Visa sits at the intersection of all three. For €250,000, you don't just acquire a real estate asset in an EU country with one of the fastest-growing property markets in Europe. You acquire a foothold in the Mediterranean — one of the most liveable regions on earth — and EU residency that travels with your family.")}</p>
            <p>{t("The Athenian Riviera — stretching from Glyfada to Vouliagmeni — is often compared to Malibu or the French Riviera, but at a fraction of the cost. Properties here command premium short-term rental rates in summer while delivering 4–7% net annual yields. The lifestyle infrastructure has caught up: fine dining, private beach clubs, international schools, and healthcare that compares favourably with Western Europe.")}</p>
            <p>{t("Athens itself has undergone a quiet renaissance. Neighbourhoods like Koukaki, Monastiraki, and Exarchia now host boutique hotels, startup offices, and a creative class that has made Greece's capital one of Europe's most exciting cities. The same cultural tailwind drives property values upward every year.")}</p>
          </div>
        </div>
      </section>

      {/* Lifestyle pillars */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("Six Dimensions of the Greek Lifestyle Investment")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("What €250,000 buys beyond the balance sheet.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-all">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(p.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("What €250,000 Looks Like on the Ground")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "A fully renovated apartment 300m from the sea in Glyfada",
              "4–7% net annual rental yield while you're not using it",
              "5-year renewable EU residency for your entire family",
              "No minimum stay — live there as little or as much as you want",
              "Visa-free Schengen travel across 27 European countries",
              "Access to Greece's €100K flat-tax regime for global income",
              "Path to Greek citizenship after 7 years",
              "A hedge against political instability in your home country",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(point)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Riviera deep dive */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold">{t("The Athenian Riviera: Europe's Most Undervalued Coastal Market")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("From Faliro to Vouliagmeni, the Athenian Riviera represents 30km of coastline with direct access to Athens city centre. Properties here command some of the highest short-term rental rates in Greece — €150–€350 per night in peak season — yet purchase prices remain 40–60% below comparable Mediterranean markets like Barcelona, Nice, or the Amalfi Coast.")}</p>
            <p>{t("The Ellinikon project — an €8 billion development on the former Athens Airport site — is transforming the area into a world-class mixed-use district with marinas, parks, retail, and luxury residences. Properties within 2km of Ellinikon have already seen 15–20% price appreciation since construction began in 2022.")}</p>
            <p>{t("For investors seeking lifestyle and yield, the Athenian Riviera is the sweet spot: close enough to Athens for city access, coastal enough for premium holiday rentals, and undervalued enough that capital appreciation remains a credible outcome over a 5–7 year hold.")}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8 gap-2">
              <Link to="/250k-golden-visa-properties">{t("View Riviera Properties")} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/properties">{t("All Properties")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Your Mediterranean Life Starts with One Conversation")}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{t("We match investors with properties that fit their lifestyle goals — not just their budget.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("buy-the-lifestyle")}>
            {t("Talk to an Advisor")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
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
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-2xl font-bold text-center">{t("Explore Further")}</h2>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { to: "/greek-golden-visa", icon: MapPin, title: "Greek Golden Visa Guide", desc: "Full program overview and eligibility." },
              { to: "/250k-golden-visa-properties", icon: Building, title: "€250K Properties", desc: "Pre-verified investment listings." },
              { to: "/properties", icon: Waves, title: "All Properties", desc: "Browse the full portfolio." },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
                <l.icon className="mb-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold group-hover:text-primary transition-colors">{t(l.title)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t(l.desc)}</p>
              </Link>
            ))}
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

const BuyTheLifestyle = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default BuyTheLifestyle;
