import { createPortal } from "react-dom";
import { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { optimizeImage } from "@/lib/optimizeImage";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Bed, Maximize, TrendingUp, ChevronLeft, ChevronRight,
  ExternalLink, Building, Calendar, LayoutGrid, FileText,
  Plane, Waves, Anchor, TrainFront, Car, GraduationCap,
  ShoppingCart, Cross, Heart, Landmark, TreePine, Loader2,
  Share2, Expand,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LucideIcon } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

const statusColors: Record<string, string> = {
  available: "bg-primary/20 text-primary border-primary/30",
  booked: "bg-secondary/20 text-secondary border-secondary/30",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
  "under-construction": "bg-muted/30 text-muted-foreground border-muted-foreground/30",
};

const POI_ICONS: Record<string, LucideIcon> = {
  "Airport": Plane,
  "Sea": Waves,
  "Ports": Anchor,
  "Train Stations": TrainFront,
  "Motorway Access": Car,
  "Schools": GraduationCap,
  "Supermarket": ShoppingCart,
  "Pharmacies": Cross,
  "Hospitals": Heart,
  "Parthenon": Landmark,
  "Parks": TreePine,
};

interface PoiEntry {
  name: string;
  distance: string;
}

interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 120;

// Module-level cache for POI results keyed by property id
const poiCache: Record<string, PoiEntry[]> = {};

