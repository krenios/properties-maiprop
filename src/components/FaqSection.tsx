import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const faqs = [
  {
    q: "What is the minimum investment for a Greek Golden Visa?",
    a: "The minimum investment for a Greek Golden Visa is €250,000 in qualifying real estate. mAI Investments offers pre-verified properties starting at this threshold, covering Athens, Piraeus, Glyfada, and the Athenian Riviera.",
  },
  {
    q: "How long does the Greek Golden Visa process take?",
    a: "The Greek Golden Visa process typically takes 6–9 months from initial consultation to residency permit approval, including property purchase, legal registration, and biometrics appointment.",
  },
  {
    q: "Which countries can I access with a Greek Golden Visa?",
    a: "A Greek Golden Visa grants the right to live in Greece and travel freely across all 27 Schengen Area countries without additional visas.",
  },
  {
    q: "Can I rent out my Golden Visa property?",
    a: "Yes. Golden Visa properties in Greece can be rented out. mAI Investments' portfolio targets average yields of 5–7% annually through short-term and long-term rental strategies.",
  },
  {
    q: "Do I need to live in Greece to keep the Golden Visa?",
    a: "No. The Greek Golden Visa does not require a minimum stay in Greece. You can maintain the residency permit simply by keeping the qualifying real estate investment.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-background py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
              <HelpCircle className="mr-1 h-3 w-3" /> FAQ
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to know about the Greek Golden Visa program and investing with mAI.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="stagger">
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <RevealItem key={i}>
                <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
                  <button
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <span className="font-medium">{faq.q}</span>
                    {open === i
                      ? <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                      : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  </button>
                  {open === i && (
                    <div className="border-t border-border/50 px-5 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </div>
              </RevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FaqSection;
