import { Search, BarChart3, ShieldCheck, LineChart, Monitor, Building2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";

const osFeatures = [
  { icon: Search, title: "Self-Service Property Search", desc: "AI-powered platform to browse and filter Golden Visa properties" },
  { icon: BarChart3, title: "Complete Data Transparency", desc: "Access market data, valuations, and historical trends" },
  { icon: LineChart, title: "Instant ROI Calculators", desc: "Model rental income, appreciation, and total returns" },
  { icon: ShieldCheck, title: "Visa Eligibility Checker", desc: "Instantly verify property Golden Visa qualification" },
];

const listingFeatures = [
  { icon: Building2, title: "Curated Property Listings", desc: "Browse verified Golden Visa-compliant properties in Athens & Riviera" },
  { icon: Search, title: "Smart Filters", desc: "Filter by price, location, yield and visa eligibility instantly" },
  { icon: BarChart3, title: "Investment Analytics", desc: "Compare properties side by side with yield and appreciation data" },
  { icon: ShieldCheck, title: "Verified Compliance", desc: "Every listing pre-checked for Golden Visa qualification" },
];

const PlatformReference = () => {
  const { t } = useTranslation();

  return (
    <section id="platform" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/8 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-secondary/8 blur-[120px]" />

      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              <Monitor className="h-4 w-4" /> {t("Our Products")}
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t("Two platforms,")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("one ecosystem")}
              </span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
              {t("Whether you're an operator or an investor, our suite of tools gives you the data and access to make the right move.")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* mAI Prop OS */}
          <ScrollReveal>
            <div className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(179_90%_63%/0.08)] h-full">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Monitor className="h-3 w-3" /> Operator Platform
                  </div>
                  <h3 className="text-2xl font-bold">mAI Prop OS</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("The all-in-one operator platform for Golden Visa property professionals")}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {osFeatures.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t(f.title)}</p>
                      <p className="text-xs text-muted-foreground">{t(f.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="w-full rounded-full border-primary/40 gap-2 group-hover:border-primary/70 group-hover:bg-primary/5 transition-all">
                <a href="https://app.maiprop.co" target="_blank" rel="noopener noreferrer">
                  {t("Open mAI Prop OS")} <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* mAI Properties Listing Site */}
          <ScrollReveal>
            <div className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 transition-all duration-300 hover:border-secondary/40 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.08)] h-full">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    <Building2 className="h-3 w-3" /> Investment & Golden Visa
                  </div>
                  <h3 className="text-2xl font-bold">mAI Properties</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("Browse and compare verified Golden Visa properties in Greece")}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {listingFeatures.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-0.5">
                      <f.icon className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t(f.title)}</p>
                      <p className="text-xs text-muted-foreground">{t(f.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="w-full rounded-full border-secondary/40 gap-2 group-hover:border-secondary/70 group-hover:bg-secondary/5 transition-all">
                <a href="https://preview--maiprop-listing-site.lovable.app/" target="_blank" rel="noopener noreferrer">
                  {t("Browse Properties")} <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PlatformReference;
