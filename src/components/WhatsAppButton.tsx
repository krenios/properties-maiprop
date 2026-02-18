import { MessageCircle, Mail } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/306971853470?text=" + encodeURIComponent("Hello! I would like to explore investment opportunities under the Greek Golden Visa program.\n\nPlease kindly share the following details:\n\n1. Full Name:\n2. Phone (International format starting with +):\n3. Email:\n4. Nationality (Country of citizenship):\n5. Investment Budget (in EUR - minimum 250,000):\n6. Preferred Property Location:\n7. Property Type (Apartment/Villa):\n8. Planned Investment Timeline (0-6 months / 6-12 months):");

const WhatsAppButton = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 max-sm:bottom-3 max-sm:right-3 max-sm:scale-90">
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg transition-transform hover:scale-110 animate-pulse-glow"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
    <a
      href="mailto:kr@maiprop.co"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      aria-label="Contact via Email"
    >
      <Mail className="h-7 w-7" />
    </a>
  </div>
);

export default WhatsAppButton;
