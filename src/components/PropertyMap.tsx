import { useState } from "react";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";
import { MapPin, ExternalLink } from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyD42TB3L5KeQfvqOu6NfelXL5EOVNzz_cY";

interface Props {
  properties: Property[];
  height?: number;
  onPropertyClick?: (property: Property) => void;
}

const PropertyMap = ({ properties, height = 500, onPropertyClick }: Props) => {
  const [selected, setSelected] = useState<Property>(properties[0]);

  const active = selected ?? properties[0];
  const query = active ? encodeURIComponent(`${active.location}, Greece`) : encodeURIComponent("Athens, Greece");
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=${query}&zoom=15`;
  const mapsUrl = active
    ? `https://www.google.com/maps/search/?api=1&query=${query}`
    : "https://www.google.com/maps/search/?api=1&query=Athens,Greece";

  return (
    <div
      className="flex overflow-hidden rounded-2xl border border-border"
      style={{ height }}
    >
      {/* Property list sidebar */}
      <div className="w-72 shrink-0 overflow-y-auto border-r border-border bg-background/80 backdrop-blur-sm">
        {properties.map((p) => {
          const isActive = active?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`w-full text-left transition-colors border-b border-border last:border-b-0 ${
                isActive
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-muted/40 border-l-2 border-l-transparent"
              }`}
            >
              {p.images?.[0] && (
                <img
                  src={optimizeImage(p.images[0], { width: 288, height: 90 })}
                  alt={p.title}
                  className="w-full h-20 object-cover"
                />
              )}
              <div className="p-3">
                <p className={`text-xs font-semibold leading-snug mb-1 ${isActive ? "text-primary" : "text-foreground"}`}>
                  {p.title}
                </p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="text-xs truncate">{p.location}</span>
                </div>
                {p.price && (
                  <p className="text-xs font-bold text-primary mt-1">
                    €{p.price.toLocaleString()}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Map iframe + footer */}
      <div className="flex flex-col flex-1 min-w-0">
        <iframe
          key={query}
          src={embedUrl}
          width="100%"
          style={{ flex: 1, border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={active ? `Map of ${active.location}` : "Map"}
        />
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium truncate">
              {active ? `${active.location}, Greece` : "Athens, Greece"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onPropertyClick && active && (
              <button
                onClick={() => onPropertyClick(active)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Quick view
              </button>
            )}
            {active && (
              <a
                href={`/property/${active.id}`}
                className="text-xs font-semibold text-primary hover:underline"
              >
                View property →
              </a>
            )}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
