import { useProperties } from "@/contexts/PropertyContext";
import { CheckCircle, MapPin } from "lucide-react";

const DeliveredProjects = () => {
  const { properties } = useProperties();
  const delivered = properties.filter((p) => p.projectType === "delivered");

  if (delivered.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-widest text-secondary">Track Record</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Previously Delivered</h2>
          <p className="mt-2 text-muted-foreground">Successfully completed investment projects.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {delivered.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-secondary/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.images[0] || "/placeholder.svg"}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[30%]"
                  loading="lazy"
                />
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground">
                  <CheckCircle className="h-3 w-3" /> Delivered
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveredProjects;
