import { Property } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Props {
  property: Property;
  onClick: () => void;
}

const statusColors: Record<string, string> = {
  available: "bg-primary/20 text-primary border-primary/30",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
  "under-construction": "bg-secondary/20 text-secondary border-secondary/30",
};

const PropertyCard = ({ property, onClick }: Props) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden rounded-xl border border-border/60 bg-card text-left transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(179_90%_63%/0.15),0_0_80px_hsl(179_90%_63%/0.05)] hover:-translate-y-1"
  >
    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={property.images[0] || "/placeholder.svg"}
        alt={property.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {property.status && (
        <Badge className={`absolute right-3 top-3 border ${statusColors[property.status] || ""}`}>
          {property.status.replace("-", " ")}
        </Badge>
      )}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
        {property.size && (
          <Badge variant="outline" className="border-background/30 bg-background/70 px-2 py-0.5 text-xs backdrop-blur">
            {property.size} m²
          </Badge>
        )}
        {property.bedrooms && (
          <Badge variant="outline" className="border-background/30 bg-background/70 px-2 py-0.5 text-xs backdrop-blur">
            {property.bedrooms} BR
          </Badge>
        )}
        {property.floor && (
          <Badge variant="outline" className="border-background/30 bg-background/70 px-2 py-0.5 text-xs backdrop-blur">
            Floor {property.floor}
          </Badge>
        )}
        {property.construction_year && (
          <Badge variant="outline" className="border-background/30 bg-background/70 px-2 py-0.5 text-xs backdrop-blur">
            {property.construction_year}
          </Badge>
        )}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold">{property.title}</h3>
      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" /> {property.location}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-xl font-bold text-primary">
          {property.price ? `€${property.price.toLocaleString()}` : "Price TBD"}
        </p>
      </div>
    </div>
  </button>
);

export default PropertyCard;
