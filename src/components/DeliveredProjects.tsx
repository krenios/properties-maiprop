import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import { CheckCircle, MapPin, Bed, Maximize, TrendingUp, Tag, MessageCircle, ExternalLink } from "lucide-react";
import { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20";

const trackRecord = [
  { value: "€6.3M", label: "Successfully Closed" },
  { value: "19", label: "Projects Delivered" },
  { value: "100%", label: "Visa Success Rate" },
  { value: "6.4%", label: "Avg Portfolio ROI" },
];

const DeliveredProjects = () => {
  const { properties } = useProperties();
  const delivered = properties.filter((p) => p.projectType === "delivered");
  const [selected, setSelected] = useState<Property | null>(null);

  if (delivered.length === 0) return null;

  return (
    <section id="delivered" className="bg-section-deep py-20">
      <div className="container mx-auto px-6">
        {/* Track record stats */}
        <div className="mb-16 text-center">
          <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" /> Track Record
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Successfully Delivered</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A proven portfolio of completed projects — renovated, rented, and generating returns.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {trackRecord.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Property cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {delivered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={p.images[0] || p.afterImage || "/placeholder.svg"}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute right-3 top-3 border-none bg-primary/90 text-primary-foreground">
                  Delivered
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {p.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Delivered Modal — only before/after + specs */}
      <DeliveredModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

interface ModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const DeliveredModal = ({ property, open, onClose }: ModalProps) => {
  if (!property) return null;

  const hasBeforeAfter = property.beforeImage && property.afterImage;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Greece")}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card p-0">
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

          {/* Tags */}
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

          {/* Property Specs */}
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

          {/* Before & After */}
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

export default DeliveredProjects;
