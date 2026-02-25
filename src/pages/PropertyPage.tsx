import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { optimizeImage } from "@/lib/optimizeImage";
import { useLeadBot } from "@/components/LeadBotProvider";
import {
  MapPin, Bed, Maximize, TrendingUp, ChevronLeft, ChevronRight,
  ExternalLink, Building, Calendar, LayoutGrid, FileText,
  Plane, Waves, Anchor, TrainFront, Car, GraduationCap,
  ShoppingCart, Cross, Heart, Landmark, TreePine, Loader2,
  ArrowLeft, MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { LeadBotProvider } from "@/components/LeadBotProvider";
import { lazy, Suspense } from "react";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const statusColors: Record<string, string> = {
  available: "bg-primary/20 text-primary border-primary/30",
  booked: "bg-secondary/20 text-secondary border-secondary/30",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
  "under-construction": "bg-muted/30 text-muted-foreground border-muted-foreground/30",
};

const POI_ICONS: Record<string, LucideIcon> = {
  "Airport": Plane, "Sea": Waves, "Ports": Anchor, "Train Stations": TrainFront,
  "Motorway Access": Car, "Schools": GraduationCap, "Supermarket": ShoppingCart,
  "Pharmacies": Cross, "Hospitals": Heart, "Parthenon": Landmark, "Parks": TreePine,
};

interface PoiEntry { name: string; distance: string; }

const BASE_URL = "https://properties.maiprop.co";

const PropertyPageInner = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openWithLocation } = useLeadBot();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const [poiEntries, setPoiEntries] = useState<PoiEntry[] | null>(null);
  const [poiLoading, setPoiLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from("properties").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error || !data) { navigate("/", { replace: true }); return; }
      setProperty(data as Property);
      setLoading(false);
    });
  }, [id, navigate]);

  useEffect(() => {
    if (!property?.location) return;
    setPoiLoading(true);
    supabase.functions.invoke("location-poi", {
      body: { location: property.location, property_id: property.id },
    }).then(({ data, error }) => {
      setPoiEntries(error ? null : data?.poi || []);
    }).finally(() => setPoiLoading(false));
  }, [property?.id, property?.location]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!property) return null;

  const images = property.images.length > 0 ? property.images : ["/placeholder.svg"];
  const currentImg = images[imgIdx % images.length];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Greece")}`;
  const pageUrl = `${BASE_URL}/property/${property.id}`;
  const ogImage = images[0] ? optimizeImage(images[0], { width: 1200, height: 630 }) : `${BASE_URL}/og-image.png`;

  const DEFAULT_POI: PoiEntry[] = [
    "Airport", "Sea", "Ports", "Train Stations", "Motorway Access",
    "Schools", "Supermarket", "Pharmacies", "Hospitals", "Parthenon", "Parks",
  ].map((name) => ({ name, distance: "" }));
  const displayPoi = poiEntries ?? DEFAULT_POI;

  // JSON-LD structured data for this property
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": property.title,
    "description": property.description || `${property.title} — Golden Visa eligible property in ${property.location}, Greece.`,
    "url": pageUrl,
    "image": images[0] || ogImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressCountry": "GR",
    },
    ...(property.price ? {
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "EUR",
        "availability": property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      }
    } : {}),
    ...(property.size ? { "floorSize": { "@type": "QuantitativeValue", "value": property.size, "unitCode": "MTK" } } : {}),
    ...(property.bedrooms ? { "numberOfRooms": property.bedrooms } : {}),
    "amenityFeature": property.tags.filter(Boolean).map((tag) => ({
      "@type": "LocationFeatureSpecification",
      "name": tag,
      "value": true,
    })),
  };

  const title = `${property.title} | ${property.location} | mAI Investments`;
  const description = property.description
    ? property.description.slice(0, 155) + (property.description.length > 155 ? "…" : "")
    : `${property.title} in ${property.location}, Greece. ${property.price ? `€${property.price.toLocaleString()}` : ""} ${property.size ? `· ${property.size} m²` : ""} Golden Visa eligible property.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto max-w-4xl px-4 pb-16 pt-24">
          {/* Back link */}
          <Link to="/#opportunities" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to properties
          </Link>

          {/* Gallery */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <img
              src={optimizeImage(currentImg, { width: 1200, height: 675 })}
              alt={`${property.title} — Golden Visa property in ${property.location}`}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            {property.status && (
              <Badge className={`absolute left-4 top-4 border ${statusColors[property.status] || ""}`}>
                {property.status.replace("-", " ")}
              </Badge>
            )}
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === imgIdx % images.length ? "w-5 bg-primary" : "w-1.5 bg-background/60"}`} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Header */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold sm:text-4xl">{property.title}</h1>
            <button onClick={() => window.open(mapsUrl, "_blank")}
              className="mt-2 flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <MapPin className="h-4 w-4" /> {property.location}, Greece
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <Separator className="my-6 bg-border" />

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            {property.price && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <span className="font-bold text-primary">€{property.price.toLocaleString()}</span>
              </Badge>
            )}
            {property.size && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <Maximize className="h-3.5 w-3.5 text-muted-foreground" /> {property.size} m²
              </Badge>
            )}
            {property.bedrooms && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <Bed className="h-3.5 w-3.5 text-muted-foreground" /> {property.bedrooms} Bedrooms
              </Badge>
            )}
            {property.floor && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <Building className="h-3.5 w-3.5 text-muted-foreground" /> Floor {property.floor}
              </Badge>
            )}
            {property.construction_year && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Built {property.construction_year}
              </Badge>
            )}
            {property.yield && (
              <Badge variant="outline" className="gap-1.5 rounded-full border-border px-4 py-2 text-sm">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" /> {property.yield}
              </Badge>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <>
              <Separator className="my-6 bg-border" />
              <p className="leading-relaxed text-muted-foreground">{property.description}</p>
            </>
          )}

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2 rounded-full px-8"
              onClick={() => openWithLocation(property.location)}>
              <MessageCircle className="h-5 w-5" /> Inquire About This Property
            </Button>
          </div>

          <Separator className="my-8 bg-border" />

          {/* POI */}
          <section aria-label="Points of Interest">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Points of Interest
              {poiLoading && <Loader2 className="ml-2 inline h-3 w-3 animate-spin" />}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {displayPoi.map((entry) => {
                const Icon = POI_ICONS[entry.name] || MapPin;
                return (
                  <Badge key={entry.name} variant="secondary" className="gap-1.5 rounded-full px-3 py-1 text-xs">
                    <Icon className="h-3 w-3" />
                    {entry.name}
                    {entry.distance && <span className="ml-0.5 font-medium text-primary">· {entry.distance}</span>}
                  </Badge>
                );
              })}
            </div>
          </section>

          {/* Tags */}
          {property.tags.filter(Boolean).length > 0 && (
            <>
              <Separator className="my-6 bg-border" />
              <section aria-label="Property Features">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Features</h2>
                <div className="flex flex-wrap gap-1.5">
                  {property.tags.filter(Boolean).map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full px-3 py-1 text-xs">{t}</Badge>
                  ))}
                </div>
              </section>
            </>
          )}

          <Separator className="my-8 bg-border" />

          {/* Map */}
          <section aria-label="Location map">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Location</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title={`Map of ${property.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location + ", Greece")}&output=embed`}
                className="h-[280px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between bg-muted/30 p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">{property.location}, Greece</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </section>

          {/* Floor Plan */}
          {property.floor_plan && (
            <>
              <Separator className="my-8 bg-border" />
              <section aria-label="Floor plan">
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                      <LayoutGrid className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">Floor Plan</h2>
                  </div>
                  <img src={property.floor_plan} alt={`Floor plan of ${property.title}`}
                    className="max-h-[300px] w-full rounded-lg border border-border bg-background object-contain"
                    loading="lazy" decoding="async" />
                </div>
              </section>
            </>
          )}

          {/* Market Report */}
          {property.market_report && (
            <>
              <Separator className="my-8 bg-border" />
              <a href={property.market_report} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors">
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
        </main>
      </div>
    </>
  );
};

const PropertyPage = () => (
  <LeadBotProvider>
    <PropertyPageInner />
    <Suspense fallback={null}>
      <LeadCaptureBot />
    </Suspense>
  </LeadBotProvider>
);

export default PropertyPage;
