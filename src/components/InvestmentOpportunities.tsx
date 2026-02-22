import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";

const InvestmentOpportunities = () => {
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);
  const { t } = useTranslation();

  const current = properties.filter((p) => p.project_type === "new");

  return (
    <section id="opportunities" className="relative bg-background py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[180px]" />
      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">{t("Golden Visa Eligible Properties")}</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t("Visa-Ready Real Estate Portfolio")}</h2>
            <p className="mt-2 text-muted-foreground">{t("Pre-verified Golden Visa properties with full compliance — analyze and compare independently.")}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="stagger">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {current.map((p) =>
            <RevealItem key={p.id}>
              <PropertyCard property={p} onClick={() => setSelected(p)} />
            </RevealItem>
            )}
          </div>
        </ScrollReveal>
      </div>
      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>);
};

export default InvestmentOpportunities;