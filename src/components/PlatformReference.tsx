import { ExternalLink, Search, BarChart3, ShieldCheck, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  { icon: Search, title: "Self-Service Property Search", desc: "AI-powered platform to browse and filter Golden Visa properties" },
  { icon: BarChart3, title: "Complete Data Transparency", desc: "Access market data, valuations, and historical trends" },
  { icon: LineChart, title: "Instant ROI Calculators", desc: "Model rental income, appreciation, and total returns" },
  { icon: ShieldCheck, title: "Visa Eligibility Checker", desc: "Instantly verify property Golden Visa qualification" },
];

const PlatformReference = () => (
  <section id="platform" className="relative bg-card py-24">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 to-transparent" />
    <div className="relative container mx-auto px-6">
      <div className="mb-14 text-center">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          How We Support You
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Tools to Assess Opportunities <span className="text-primary">Yourself</span>
        </h2>
        <p className="mt-2 text-muted-foreground">Technology-powered independent property evaluation tools.</p>
      </div>

      <div className="mb-10 grid gap-6 sm:grid-cols-2">
        {tools.map((t) => (
          <div key={t.title} className="flex gap-4 rounded-xl border border-border bg-background/50 p-5 backdrop-blur transition-all hover:border-primary/30">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <t.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline" size="lg" className="gap-2 rounded-full border-primary/30 text-primary hover:bg-primary/10">
          <a href="https://os.maiprop.co" target="_blank" rel="noopener noreferrer">
            Get Platform Access <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default PlatformReference;
