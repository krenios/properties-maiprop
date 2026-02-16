import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShieldCheck } from "lucide-react";

const InvestmentOpportunities = () => {
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);

  const current = properties.filter((p) => p.project_type === "new");

  return (
    <section id="opportunities" className="relative overflow-hidden bg-background py-28">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[200px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[160px]" />
      
      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <Badge className="mb-4 gap-1.5 border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Golden Visa Eligible
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            Visa-Ready Real Estate
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Pre-verified Golden Visa properties with full compliance — analyze and compare independently.
          </p>
        </div>

        {/* Property grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((p) => (
            <PropertyCard key={p.id} property={p} onClick={() => setSelected(p)} />
          ))}
        </div>

        {/* Bottom accent */}
        {current.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{current.length} properties currently available</span>
          </div>
        )}
      </div>
      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default InvestmentOpportunities;
