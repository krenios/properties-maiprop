import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";

const InvestmentOpportunities = () => {
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);

  const current = properties.filter((p) => p.projectType === "new");

  return (
    <section id="opportunities" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-widest text-primary">Proprietary Assets</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Investment Opportunities</h2>
          <p className="mt-2 text-muted-foreground">Golden Visa-eligible properties curated by MaiProp.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((p) => (
            <PropertyCard key={p.id} property={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>
      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default InvestmentOpportunities;
