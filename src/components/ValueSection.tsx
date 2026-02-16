import { Database, BarChart3, Brain, PieChart, Target, LineChart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandLogo2 from "@/assets/brand-os.jpg";

const services = [
{ icon: Database, title: "100K+ Property Database", desc: "Greece's largest structured property dataset for institutional-grade analysis." },
{ icon: BarChart3, title: "Market Analytics Engine", desc: "Real-time valuations, price trends & neighborhood comparables at your fingertips." },
{ icon: Brain, title: "AI-Powered Due Diligence", desc: "Automated Valuation Models leveraging latest AI models." },
{ icon: PieChart, title: "Portfolio Optimization", desc: "Diversification modeling across locations, asset types & risk profiles." },

{ icon: LineChart, title: "ROI Forecasting", desc: "Rental yield projections, capital appreciation models & IRR calculations." }];


const ValueSection = () =>
<section id="value" className="relative bg-section-purple py-24 bg-transparent">
    <div className="pointer-events-none absolute left-1/4 bottom-0 h-[350px] w-[350px] rounded-full bg-secondary/10 blur-[120px]" />
    <div className="relative container mx-auto px-6">
      <div className="mb-14 text-center">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
          Data-Driven Investment Partner
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">mAI Prop OS</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Technology meets real estate — data, AI & analytics become your partner.  

      </p>
      </div>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-5">
        {services.map((s) =>
      <div
        key={s.title}
        className="group rounded-xl border border-secondary/20 bg-background/30 p-6 backdrop-blur transition-all hover:border-secondary/40 hover:shadow-[0_0_30px_hsl(263_86%_64%/0.1)]">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/15 transition-colors group-hover:bg-secondary/25">
              <s.icon className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="mb-1 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
      )}
      </div>

      {/* Platform CTA */}
      <div className="mt-14 flex flex-col items-center gap-4">
        
        <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-[0_0_30px_hsl(179_90%_63%/0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(179_90%_63%/0.6)]">
          <a href="https://os.maiprop.co" target="_blank" rel="noopener noreferrer">
            Get Platform Access <ExternalLink className="h-5 w-5" />
          </a>
        </Button>
        
      </div>
    </div>
  </section>;


export default ValueSection;