import { Globe, Users, Zap, Home, TrendingUp, Sun } from "lucide-react";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const benefits = [
  { icon: Globe, title: "EU Residency & Schengen Access", desc: "Live, work, and travel freely across 27 Schengen countries with your Greek Golden Visa — Access to mAI Prop OS" },
  { icon: Users, title: "Golden Visa Family Inclusion", desc: "Spouse, children under 21, and parents included in one single Golden Visa application" },
  { icon: Zap, title: "Fast Golden Visa Processing", desc: "Greek permanent residency permit in 6-9 months with streamlined Golden Visa application" },
  { icon: Home, title: "No Stay Required in Greece", desc: "Maintain EU residency without minimum stay obligations in Greece" },
  { icon: TrendingUp, title: "Greek Real Estate Market Growth", desc: "8%+ annual property appreciation with strong rental income potential in Athens & Greek islands" },
  { icon: Sun, title: "Mediterranean Lifestyle in Greece", desc: "300+ days of sunshine, world-class cuisine, rich history and culture in Greece" },
];

const GoldenVisaStats = () => (
  <section id="overview" className="relative bg-background py-24" aria-label="Greek Golden Visa Benefits">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    <div className="relative container mx-auto px-6">
      <ScrollReveal>
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Greece Golden Visa Program — €250,000 Minimum Investment
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">Why Choose the Greek Golden Visa?</h2>
          <p className="mt-2 text-muted-foreground">
            European residency through Greek real estate investment — the most affordable Golden Visa in the EU starting at €250K.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="stagger">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <RevealItem key={b.title}>
              <article className="h-full rounded-xl border border-border bg-background/40 p-6 backdrop-blur transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(179_90%_63%/0.06)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </article>
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GoldenVisaStats;
