import { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Bed,
  Maximize,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Building,
  Calendar,
  LayoutGrid,
  FileText,
} from "lucide-react";
import { useState } from "react";


interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const PropertyModal = ({ property, open, onClose }: Props) => {
  const [imgIdx, setImgIdx] = useState(0);

  if (!property) return null;

  const images = property.images.length > 0 ? property.images : ["/placeholder.svg"];
  const currentImg = images[imgIdx % images.length];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Greece")}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border bg-card p-0 [-webkit-overflow-scrolling:touch]">
        {/* Gallery */}
        <div className="relative h-[250px] w-full overflow-hidden sm:h-[420px]">
          <img src={currentImg} alt={property.title} className="h-full w-full object-cover" />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 backdrop-blur"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 backdrop-blur"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div className="space-y-4 p-4">
          <DialogHeader>
            <DialogTitle className="text-xl">{property.title}</DialogTitle>
            <button
              onClick={() => window.open(mapsUrl, "_blank")}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="h-4 w-4" /> {property.location}
              <ExternalLink className="h-3 w-3" />
            </button>
          </DialogHeader>

          <Separator className="bg-border" />

          {/* Key specs as pills */}
          <div className="flex flex-wrap gap-2">
            {property.price && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <span className="text-primary font-semibold">€{property.price.toLocaleString()}</span>
              </Badge>
            )}
            {property.size && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Maximize className="h-3.5 w-3.5 text-muted-foreground" /> {property.size} m²
              </Badge>
            )}
            {property.bedrooms && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Bed className="h-3.5 w-3.5 text-muted-foreground" /> {property.bedrooms} Bdr
              </Badge>
            )}
            {property.floor && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Building className="h-3.5 w-3.5 text-muted-foreground" /> Floor {property.floor}
              </Badge>
            )}
            {property.construction_year && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Built {property.construction_year}
              </Badge>
            )}
            {property.yield && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" /> {property.yield}
              </Badge>
            )}
          </div>

          {/* POI pills */}
          {property.poi.filter(Boolean).length > 0 && (
            <>
              <Separator className="bg-border" />
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Points of Interest
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {property.poi.filter(Boolean).map((p) => (
                    <Badge key={p} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Tags pills */}
          {property.tags.filter(Boolean).length > 0 && (
            <>
              <Separator className="bg-border" />
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Features</h4>
                <div className="flex flex-wrap gap-1.5">
                  {property.tags.filter(Boolean).map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full px-3 py-1 text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator className="bg-border" />

          {/* Embedded Google Map */}
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Map of ${property.location}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(property.location + ", Greece")}&output=embed`}
              className="h-[180px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-muted/30 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">{property.location}, Greece</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          </div>

          {/* Floor Plan */}
          {property.floor_plan && (
            <>
              <Separator className="bg-border" />
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                    <LayoutGrid className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Floor Plan</h4>
                </div>
                <img
                  src={property.floor_plan}
                  alt="Floor plan"
                  className="max-h-[200px] w-full rounded-lg border border-border bg-background object-contain"
                />
              </div>
            </>
          )}

          {/* Market Report */}
          {property.market_report && (
            <>
              <Separator className="bg-border" />
              <a
                href={property.market_report}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">Market Report</p>
                  <p className="text-xs text-muted-foreground">View PDF report</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </>
          )}

          <Separator className="bg-border" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
