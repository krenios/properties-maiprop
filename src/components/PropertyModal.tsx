import { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Maximize, TrendingUp, MessageCircle, ChevronLeft, ChevronRight, ExternalLink, Tag, ArrowRight, Building, Calendar, LayoutGrid } from "lucide-react";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/306971853470?text=Hi%2C%20I'm%20interested%20in%20";

interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const PropertyModal = ({ property, open, onClose }: Props) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  if (!property) return null;

  const images = property.images.length > 0 ? property.images : ["/placeholder.svg"];
  const currentImg = images[imgIdx % images.length];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Greece")}`;
  const hasBeforeAfter = property.beforeImage && property.afterImage;

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
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
              {(imgIdx % images.length) + 1} / {images.length}
            </div>
          )}
        </div>

        <div className="space-y-6 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{property.title}</DialogTitle>
            <button
              onClick={() => window.open(mapsUrl, "_blank")}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="h-4 w-4" /> {property.location}
              <ExternalLink className="h-3 w-3" />
            </button>
          </DialogHeader>

          {/* Classification tags */}
          {property.tags && property.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-secondary" />
              {property.tags.map((tag) => (
                <Badge key={tag} className="border-secondary/30 bg-secondary/15 text-secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground">{property.description}</p>

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
                <Bed className="h-3.5 w-3.5 text-muted-foreground" /> {property.bedrooms} BR
              </Badge>
            )}
            {property.floor && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Building className="h-3.5 w-3.5 text-muted-foreground" /> Floor {property.floor}
              </Badge>
            )}
            {property.constructionYear && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Built {property.constructionYear}
              </Badge>
            )}
            {property.yield && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-3 py-1.5 text-sm">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" /> {property.yield}
              </Badge>
            )}
          </div>

          {/* Before & After for delivered projects */}
          {hasBeforeAfter && (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Before & After</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <img src={property.beforeImage} alt="Before" className="aspect-[4/3] w-full object-cover grayscale-[40%]" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-destructive/80 px-3 py-1 text-xs font-semibold text-destructive-foreground backdrop-blur">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-lg border border-primary/30">
                  <img src={property.afterImage} alt="After" className="aspect-[4/3] w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                    After
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Map link */}
          <div className="overflow-hidden rounded-lg border border-border">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">View on Google Maps</p>
                  <p className="text-xs text-muted-foreground">{property.location}, Greece</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          </div>

          {/* Floor Plan */}
          {property.floorPlan && (
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                  <LayoutGrid className="h-4 w-4 text-primary" />
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Floor Plan</h4>
              </div>
              <img src={property.floorPlan} alt="Floor plan" className="w-full rounded-lg border border-border bg-background" />
              {property.floor && (
                <p className="mt-2 text-center text-xs text-muted-foreground">Floor: {property.floor}</p>
              )}
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
