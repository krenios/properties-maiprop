import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

delete (L.Icon.Default.prototype as any)._getIconUrl;

const cyanMarker = L.divIcon({
  className: "",
  html: `<div style="
    width:28px;height:28px;background:#4ef5f1;
    border:3px solid #000014;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 0 0 3px rgba(78,245,241,0.25),0 4px 12px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -32],
});

const CACHE_KEY = "maiprop_geocache_v1";
function loadCache(): Record<string, [number, number]> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(c: Record<string, [number, number]>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}
async function geocode(location: string): Promise<[number, number] | null> {
  try {
    const q = encodeURIComponent(`${location}, Greece`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=gr`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data?.[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return null;
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface Props { properties: Property[]; }

const PropertyMap = ({ properties }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  // Track which IDs have already been geocoded so re-renders don't restart the loop
  const geocodedIdsRef = useRef<string>("");
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(0);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [37.9838, 23.7275],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; layerRef.current = null; };
  }, []);

  // ── Geocode & place markers — only when the set of property IDs changes ────
  useEffect(() => {
    if (!properties.length || !mapRef.current || !layerRef.current) return;

    // Stable ID fingerprint — skip if properties didn't actually change
    const ids = properties.map((p) => p.id).join(",");
    if (ids === geocodedIdsRef.current) return;
    geocodedIdsRef.current = ids;

    const layer = layerRef.current;
    layer.clearLayers();
    setResolved(0);
    setLoading(true);

    // snapshot so closure is stable
    const snapshot = [...properties];
    let active = true;

    (async () => {
      const cache = loadCache();
      let apiCalls = 0;

      for (const p of snapshot) {
        if (!active) break;
        const key = p.location?.trim().toLowerCase();
        if (!key) { setResolved((n) => n + 1); continue; }

        let coords: [number, number] | null = cache[key] ?? null;

        if (!coords) {
          if (apiCalls > 0) await sleep(1100);
          coords = await geocode(p.location);
          apiCalls++;
          if (coords) { cache[key] = coords; saveCache(cache); }
        }

        if (!active) break;

        if (coords) {
          const img = p.images?.[0]
            ? `<img src="${optimizeImage(p.images[0], { width: 220, height: 130 })}" style="width:100%;height:120px;object-fit:cover;display:block;"/>`
            : "";
          const price = p.price
            ? `<span style="color:#4ef5f1;font-size:15px;font-weight:700;">€${p.price.toLocaleString()}</span>`
            : "";

          L.marker(coords, { icon: cyanMarker })
            .bindPopup(
              `<div style="width:220px;background:#0a0e2a;font-family:'Inter',sans-serif;">
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
              { maxWidth: 220, minWidth: 220, className: "maiprop-popup" }
            )
            .addTo(layer);
        }

        setResolved((n) => n + 1);
      }

      if (active) setLoading(false);
    })();

    return () => { active = false; };
  }, [properties]);

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
