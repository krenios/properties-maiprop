import { Monitor, ArrowUpRight, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";
import platformListing from "@/assets/platform-listing.png";
import platformOs from "@/assets/platform-os.png";

const platforms = [
  {
    badge: "POWERED BY MAI PROP · GREECE'S #1 AI-POWERED PROPERTY PLATFORM",
    badgeIcon: Sparkles,
    titleLine1: "Secure Your European",
    titleLine2: "Golden Visa in Greece",
    titleColor: "text-primary",
    desc: "EU residency through €250K+ Greek real estate investments. Live freely, invest wisely, and protect your global future — with AI-matched properties across Athens, Glyfada and the Athenian Riviera.",
    bullets: [
      "Golden Visa-eligible listings from €250K",
      "6–9 months to visa approval",
      "Schengen access across 27 countries",
      "AI property search & side-by-side investment analytics",
    ],
    bulletColor: "text-primary",
    cta: "Start Your Golden Visa",
    ctaStyle: "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(179_90%_63%/0.4)] hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(179_90%_63%/0.6)]",
    href: "https://maiprop.co",
    image: platformListing,
    imageAlt: "mAI Prop listing platform",
    url: "maiprop.co",
    reverse: false,
  },
  {
    badge: "POWERED BY MAI PROP OS",
    badgeIcon: Monitor,
    titleLine1: "Gain The Edge In",
    titleLine2: "Greek Real Estate",
    titleColor: "text-secondary",
    desc: "mAI Prop OS is the professional data platform powering every insight on this site — aggregating cadastre records, judicial auctions, price indices, and predictive analytics into one live dashboard.",
    bullets: [
      "Real-time €/m² indices for every Greek region",
      "3,200+ monthly judicial & bank auctions tracked",
      "AI-powered investment scoring & portfolio tools",
      "Mapped data & automated property reports",
    ],
    bulletColor: "text-secondary",
    cta: "Open mAI Prop OS",
    ctaStyle: "bg-secondary text-secondary-foreground shadow-[0_0_30px_hsl(263_86%_64%/0.4)] hover:bg-secondary/90 hover:shadow-[0_0_50px_hsl(263_86%_64%/0.6)]",
    href: "https://app.maiprop.co",
    image: platformOs,
    imageAlt: "mAI Prop OS operator dashboard",
    url: "os.maiprop.co",
    reverse: true,
  },
];

const PlatformReference = () => {
  const { t } = useTranslation();

  return (
    <section id="platform" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[180px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-secondary/6 blur-[160px]" />

      <div className="relative container mx-auto px-6">
        <div className="flex flex-col">
          {platforms.map((p, i) => (
            <div key={p.url}>
              <ScrollReveal>
                <div className={`grid items-center gap-12 lg:gap-20 lg:grid-cols-2 py-16 sm:py-24 ${p.reverse ? "lg:[direction:rtl]" : ""}`}>

                  {/* Text */}
                  <div className={p.reverse ? "[direction:ltr]" : ""}>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      <p.badgeIcon className="h-3.5 w-3.5" />
                      {p.badge}
                    </div>

                    <h3 className="text-4xl font-bold leading-tight sm:text-5xl">
                      {p.titleLine1}
                      <br />
                      <span className={p.titleColor}>{p.titleLine2}</span>
                    </h3>

                    <p className="mt-4 mb-7 text-muted-foreground leading-relaxed max-w-lg">
                      {t(p.desc)}
                    </p>

                    <ul className="space-y-2.5 mb-10">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.bulletColor} opacity-80`} style={{ background: "currentColor" }} />
                          {t(b)}
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      size="lg"
                      className={`gap-2 rounded-full px-8 font-semibold transition-all ${p.ctaStyle}`}
                    >
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {t(p.cta)} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Browser mockup */}
                  <div className={`relative ${p.reverse ? "[direction:ltr]" : ""}`}>
                    {/* Glow behind browser */}
                    <div className={`pointer-events-none absolute -inset-6 rounded-3xl blur-[60px] opacity-20 ${p.reverse ? "bg-secondary" : "bg-primary"}`} />

                    {/* Browser chrome */}
                    <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-[hsl(var(--card))]">
                      {/* Title bar */}
                      <div className="flex items-center gap-3 border-b border-border/40 bg-muted/60 px-4 py-3">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                        </div>
                        {/* URL bar */}
                        <div className="flex flex-1 items-center justify-center">
                          <div className="flex items-center gap-2 rounded-md bg-background/60 border border-border/40 px-3 py-1 text-xs text-muted-foreground max-w-[220px] w-full">
                            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                            </svg>
                            {p.url}
                          </div>
                        </div>
                        {/* External link icon */}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>

                      {/* Screenshot */}
                      <div className="overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* Divider between platforms */}
              {i < platforms.length - 1 && (
                <div className="relative flex flex-col items-center justify-center py-6 sm:py-8">
                  <div className="relative flex items-center gap-4 w-full max-w-sm">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
                    <span className="shrink-0 rounded-full border border-border/50 bg-muted/40 px-4 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      Also in the ecosystem
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformReference;
