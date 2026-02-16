import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const HeroSection = () => (
  <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
    {/* Gradient orbs */}
    <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[120px]" />

    <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
      Greek Golden Visa
    </span>
    <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
      Your Gateway to{" "}
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        European Residency
      </span>
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
      Curated real estate investments in Athens — deal origination, due diligence & asset management under one roof.
    </p>
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Speak to an Advisor <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full border-border px-8">
        <a href="#opportunities">View Opportunities</a>
      </Button>
    </div>
  </section>
);

export default HeroSection;
