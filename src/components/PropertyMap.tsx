import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

// Fix default marker icons for Vite bundling
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LOCATION_COORDS: Record<string, [number, number]> = {
  "Athens": [37.9838, 23.7275],
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
};

function getCoords(location: string): [number, number] {
  if (LOCATION_COORDS[location]) return LOCATION_COORDS[location];
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (location?.toLowerCase().includes(key.toLowerCase())) return coords;
  }
  return [37.9838, 23.7275];
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
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    properties.forEach((p) => {
      const coords = getCoords(p.location);
      const imgHtml = p.images?.[0]
        ? `<img src="${optimizeImage(p.images[0], { width: 200, height: 130 })}" style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:6px;display:block;" />`
        : "";
      const popup = L.popup({ maxWidth: 200 }).setContent(`
        <div style="min-width:170px;font-family:sans-serif;">
          ${imgHtml}
          <p style="margin:0 0 2px;font-weight:600;font-size:13px;line-height:1.3;">${p.title}</p>
          <p style="margin:0 0 3px;font-size:11px;color:#666;">${p.location}</p>
          ${p.price ? `<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#2563eb;">€${p.price.toLocaleString()}</p>` : ""}
          <a href="/property/${p.id}" style="font-size:11px;color:#3b82f6;text-decoration:none;">View property →</a>
        </div>
      `);
      L.marker(coords).bindPopup(popup).addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: 600, width: "100%", borderRadius: 16, overflow: "hidden" }}
    />
  );
};

export default PropertyMap;
