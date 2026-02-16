import { TrendingUp, Home, Globe, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Home, label: "Min. Investment", value: "€250K", sub: "Property threshold" },
  { icon: Globe, label: "EU Residency", value: "Schengen", sub: "Travel 27 countries" },
  { icon: TrendingUp, label: "Avg. Yield", value: "5–7%", sub: "Net rental return" },
  { icon: ShieldCheck, label: "Processing", value: "60 Days", sub: "Fast-track approval" },
];

const GoldenVisaStats = () => (
  <section className="border-y border-border bg-card/50 py-16">
    <div className="container mx-auto grid grid-cols-2 gap-8 px-6 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <s.icon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold sm:text-3xl">{s.value}</p>
          <p className="text-sm font-medium text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </div>
  </section>
);

export default GoldenVisaStats;