const PropertyModal = ({ property, open, onClose }: Props) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [swipeY, setSwipeY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [poiEntries, setPoiEntries] = useState<PoiEntry[] | null>(null);
  const [poiLoading, setPoiLoading] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);

  const handleShare = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!property) return;
    const shareUrl = `${window.location.origin}/property/${property.id}`;
    const shareData = {
      title: property.title,
      text: `${property.title} — Golden Visa property in ${property.location}, Greece${property.price ? ` · €${property.price.toLocaleString()}` : ""}`,
      url: shareUrl,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied!", { description: "Property link copied to clipboard." });
      } catch {
        window.prompt("Copy this link:", shareUrl);
      }
    }
  }, [property]);

  const touchStartY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTopBeforeLightbox = useRef(0);
  const saveScrollTop = useCallback(() => {
    const el = scrollRef.current;
    scrollTopBeforeLightbox.current = el?.scrollTop ?? 0;
  }, []);

  const restoreScrollTop = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = scrollTopBeforeLightbox.current;
  }, []);

  // Fetch POI with distances when modal opens
  useEffect(() => {
    if (!open || !property?.location) {
      setPoiEntries(null);
      return;
    }

    // Check module-level cache first
    if (poiCache[property.id]) {
      setPoiEntries(poiCache[property.id]);
      return;
    }

    setPoiLoading(true);
    supabase.functions
      .invoke("location-poi", {
        body: { location: property.location, property_id: property.id },
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("POI fetch error:", error);
          setPoiEntries(null);
        } else {
          const entries: PoiEntry[] = data?.poi || [];
          poiCache[property.id] = entries;
          setPoiEntries(entries);
        }
      })
      .finally(() => setPoiLoading(false));
  }, [open, property?.id, property?.location]);

  // If the modal closes while the lightbox is open, reset lightbox state.
  // Otherwise the lightbox can re-render instantly when opening another modal.
  useEffect(() => {
    if (!open) {
      setLightboxIdx(null);
      setFloorPlanOpen(false);
      setImgIdx(0);
      setSwipeY(0);
      setIsSwiping(false);
    }
  }, [open]);

  // Ensure ESC closes only the lightbox (photo OR floor plan) and doesn't close the Radix dialog.
  useEffect(() => {
    if (lightboxIdx === null && !floorPlanOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      restoreScrollTop();
      if (lightboxIdx !== null) setLightboxIdx(null);
      if (floorPlanOpen) setFloorPlanOpen(false);
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [lightboxIdx, floorPlanOpen, restoreScrollTop]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (el && el.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsSwiping(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      setSwipeY(delta);
    }
  }, [isSwiping]);

  const handleTouchEnd = useCallback(() => {
    if (swipeY > SWIPE_THRESHOLD) {
      onClose();
    }
    setSwipeY(0);
    setIsSwiping(false);
  }, [swipeY, onClose]);

  if (!property) return null;

  // Filter out empty/invalid image URLs so lightbox navigation always cycles real images.
  const images = property.images.filter(Boolean);
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];
  const currentImg = safeImages[imgIdx % safeImages.length];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Greece")}`;

  const DEFAULT_POI: PoiEntry[] = [
    "Airport", "Sea", "Ports", "Train Stations", "Motorway Access",
    "Schools", "Supermarket", "Pharmacies", "Hospitals", "Parthenon", "Parks",
  ].map((name) => ({ name, distance: "" }));

  const displayPoi = poiEntries ?? DEFAULT_POI;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          onPointerDownOutside={(e) => {
            // While the lightbox is open, prevent the Radix dialog from closing
            // due to pointer interactions that land outside the modal content.
            if (lightboxIdx !== null || floorPlanOpen) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (lightboxIdx !== null || floorPlanOpen) e.preventDefault();
          }}
          className={`max-h-[100dvh] max-w-3xl overflow-hidden border-border bg-card p-0 max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:rounded-none max-sm:border-0 sm:max-h-[90vh] ${
            lightboxIdx !== null || floorPlanOpen ? "pointer-events-none" : ""
          }`}
          style={{
            transform: swipeY > 0 ? `translateY(${swipeY}px)` : undefined,
            opacity: swipeY > 0 ? Math.max(1 - swipeY / 300, 0.5) : undefined,
            transition: isSwiping ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
          }}
        >
          {/* Inner scroll container */}
          <div
            ref={scrollRef}
            className="h-full max-h-[100dvh] overflow-y-auto [-webkit-overflow-scrolling:touch] sm:max-h-[90vh]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Swipe indicator for mobile */}
            <div className="flex justify-center pt-2 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Gallery */}
            <div className="relative h-[300px] sm:h-[520px] w-full overflow-hidden">
              <img
                src={optimizeImage(currentImg, { width: 900, height: 600 })}
                alt={`${property.title} — Golden Visa property in ${property.location}, Greece`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {property.status && (
                <Badge className={`absolute left-3 top-3 border ${statusColors[property.status] || ""}`}>
                  {property.status.replace("-", " ")}
                </Badge>
              )}
              {/* Enlarge button — bottom-left, opposite the modal close X */}
              <button
                onClick={() => {
                  saveScrollTop();
                  setLightboxIdx(imgIdx % safeImages.length);
                }}
                className="absolute bottom-3 left-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur opacity-100"
                aria-label="Enlarge image"
                title="Enlarge image"
              >
                <Maximize className="h-4 w-4" />
              </button>
              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + safeImages.length) % safeImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % safeImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
                    {imgIdx % safeImages.length + 1} / {safeImages.length}
                  </div>

                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                    {safeImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`h-10 w-14 overflow-hidden rounded border-2 transition-all ${
                          i === imgIdx % safeImages.length
                            ? "border-primary shadow-lg"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={optimizeImage(img, { width: 120, height: 80 })}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4 p-4">
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <DialogTitle className="text-xl leading-snug">{property.title}</DialogTitle>
                  <button
                    onClick={handleShare}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
                    aria-label="Share property"
                    title="Share this property"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
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

              {/* POI pills with distance */}
              <Separator className="bg-border" />
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Points of Interest
                  {poiLoading && <Loader2 className="ml-2 inline h-3 w-3 animate-spin" />}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {displayPoi.map((entry) => {
                    const Icon = POI_ICONS[entry.name] || MapPin;
                    return (
                      <Badge key={entry.name} variant="secondary" className="gap-1.5 rounded-full px-3 py-1 text-xs">
                        <Icon className="h-3 w-3" />
                        {entry.name}
                        {entry.distance && (
                          <span className="ml-0.5 text-primary font-medium">· {entry.distance}</span>
                        )}
                      </Badge>
                    );
                  })}
                </div>
              </div>

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
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(property.location + ", Greece")}`}
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
                    <div className="relative">
                      <img
                        src={property.floor_plan}
                        alt={`Floor plan of ${property.title} — property layout`}
                        className="max-h-[200px] w-full cursor-zoom-in rounded-lg border border-border bg-background object-contain transition-opacity hover:opacity-90"
                        loading="lazy"
                        decoding="async"
                        onClick={() => {
                          saveScrollTop();
                          setFloorPlanOpen(true);
                        }}
                      />
                      {/* Enlarge button — bottom-left, away from modal X */}
                      <button
                        onClick={() => {
                          saveScrollTop();
                          setFloorPlanOpen(true);
                        }}
                        className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-xs text-primary backdrop-blur hover:bg-background transition-colors"
                        aria-label="Enlarge floor plan"
                      >
                        <Expand className="h-3 w-3" /> Enlarge
                      </button>
                    </div>
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery lightbox — portal to body to escape Dialog stacking context */}
      {lightboxIdx !== null && createPortal(
        <ImageLightbox
          images={safeImages}
          index={lightboxIdx}
          onClose={() => {
            restoreScrollTop();
            setLightboxIdx(null);
          }}
          onPrev={
            safeImages.length > 1
              ? () =>
                  setLightboxIdx((i) => {
                    const next = ((i ?? 0) - 1 + safeImages.length) % safeImages.length;
                    setImgIdx(next);
                    return next;
                  })
              : undefined
          }
          onNext={
            safeImages.length > 1
              ? () =>
                  setLightboxIdx((i) => {
                    const next = ((i ?? 0) + 1) % safeImages.length;
                    setImgIdx(next);
                    return next;
                  })
              : undefined
          }
        />,
        document.body
      )}

      {/* Floor plan lightbox — portal to body to escape Dialog stacking context */}
      {floorPlanOpen && property?.floor_plan && createPortal(
        <ImageLightbox
          images={[property.floor_plan]}
          index={0}
          onClose={() => {
            restoreScrollTop();
            setFloorPlanOpen(false);
          }}
        />,
        document.body
      )}
    </>
  );
};

export default PropertyModal;
