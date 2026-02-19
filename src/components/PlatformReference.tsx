import { Search, BarChart3, ShieldCheck, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandOs from "@/assets/brand-os.png";
import { ScrollReveal } from "./ScrollReveal";

const tools = [
{ icon: Search, title: "Self-Service Property Search", desc: "AI-powered platform to browse and filter Golden Visa properties" },
{ icon: BarChart3, title: "Complete Data Transparency", desc: "Access market data, valuations, and historical trends" },
{ icon: LineChart, title: "Instant ROI Calculators", desc: "Model rental income, appreciation, and total returns" },
{ icon: ShieldCheck, title: "Visa Eligibility Checker", desc: "Instantly verify property Golden Visa qualification" }];


const platformMessage = [
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
const PLATFORM_URL = `https://wa.me/306971853470?text=${encodeURIComponent(platformMessage)}`;

const PlatformReference = () => {
  return null;
};

export default PlatformReference;