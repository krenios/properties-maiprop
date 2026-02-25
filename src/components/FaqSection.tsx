import { useState } from "react";
import { ChevronDown, HelpCircle, Home, Clock, Globe, TrendingUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    icon: Home,
    q: "What is the minimum investment for a Greek Golden Visa?",
    a: "The minimum investment for a Greek Golden Visa is €250,000 in qualifying real estate. mAI Investments offers pre-verified properties starting at this threshold, covering Athens, Piraeus, Glyfada, and the Athenian Riviera.",
    category: "Investment",
  },
  {
    icon: Clock,
    q: "How long does the Greek Golden Visa process take?",
    a: "The Greek Golden Visa process typically takes 6–9 months from initial consultation to residency permit approval, including property purchase, legal registration, and biometrics appointment.",
    category: "Timeline",
  },
  {
    icon: Globe,
    q: "Which countries can I access with a Greek Golden Visa?",
    a: "A Greek Golden Visa grants the right to live in Greece and travel freely across all 27 Schengen Area countries without additional visas.",
    category: "Benefits",
  },
  {
    icon: TrendingUp,
    q: "Can I rent out my Golden Visa property?",
    a: "Yes. Golden Visa properties in Greece can be rented out. mAI Investments' portfolio is specifically designed for rental income — properties are sourced, renovated, and stabilised with tenants in place, targeting average net yields of 5–7% annually through a mix of short-term and long-term rental strategies.",
    category: "Returns",
  },
  {
    icon: ShieldCheck,
    q: "Do I need to live in Greece to keep the Golden Visa?",
    a: "No. The Greek Golden Visa does not require a minimum stay in Greece. You can maintain the residency permit simply by keeping the qualifying real estate investment.",
    category: "Residency",
  },
];

const categoryColors: Record<string, string> = {
  Investment: "bg-primary/10 text-primary border-primary/20",
  Timeline: "bg-secondary/10 text-secondary border-secondary/20",
  Benefits: "bg-accent/10 text-accent-foreground border-accent/20",
  Returns: "bg-primary/10 text-primary border-primary/20",
  Residency: "bg-secondary/10 text-secondary border-secondary/20",
};

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
            {faqs.map((faq, i) => {
              const Icon = faq.icon;
              const isOpen = open === i;
              return (
                <RevealItem key={i}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-primary/40 bg-card shadow-lg shadow-primary/5"
                        : "border-border bg-card hover:border-primary/20"
                    }`}
                  >
                    <button
                      className="flex w-full items-center gap-4 p-5 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {/* Icon bubble */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryColors[faq.category]}`}>
                            {faq.category}
                          </span>
                        </div>
                        <span className="font-medium leading-snug">{faq.q}</span>
                      </div>

                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="border-t border-border/50 px-5 pb-5 pt-4 pl-[72px]">
                            <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FaqSection;
