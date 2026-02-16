import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const bullets = [
  "Pre-verified properties with full compliance",
  "Self-assessment platform for independent analysis",
  "Full visa support from investment to approval",
];

const ContactSection = () => (
  <section id="contact" className="relative py-24">
    <div className="pointer-events-none absolute right-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[140px]" />
    <div className="relative container mx-auto px-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center backdrop-blur">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Start Your Application
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">Begin Your Golden Visa Journey</h2>
        <p className="mt-3 text-muted-foreground">
          Connect with our Golden Visa specialists on WhatsApp for instant guidance.
        </p>

        <div className="my-8 flex flex-col items-start gap-3 text-left sm:items-center">
          {bullets.map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-primary" /> {b}
            </div>
          ))}
        </div>

        <Button asChild size="lg" className="gap-2 rounded-full px-10">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Click to open WhatsApp and chat with our team instantly
        </p>
      </div>
    </div>
  </section>
);

export default ContactSection;
