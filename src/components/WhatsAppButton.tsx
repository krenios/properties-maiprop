import { MessageCircle, Mail } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/306971853470?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const WhatsAppButton = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
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
