import { Search, BarChart3, ShieldCheck, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandOs from "@/assets/brand-os.png";
import { ScrollReveal } from "./ScrollReveal";

const tools = [
  { icon: Search, title: "Self-Service Property Search", desc: "AI-powered platform to browse and filter Golden Visa properties" },
  { icon: BarChart3, title: "Complete Data Transparency", desc: "Access market data, valuations, and historical trends" },
  { icon: LineChart, title: "Instant ROI Calculators", desc: "Model rental income, appreciation, and total returns" },
  { icon: ShieldCheck, title: "Visa Eligibility Checker", desc: "Instantly verify property Golden Visa qualification" },
];

const PLATFORM_URL = "https://wa.me/306971853470?text=Hi%2C%20I'm%20interested%20in%20accessing%20mAI%20Prop%20OS";

const PlatformReference = () => {
  return (
    <section id="platform" className="relative bg-section-mid py-24 bg-primary-foreground">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[150px]" />
      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Data-Driven Investment Partner
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              mAI Prop <span className="text-primary">OS</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Your intelligent companion for confident real estate investment decisions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.title}>
              <div className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer">
                Access mAI Prop OS
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PlatformReference;
