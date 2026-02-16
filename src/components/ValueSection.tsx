import { Shield, BarChart3, Handshake, Search, Building, Headphones } from "lucide-react";

const services = [
  { icon: Search, title: "Deal Origination", desc: "Off-market properties sourced before they hit listings." },
  { icon: BarChart3, title: "Due Diligence & Analytics", desc: "Every asset vetted with market data and legal compliance." },
  { icon: Shield, title: "Golden Visa Processing", desc: "End-to-end residency permit and legal support." },
  { icon: Building, title: "Asset Management", desc: "Post-acquisition rental management under one roof." },
  { icon: Handshake, title: "Investor-First Approach", desc: "No hidden fees. Transparent pricing from day one." },
  { icon: Headphones, title: "Dedicated Advisory", desc: "Single point of contact from scouting to settlement." },
];

const ValueSection = () => (
  <section id="value" className="relative py-24">
    <div className="pointer-events-none absolute left-1/4 bottom-0 h-[350px] w-[350px] rounded-full bg-secondary/10 blur-[120px]" />
    <div className="relative container mx-auto px-6">
      <div className="mb-14 text-center">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
          Full-Stack Investment Partner
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">Why MaiProp</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          We don't just list properties — we originate, vet, acquire & manage assets so you don't have to.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(179_90%_63%/0.08)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueSection;
