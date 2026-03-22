import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

delete (L.Icon.Default.prototype as any)._getIconUrl;

// Cyan teardrop marker matching site accent colour
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

const LOCATION_COORDS: Record<string, [number, number]> = {
  "Athens": [37.9838, 23.7275],
  "Athens Center": [37.9838, 23.7275],
  "Athens centre": [37.9838, 23.7275],
  "City Center": [37.9838, 23.7275],
  "Piraeus": [37.9482, 23.6479],
  "Glyfada": [37.8783, 23.7516],
  "Voula": [37.8490, 23.7820],
  "Vouliagmeni": [37.8163, 23.7828],
  "Vari": [37.8300, 23.8000],
  "Alimos": [37.9082, 23.7195],
  "Kallithea": [37.9563, 23.7032],
  "Kifisia": [38.0736, 23.8128],
  "Kolonaki": [37.9791, 23.7430],
  "Nea Smyrni": [37.9440, 23.7162],
  "Paleo Faliro": [37.9239, 23.7025],
  "Palaio Faliro": [37.9239, 23.7025],
  "Faliro": [37.9239, 23.7025],
  "Marousi": [38.0502, 23.8075],
  "Maroussi": [38.0502, 23.8075],
  "Chalandri": [38.0207, 23.7982],
  "Psychiko": [37.9985, 23.7697],
  "Filothei": [38.0001, 23.7650],
  "Pangrati": [37.9712, 23.7510],
  "Exarchia": [37.9880, 23.7329],
  "Monastiraki": [37.9762, 23.7248],
  "Plaka": [37.9721, 23.7293],
  "Thissio": [37.9762, 23.7187],
  "Petralona": [37.9677, 23.7149],
  "Koukaki": [37.9623, 23.7256],
  "Neos Kosmos": [37.9527, 23.7361],
  "Dafni": [37.9446, 23.7455],
  "Ilioupoli": [37.9318, 23.7601],
  "Agios Dimitrios": [37.9355, 23.7270],
  "Vrilissia": [38.0396, 23.8268],
  "Halandri": [38.0207, 23.7982],
  "Ekali": [38.1134, 23.8326],
  "Dionysos": [38.1217, 23.8662],
  "Elliniko": [37.8901, 23.7417],
  "Argyroupoli": [37.9072, 23.7478],
  "Hellinikon": [37.8901, 23.7417],
};

function getCoords(location: string): [number, number] {
  if (!location) return [37.9838, 23.7275];
  if (LOCATION_COORDS[location]) return LOCATION_COORDS[location];
  const lower = location.toLowerCase();
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) return coords;
  }
  return [37.9838, 23.7275];
}

// Slightly offset markers sharing the same coords so they don't stack
function dedupe(properties: Property[]): Array<{ p: Property; coords: [number, number] }> {
  const seen: Record<string, number> = {};
  return properties.map((p) => {
    const base = getCoords(p.location);
    const key = `${base[0]},${base[1]}`;
    const count = seen[key] ?? 0;
    seen[key] = count + 1;
    const offset = count * 0.003;
    return { p, coords: [base[0] + offset, base[1] + offset] as [number, number] };
  });
}

interface Props {
  properties: Property[];
}

const PropertyMap = ({ properties }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [37.9838, 23.7275],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    // Dark tiles matching site navy/black theme
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Zoom control bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    dedupe(properties).forEach(({ p, coords }) => {
      const img = p.images?.[0]
        ? `<img src="${optimizeImage(p.images[0], { width: 220, height: 130 })}"
             style="width:100%;height:120px;object-fit:cover;display:block;" />`
        : "";
      const price = p.price
        ? `<span style="color:#4ef5f1;font-size:15px;font-weight:700;">€${p.price.toLocaleString()}</span>`
        : "";

      const html = `
        <div style="width:220px;background:#0a0e2a;border-radius:0;overflow:hidden;font-family:'Inter',sans-serif;">
          ${img}
          <div style="padding:12px 14px 14px;">
            <p style="margin:0 0 3px;color:#e8f0ff;font-size:13px;font-weight:600;line-height:1.3;">${p.title}</p>
            <p style="margin:0 0 8px;color:#5a6a8a;font-size:11px;">${p.location}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              ${price}
              <a href="/property/${p.id}"
                 style="background:#4ef5f1;color:#000014;font-size:11px;font-weight:700;
                        padding:5px 10px;border-radius:5px;text-decoration:none;letter-spacing:0.3px;">
                View →
              </a>
            </div>
          </div>
        </div>`;

      L.marker(coords, { icon: cyanMarker })
        .bindPopup(html, { maxWidth: 220, minWidth: 220, className: "maiprop-popup" })
        .addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    // isolation:isolate creates a new stacking context at z-index 0
    // so Leaflet's internal z-indexes don't compete with the fixed LeadBot
    <div style={{ position: "relative", zIndex: 0, isolation: "isolate" }}>
      <div
        ref={containerRef}
        style={{ height: 600, width: "100%", borderRadius: 16, overflow: "hidden" }}
      />
    </div>
  );
};

export default PropertyMap;
