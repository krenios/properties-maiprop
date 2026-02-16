import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const bullets = [
"Pre-verified properties with full compliance",
"Self-assessment platform for independent analysis",
"Full visa support from investment to approval"];


const ContactSection = () =>
<section id="contact" className="relative overflow-hidden bg-section-deep py-28">
    {/* Dramatic glow effects */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
    <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[100px]" />

    <div className="relative container mx-auto px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" /> Start Your Application
        </div>
        <h2 className="text-1xl font-bold sm:text-1xl lg:text-6x4">
          Begin Your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Golden Visa
          </span>{" "}
          Journey
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-center text-sm">
          Connect with us for your Golden Visa on WhatsApp for instant guidance.
        </p>

        <div className="my-10 gap-4 flex-row flex items-center justify-center shadow-sm rounded-xl">
          {bullets.map((b) =>
        <div key={b} className="gap-3 text-sm flex-row flex items-center justify-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-muted-foreground">{b}</span>
            </div>
        )}
        </div>

        <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-12 text-lg font-semibold text-primary-foreground shadow-[0_0_40px_hsl(179_90%_63%/0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_60px_hsl(179_90%_63%/0.6)]">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp <ArrowRight className="h-5 w-5" />
          </a>
        </Button>
        


      </div>
    </div>
  </section>;


export default ContactSection;