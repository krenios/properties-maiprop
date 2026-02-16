import { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Maximize, TrendingUp, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20";

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card p-0">
        {/* Gallery */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img src={currentImg} alt={property.title} className="h-full w-full object-cover" />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="space-y-6 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{property.title}</DialogTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property.location}
            </div>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">{property.description}</p>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {property.price && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold text-primary">€{property.price.toLocaleString()}</p>
              </div>
            )}
            {property.size && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <Maximize className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="text-lg font-bold">{property.size} m²</p>
              </div>
            )}
            {property.bedrooms && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <Bed className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="text-lg font-bold">{property.bedrooms} BR</p>
              </div>
            )}
            {property.yield && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <TrendingUp className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="text-lg font-bold">{property.yield}</p>
              </div>
            )}
          </div>

          {/* Floor plan */}
          {property.floorPlan && (
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Floor Plan</h4>
              <img src={property.floorPlan} alt="Floor plan" className="w-full rounded-lg border border-border" />
            </div>
          )}

          {/* POI */}
          {property.poi.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Points of Interest</h4>
              <div className="flex flex-wrap gap-2">
                {property.poi.map((p) => (
                  <Badge key={p} variant="outline" className="border-border text-muted-foreground">{p}</Badge>
                ))}
              </div>
            </div>
          )}

          <Button asChild size="lg" className="w-full gap-2 rounded-full">
            <a href={`${WHATSAPP_URL}${encodeURIComponent(property.title)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Inquire via WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
