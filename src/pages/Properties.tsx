import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useProperties } from "@/contexts/PropertyContext";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight } from "lucide-react";

const BASE_URL = "https://properties.maiprop.co";

const whatsappMessage = [
  "Hello! I would like to explore investment opportunities under the Greek Golden Visa program.",
  "",
  "Please share the following details:",
  "",
  "1. Full Name:",
  "2. Phone (International format):",
  "3. Email:",
  "4. Nationality (Country of citizenship):",
  "5. Investment Budget (in EUR - minimum 250000):",
  "6. Preferred Property Location:",
  "7. Property Type (Apartment or Villa):",
  "8. When are you planning to invest (0-6 months or 6-12 months):",
].join("\n");
const WHATSAPP_URL = `https://wa.me/306971853470?text=${encodeURIComponent(whatsappMessage)}`;

const Properties = () => {
  const { properties } = useProperties();
  const [selected, setSelected] = useState<Property | null>(null);
  const current = properties.filter((p) => p.project_type === "new");

  // Open property modal from hash link (e.g. #property-uuid)
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#property-")) return;
      const id = hash.replace("#property-", "");
      const found = current.find((p) => p.id === id);
      if (found) setSelected(found);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [current]);

  return (
    <>
      <Helmet>
        <title>Golden Visa Eligible Properties — mAI Investments</title>
        <meta
          name="description"
          content="Browse all Golden Visa eligible properties in Athens, Piraeus, and the Greek Riviera. Pre-verified, fully compliant, and investment-ready from €250,000."
        />
        <link rel="canonical" href={`${BASE_URL}/properties`} />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar forceScrolled />

        {/* Breadcrumb */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 pt-20 pb-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-40" />
              <span className="text-foreground font-medium">Properties</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-12 pb-16">
          <div className="container mx-auto px-6 text-center">
            <ScrollReveal>
              <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
                <Home className="mr-1 h-3 w-3" /> Golden Visa Eligible Properties
              </Badge>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Visa-Ready Real Estate Portfolio
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                Pre-verified Golden Visa properties with full compliance — analyze and compare
                independently. All properties qualify for the Greek Golden Visa program.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Full grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            {current.length === 0 ? (
              <p className="text-center text-muted-foreground">No properties available at the moment.</p>
            ) : (
              <ScrollReveal variant="stagger">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {current.map((p) => (
                    <RevealItem key={p.id}>
                      <PropertyCard property={p} onClick={() => setSelected(p)} />
                    </RevealItem>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* CTA */}
            <ScrollReveal>
              <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                <h2 className="mb-2 text-2xl font-bold">Looking for something specific?</h2>
                <p className="mb-6 text-muted-foreground">
                  Our team sources off-market opportunities tailored to your budget and timeline.
                </p>
                <Button asChild size="lg">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Speak to an Advisor
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <PropertyModal property={selected} open={!!selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Properties;
