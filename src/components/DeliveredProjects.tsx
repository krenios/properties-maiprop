import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import { CheckCircle, MapPin } from "lucide-react";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";

const trackRecord = [
{ value: "€6.3M", label: "Successfully Closed" },
{ value: "19", label: "Projects Delivered" },
{ value: "100%", label: "Visa Success Rate" },
{ value: "6.4%", label: "Avg Portfolio ROI" }];


const DeliveredProjects = () => {
  const { properties } = useProperties();
  const delivered = properties.filter((p) => p.projectType === "delivered");
  const [selected, setSelected] = useState<Property | null>(null);

  if (delivered.length === 0) return null;

  return (
    <section id="delivered" className="relative bg-section-elevated py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent" />
      <div className="relative container mx-auto px-6">
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">Proven Track Record</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Successfully Delivered</h2>
          <p className="mt-2 text-muted-foreground">Completed investments and successful visa approvals.</p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {delivered.map((p) =>
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="group relative overflow-hidden rounded-xl border border-border bg-background/40 text-left backdrop-blur transition-all hover:border-secondary/40">

              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                src={p.images[0] || "/placeholder.svg"}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[30%]"
                loading="lazy" />

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground">
                  <CheckCircle className="h-3 w-3" /> Delivered
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
                {p.yield &&
              <p className="mt-2 text-xs text-muted-foreground">{p.yield} ROI achieved</p>
              }
              </div>
            </button>
          )}
        </div>

        {/* Track record stats */}
        







      </div>

      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>);

};

export default DeliveredProjects;