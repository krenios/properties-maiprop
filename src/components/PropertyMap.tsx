import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

delete (L.Icon.Default.prototype as any)._getIconUrl;

const cyanMarker = L.divIcon({
  className: "",
  html: `<div style="
    width:28px;height:28px;
    background:#4ef5f1;
    border:3px solid #000014;
    border-radius:50% 50% 50% 0;
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
function saveCache(cache: Record<string, [number, number]>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

async function geocode(location: string): Promise<[number, number] | null> {
  const query = encodeURIComponent(`${location}, Greece`);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=gr`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return null;
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

interface Props {
  properties: Property[];
}

const PropertyMap = ({ properties }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolved, setResolved] = useState(0);

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
    mapRef.current = map;

    const addMarker = (p: Property, coords: [number, number]) => {
      const img = p.images?.[0]
        ? `<img src="${optimizeImage(p.images[0], { width: 220, height: 130 })}" style="width:100%;height:120px;object-fit:cover;display:block;" />`
        : "";
      const price = p.price
        ? `<span style="color:#4ef5f1;font-size:15px;font-weight:700;">€${p.price.toLocaleString()}</span>`
        : "";
      const html = `
        <div style="width:220px;background:#0a0e2a;font-family:'Inter',sans-serif;">
          ${img}
          <div style="padding:12px 14px 14px;">
            <p style="margin:0 0 3px;color:#e8f0ff;font-size:13px;font-weight:600;line-height:1.3;">${p.title}</p>
            <p style="margin:0 0 8px;color:#5a6a8a;font-size:11px;">${p.location}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              ${price}
              <a href="/property/${p.id}" style="background:#4ef5f1;color:#000014;font-size:11px;font-weight:700;padding:5px 10px;border-radius:5px;text-decoration:none;">View →</a>
            </div>
          </div>
        </div>`;
      L.marker(coords, { icon: cyanMarker })
        .bindPopup(html, { maxWidth: 220, minWidth: 220, className: "maiprop-popup" })
        .addTo(map);
    };

    // Geocode all properties: use cache, then Nominatim with 1s rate limit
    (async () => {
      const cache = loadCache();
      let count = 0;

      for (const p of properties) {
        if (!mapRef.current) break;
        const key = p.location?.trim().toLowerCase();
        if (!key) continue;

        let coords: [number, number] | null = cache[key] ?? null;

        if (!coords) {
          if (count > 0) await sleep(1100); // Nominatim: max 1 req/s
          coords = await geocode(p.location);
          if (coords) {
            cache[key] = coords;
            saveCache(cache);
          }
          count++;
        }

        if (coords && mapRef.current) {
          addMarker(p, coords);
          setResolved((n) => n + 1);
        }
      }

      setLoading(false);
    })();

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 0, isolation: "isolate" }}>
      <div ref={containerRef} style={{ height: 600, width: "100%", borderRadius: 16, overflow: "hidden" }} />
      {loading && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: "rgba(10,14,42,0.75)", backdropFilter: "blur(4px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 12, pointerEvents: "none",
        }}>
          <div style={{
            width: 36, height: 36, border: "3px solid #1a2060",
            borderTop: "3px solid #4ef5f1", borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <p style={{ color: "#4ef5f1", fontSize: 13, margin: 0 }}>
            Locating properties{resolved > 0 ? ` · ${resolved} / ${properties.length}` : "…"}
          </p>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PropertyMap;
