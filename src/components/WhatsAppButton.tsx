import { MessageCircle, Mail } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/306971853470?text=Hello!%20I%20would%20like%20to%20explore%20investment%20opportunities%20under%20the%20Greek%20Golden%20Visa%20program.%0A%0APlease%20share%20the%20following%20details:%0A%0A1.%20Full%20Name:%0A2.%20Phone%20(International%20format):%0A3.%20Email:%0A4.%20Nationality%20(Country%20of%20citizenship):%0A5.%20Investment%20Budget%20(in%20EUR%20-%20minimum%20250,000):%0A6.%20Preferred%20Property%20Location:%0A7.%20Property%20Type%20(Apartment/Villa):%0A8.%20When%20are%20you%20planning%20to%20invest?%20(0-6%20months%20//%206-12%20months): ";

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
