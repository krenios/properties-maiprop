import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlatformReference = () => (
  <section id="platform" className="border-t border-border py-20">
    <div className="container mx-auto flex flex-col items-center px-6 text-center">
      <span className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">Self-Service Tool</span>
      <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
        Assess Opportunities <span className="text-primary">Independently</span>
      </h2>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Use our data platform to evaluate investment fundamentals, market trends & neighborhood insights on your own terms.
      </p>
      <Button asChild variant="outline" size="lg" className="mt-8 gap-2 rounded-full border-primary/30 text-primary hover:bg-primary/10">
        <a href="https://os.maiprop.co" target="_blank" rel="noopener noreferrer">
          Explore os.maiprop.co <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  </section>
);

export default PlatformReference;
