import { MessageCircle } from "lucide-react";

const message = [
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

const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=306971853470&text=${encodeURIComponent(message)}`;

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
  </div>
);

export default WhatsAppButton;
