import { ArrowRight, Check, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

const WHATSAPP_URL = "https://wa.me/306971853470?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const bullets = [
"Pre-verified properties with full compliance",
"Self-assessment platform for independent analysis",
"Full visa support from investment to approval"];

const ContactSection = () =>
<section id="contact" className="relative overflow-hidden bg-section-deep py-16 sm:py-28">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
    <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[100px]" />

    <div className="relative container mx-auto px-6">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Start Your Application
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Begin Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Golden Visa
            </span>{" "}
            Journey
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-center text-sm">
            Connect with us for your Golden Visa on WhatsApp for instant guidance.
          </p>

          <div className="my-8 sm:my-10 gap-3 flex flex-col items-start sm:flex-row sm:items-center sm:justify-center sm:gap-4 rounded-xl">
            {bullets.map((b) =>
          <div key={b} className="gap-2 text-sm flex items-center">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground text-left">{b}</span>
              </div>
          )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 sm:px-12 text-base sm:text-lg font-semibold text-primary-foreground shadow-[0_0_40px_hsl(179_90%_63%/0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_60px_hsl(179_90%_63%/0.6)] w-full sm:w-auto">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Continue on WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-full border-border/50 bg-background/20 px-8 sm:px-12 text-base sm:text-lg font-semibold backdrop-blur-sm w-full sm:w-auto">
              <a href="mailto:kr@maiprop.co">
                <Mail className="h-5 w-5" /> Mail Us
              </a>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>;

export default ContactSection;
