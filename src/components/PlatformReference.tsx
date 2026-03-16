import { Monitor, Building2, ArrowUpRight, Search, BarChart3, ShieldCheck, LineChart, Database, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";
import platformListing from "@/assets/platform-listing.png";
import platformOs from "@/assets/platform-os.png";

const platforms = [
  {
    tag: "Investment & Golden Visa",
    tagIcon: Building2,
    tagColor: "text-primary border-primary/20 bg-primary/10",
    name: "mAI Properties",
    desc: "Browse and compare verified Golden Visa-compliant properties in Athens & the Riviera — with yield data, compliance checks, and instant enquiry.",
    features: ["Curated Golden Visa listings", "Smart filters by yield, location & price", "Compliance pre-verification", "Investment analytics & comparisons"],
    featureColor: "bg-primary/10 text-primary",
    cta: "Browse Properties",
    ctaClass: "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(179_90%_63%/0.35)] hover:shadow-[0_0_50px_hsl(179_90%_63%/0.5)] hover:bg-primary/90",
    href: "https://preview--maiprop-listing-site.lovable.app/",
    image: platformListing,
    imageAlt: "mAI Properties listing platform",
    glowColor: "bg-primary/10",
  },
  {
    tag: "Operator Platform",
    tagIcon: Monitor,
    tagColor: "text-secondary border-secondary/20 bg-secondary/10",
    name: "mAI Prop OS",
    desc: "The all-in-one operating system for real estate professionals — manage leads, listings, analytics and AI-powered due diligence in one place.",
    features: ["Lead & CRM pipeline", "Property management & analytics", "AI-powered due diligence", "ROI forecasting & IRR models"],
    featureColor: "bg-secondary/10 text-secondary",
    cta: "Open mAI Prop OS",
    ctaClass: "bg-secondary text-secondary-foreground shadow-[0_0_30px_hsl(263_86%_64%/0.35)] hover:shadow-[0_0_50px_hsl(263_86%_64%/0.5)] hover:bg-secondary/90",
    href: "https://app.maiprop.co",
    image: platformOs,
    imageAlt: "mAI Prop OS operator dashboard",
    glowColor: "bg-secondary/10",
  },
];

const PlatformReference = () => {
  const { t } = useTranslation();

  return (
    <section id="platform" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-[160px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-secondary/6 blur-[140px]" />

      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              <Monitor className="h-4 w-4" /> {t("Our Products")}
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t("Two platforms,")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("one ecosystem")}
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("Whether you're browsing as an investor or operating as a professional — our suite covers every step of the Greek Golden Visa journey.")}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-16">
          {platforms.map((p, i) => (
            <ScrollReveal key={p.name}>
              <div className={`grid gap-10 lg:gap-16 items-center lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Text side */}
                <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                  <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${p.tagColor}`}>
                    <p.tagIcon className="h-3.5 w-3.5" /> {p.tag}
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{p.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{t(p.desc)}</p>

                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.featureColor}`}>
                          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3"/></svg>
                        </span>
                        {t(f)}
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" className={`gap-2 rounded-full px-8 font-semibold transition-all ${p.ctaClass}`}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {t(p.cta)} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                {/* Image side */}
                <div className={`relative ${i % 2 === 1 ? "[direction:ltr]" : ""}`}>
                  <div className={`pointer-events-none absolute inset-0 rounded-2xl ${p.glowColor} blur-[60px] scale-95 opacity-60`} />
                  <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    {/* Subtle bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformReference;
