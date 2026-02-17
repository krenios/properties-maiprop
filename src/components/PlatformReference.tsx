import { Search, BarChart3, ShieldCheck, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandOs from "@/assets/brand-os.png";
import { ScrollReveal } from "./ScrollReveal";

const tools = [
{ icon: Search, title: "Self-Service Property Search", desc: "AI-powered platform to browse and filter Golden Visa properties" },
{ icon: BarChart3, title: "Complete Data Transparency", desc: "Access market data, valuations, and historical trends" },
{ icon: LineChart, title: "Instant ROI Calculators", desc: "Model rental income, appreciation, and total returns" },
{ icon: ShieldCheck, title: "Visa Eligibility Checker", desc: "Instantly verify property Golden Visa qualification" }];


const PLATFORM_URL = "https://wa.me/306971853470?text=Hi%2C%20I'm%20interested%20in%20accessing%20mAI%20Prop%20OS";

const PlatformReference = () => {
  return (
    <section id="platform" className="relative bg-section-mid py-24 bg-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Data-Driven Investment Partner
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">mAI Prop OS</h2>
            <p className="mt-2 text-muted-foreground">AI-powered tools for smarter property investment decisions.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <div key={t.title} className="rounded-xl border border-border bg-background/40 p-6 backdrop-blur transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(179_90%_63%/0.06)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-10 text-center">
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