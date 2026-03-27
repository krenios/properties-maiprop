import { useSearchParams } from "react-router-dom";
import { useProperties } from "@/contexts/PropertyContext";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { optimizeImage } from "@/lib/optimizeImage";
import { MapPin, Bed, Maximize, TrendingUp, Building, Calendar } from "lucide-react";
import { useLeadBot } from "@/components/LeadBotProvider";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getEffectiveStatus, STATUS_PILL_CLASSES } from "@/lib/propertyMeta";

const statusColors: Record<string, string> = STATUS_PILL_CLASSES;

const Compare = () => {
  const [params] = useSearchParams();
  const ids = params.get("ids")?.split(",") ?? [];
  const { properties } = useProperties();
  const { openWithLocation } = useLeadBot();
  const selected = properties.filter((p) => ids.includes(p.id)).slice(0, 3);

  const rows = [
    { label: "Location", render: (p: any) => <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />{p.location}</span> },
    { label: "Price", render: (p: any) => <span className="font-bold text-primary">{p.price ? `€${p.price.toLocaleString()}` : "TBD"}</span> },
    { label: "Size", render: (p: any) => p.size ? `${p.size} m²` : "—" },
    { label: "Bedrooms", render: (p: any) => p.bedrooms ? `${p.bedrooms} BR` : "—" },
    { label: "Floor", render: (p: any) => p.floor ? `Floor ${p.floor}` : "—" },
    { label: "Year Built", render: (p: any) => p.construction_year ?? "—" },
    { label: "Status", render: (p: any) => {
      const s = getEffectiveStatus(p.status);
      return s ? <Badge className={`border ${statusColors[s] || ""}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</Badge> : "—";
    } },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Compare Properties | mAI Investments</title></Helmet>
      <Navbar forceScrolled />
      <main className="container mx-auto max-w-5xl px-4 pt-24 pb-16">
        <h1 className="text-2xl font-bold mb-8">Property Comparison</h1>
        {selected.length < 2 ? (
          <p className="text-muted-foreground">Select at least 2 properties to compare. <a href="/properties" className="text-primary hover:underline">Browse properties →</a></p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-32 p-3 text-left text-sm font-medium text-muted-foreground" />
                  {selected.map((p) => (
                    <th key={p.id} className="p-3 text-left">
                      <a href={`/property/${p.id}`} className="block">
                        {p.images?.[0] && (
                          <img src={optimizeImage(p.images[0], { width: 300, height: 200 })} alt={p.title} className="mb-2 h-32 w-full rounded-xl object-cover" />
                        )}
                        <p className="text-sm font-semibold hover:text-primary transition-colors">{p.title}</p>
                      </a>
                      <Button size="sm" className="mt-3 w-full gap-1.5 rounded-full text-xs" onClick={() => openWithLocation(p.location)}>
                        <MessageCircle className="h-3.5 w-3.5" /> Inquire
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-muted/10" : ""}>
                    <td className="p-3 text-sm font-medium text-muted-foreground">{row.label}</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 text-sm">{row.render(p)}</td>
                    ))}
                    {/* Empty cells if fewer than 3 */}
                    {Array.from({ length: 3 - selected.length }).map((_, j) => (
                      <td key={j} className="p-3" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compare;
