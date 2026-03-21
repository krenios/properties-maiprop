import { X, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/data/properties";
import { optimizeImage } from "@/lib/optimizeImage";
import { Link } from "react-router-dom";

interface Props {
  selected: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CompareBar = ({ selected, onRemove, onClear }: Props) => {
  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <ArrowLeftRight className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Compare ({selected.length}/3)</span>
          </div>

          <div className="flex flex-1 gap-3 overflow-x-auto py-1">
            {selected.map((p) => (
              <div key={p.id} className="relative flex shrink-0 items-center gap-2 rounded-xl border border-border/60 bg-muted/40 p-2 pr-7">
                {p.images?.[0] && (
                  <img
                    src={optimizeImage(p.images[0], { width: 80, height: 60 })}
                    alt={p.title}
                    className="h-10 w-14 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="max-w-[120px] truncate text-xs font-semibold">{p.title}</p>
                  {p.price && <p className="text-xs text-primary">€{p.price.toLocaleString()}</p>}
                </div>
                <button
                  onClick={() => onRemove(p.id)}
                  className="absolute right-1.5 top-1.5 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 3 - selected.length }).map((_, i) => (
              <div key={i} className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-border/40 text-xs text-muted-foreground">
                + Add property
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {selected.length >= 2 && (
              <Link
                to={`/compare?ids=${selected.map((p) => p.id).join(",")}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Compare Now
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground">
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
