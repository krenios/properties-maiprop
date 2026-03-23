import { useEffect, useRef, useState } from "react";
import { importLibrary } from "@/lib/googleMapsLoader";
import { MapPin, ExternalLink } from "lucide-react";

const CACHE_KEY = "maiprop_geocache_v4";
function loadCache(): Record<string, { lat: number; lng: number }> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(c: Record<string, { lat: number; lng: number }>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

const DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0a0e2a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#000014" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5a6a8a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#131840" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0a0e2a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6a7a9a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1a2060" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#050a1a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0d1235" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#4a5a7a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0d1235" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1a2060" }] },
];

interface Props {
  location: string;
  height?: number;
  showFooter?: boolean;
}

const MiniMap = ({ location, height = 200, showFooter = true }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Greece")}`;

  useEffect(() => {
    if (!containerRef.current || !location) return;
    let cancelled = false;

    const init = async () => {
      try {
        const { Map } = await importLibrary("maps") as any;
        if (cancelled || !containerRef.current) return;

        const g = (window as any).google;
        const map = new Map(containerRef.current, {
          center: { lat: 37.9838, lng: 23.7275 },
          zoom: 13,
          styles: DARK_STYLE,
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: "none",
          clickableIcons: false,
        });

        const cache = loadCache();
        const key = location.trim().toLowerCase();
        const cached = cache[key];

        const placeMarker = (pos: { lat: number; lng: number }) => {
          map.setCenter(pos);
          new g.maps.Marker({
            map,
            position: pos,
            title: location,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#4ef5f1",
              fillOpacity: 1,
              strokeColor: "#000014",
              strokeWeight: 2,
            },
          });
        };

        if (cached) {
          placeMarker(cached);
        } else {
          const geocoder = new g.maps.Geocoder();
          geocoder.geocode(
            { address: `${location}, Greece` },
            (results: any[], status: string) => {
              if (cancelled) return;
              if (status === "OK" && results?.[0]) {
                const pos = {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                };
                cache[key] = pos;
                saveCache(cache);
                placeMarker(pos);
              }
            }
          );
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    init();
    return () => { cancelled = true; };
  }, [location]);

  if (error) {
    return (
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/20 text-sm text-muted-foreground hover:text-primary transition-colors"
        style={{ height }}
      >
        <MapPin className="h-4 w-4" /> Open in Google Maps
      </a>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div ref={containerRef} style={{ height, width: "100%" }} />
      {showFooter && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between bg-muted/30 p-3 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">{location}, Greece</p>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
        </a>
      )}
    </div>
  );
};

export default MiniMap;
