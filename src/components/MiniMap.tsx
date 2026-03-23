import { MapPin, ExternalLink } from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyD42TB3L5KeQfvqOu6NfelXL5EOVNzz_cY";

interface Props {
  location: string;
  height?: number;
  showFooter?: boolean;
}

const MiniMap = ({ location, height = 200, showFooter = true }: Props) => {
  const query = encodeURIComponent(`${location}, Greece`);
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=${query}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${location}`}
      />
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
