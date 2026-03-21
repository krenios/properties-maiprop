import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";

// Fix default marker icons for Vite bundling
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Property coordinates by location name
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
  // Try exact match first
  if (LOCATION_COORDS[location]) return LOCATION_COORDS[location];
  // Try partial match
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (location.toLowerCase().includes(key.toLowerCase())) return coords;
  }
  // Default to Athens centre
  return [37.9838, 23.7275];
}

interface Props {
  properties: Property[];
}

const PropertyMap = ({ properties }: Props) => {
  return (
    <MapContainer
      center={[37.9838, 23.7275]}
      zoom={11}
      className="h-[600px] w-full rounded-2xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((p) => (
        <Marker key={p.id} position={getCoords(p.location)}>
          <Popup>
            <div className="min-w-[180px]">
              {p.images?.[0] && (
                <img
                  src={optimizeImage(p.images[0], { width: 200, height: 130 })}
                  alt={p.title}
                  className="mb-2 h-24 w-full rounded-lg object-cover"
                />
              )}
              <p className="font-semibold text-sm leading-snug">{p.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.location}</p>
              {p.price && <p className="text-sm font-bold text-blue-600 mt-1">€{p.price.toLocaleString()}</p>}
              <a href={`/property/${p.id}`} className="mt-2 block text-xs text-blue-500 hover:underline">View property →</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;
