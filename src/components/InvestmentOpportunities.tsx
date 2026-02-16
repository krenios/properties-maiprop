import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";

const InvestmentOpportunities = () => {
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);

  const current = properties.filter((p) => p.project_type === "new");

  return (
    <section id="opportunities" className="relative bg-section-deep py-24 bg-accent-foreground bg-[sidebar-primary-foreground]">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[180px]" />
      <div className="relative container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary-foreground">Golden Visa Eligible Properties</span>
          <h2 className="text-3xl font-bold sm:text-4xl text-primary-foreground">Visa-Ready Real Estate Portfolio</h2>
          <p className="mt-2 text-slate-500">Pre-verified Golden Visa properties with full compliance — analyze and compare independently.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((p) =>
          <PropertyCard key={p.id} property={p} onClick={() => setSelected(p)} />
          )}
        </div>
      </div>
      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>);

};

export default InvestmentOpportunities;