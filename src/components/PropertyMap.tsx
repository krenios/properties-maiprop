import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

const CACHE_KEY = "maiprop_geocache_v2";
function loadCache(): Record<string, { lat: number; lng: number }> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(c: Record<string, { lat: number; lng: number }>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

// Dark map style matching site palette
const DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0a0e2a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#000014" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5a6a8a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#131840" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0a0e2a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6a7a9a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1a2060" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#8090b0" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#050a1a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3a4a6a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0d1235" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#4a5a7a" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0a1030" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1a2060" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#4a5a7a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0d1235" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#4a5a7a" }] },
];

// Configure the loader once
setOptions({
  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  v: "weekly",
});

interface Props { properties: Property[]; }

const PropertyMap = ({ properties }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const geocodedIdsRef = useRef<string>("");
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    importLibrary("maps").then(({ Map }) => {
      if (!containerRef.current) return;
      const g = (window as any).google;
      mapRef.current = new Map(containerRef.current, {
        center: { lat: 37.9838, lng: 23.7275 },
        zoom: 11,
        styles: DARK_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: { position: g?.maps?.ControlPosition?.RIGHT_BOTTOM },
        gestureHandling: "cooperative",
      });
    }).catch(() => setError(true));

    return () => { mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!properties.length) return;

    const ids = properties.map((p) => p.id).join(",");
    if (ids === geocodedIdsRef.current) return;
    geocodedIdsRef.current = ids;

    const snapshot = [...properties];
    let active = true;

    const run = async () => {
      // Wait for map to be ready
      let attempts = 0;
      while (!mapRef.current && attempts < 30) {
        await new Promise((r) => setTimeout(r, 200));
        attempts++;
      }
      if (!mapRef.current || !active) return;

      const map = mapRef.current;
      const g = (window as any).google;
      if (!g) return;

      setLoading(true);
      setResolved(0);

      const cache = loadCache();
      const geocoder = new g.maps.Geocoder();

      for (const p of snapshot) {
        if (!active) break;
        const key = p.location?.trim().toLowerCase();
        if (!key) { setResolved((n) => n + 1); continue; }

        let pos: { lat: number; lng: number } | null = cache[key] ?? null;

        if (!pos) {
          try {
            const result = await new Promise<any[] | null>((resolve) => {
              geocoder.geocode(
                { address: `${p.location}, Greece` },
                (results: any[], status: string) => {
                  resolve(status === "OK" ? results : null);
                }
              );
            });
            if (result?.[0]) {
              pos = {
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
              };
              cache[key] = pos;
              saveCache(cache);
            }
          } catch {}
        }

        if (!active) break;

        if (pos) {
          const img = p.images?.[0]
            ? `<img src="${optimizeImage(p.images[0], { width: 220, height: 130 })}" style="width:100%;height:120px;object-fit:cover;display:block;border-radius:8px 8px 0 0;"/>`
            : "";
          const price = p.price
            ? `<span style="color:#4ef5f1;font-size:15px;font-weight:700;">€${p.price.toLocaleString()}</span>`
            : "";

          const marker = new g.maps.Marker({
            map,
            position: pos,
            title: p.title,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4ef5f1",
              fillOpacity: 1,
              strokeColor: "#000014",
              strokeWeight: 2,
            },
          });

          const infoWindow = new g.maps.InfoWindow({
            content: `<div style="width:220px;background:#0a0e2a;border-radius:8px;overflow:hidden;font-family:'Inter',sans-serif;">
              ${img}
              <div style="padding:12px 14px 14px;">
                <p style="margin:0 0 3px;color:#e8f0ff;font-size:13px;font-weight:600;line-height:1.3;">${p.title}</p>
                <p style="margin:0 0 8px;color:#5a6a8a;font-size:11px;">${p.location}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  ${price}
                  <a href="/property/${p.id}" style="background:#4ef5f1;color:#000014;font-size:11px;font-weight:700;padding:5px 10px;border-radius:5px;text-decoration:none;">View →</a>
                </div>
              </div>
            </div>`,
            disableAutoPan: false,
          });

          marker.addListener("click", () => infoWindow.open(map, marker));
        }

        setResolved((n) => n + 1);
      }

      if (active) setLoading(false);
    };

    run();
    return () => { active = false; };
  }, [properties]);

  if (error) {
    return (
      <div style={{ height: 600, width: "100%", borderRadius: 16, background: "#0a0e2a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#5a6a8a", fontSize: 14 }}>Map unavailable — add VITE_GOOGLE_MAPS_API_KEY to your environment</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", zIndex: 0, isolation: "isolate" }}>
      <div ref={containerRef} style={{ height: 600, width: "100%", borderRadius: 16, overflow: "hidden" }} />
      {loading && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: "rgba(10,14,42,0.7)", backdropFilter: "blur(4px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 12, pointerEvents: "none",
        }}>
          <div style={{
            width: 36, height: 36,
            border: "3px solid #1a2060", borderTop: "3px solid #4ef5f1",
            borderRadius: "50%", animation: "mapspin 0.8s linear infinite",
          }} />
          <p style={{ color: "#4ef5f1", fontSize: 13, margin: 0 }}>
            {resolved > 0 ? `Placing pins… ${resolved} / ${properties.length}` : "Loading map…"}
          </p>
        </div>
      )}
      <style>{`@keyframes mapspin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PropertyMap;
