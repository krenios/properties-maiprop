import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoldenVisaStats from "@/components/GoldenVisaStats";
import InvestmentOpportunities from "@/components/InvestmentOpportunities";
import DeliveredProjects from "@/components/DeliveredProjects";
import ValueSection from "@/components/ValueSection";
import PlatformReference from "@/components/PlatformReference";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import brandLogo1 from "@/assets/brand-1.png";
import brandLogo2 from "@/assets/brand-2.png";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <GoldenVisaStats />
    <InvestmentOpportunities />
    <DeliveredProjects />
    <PlatformReference />
    <ValueSection />
    <JourneySection />
    <ContactSection />
    <footer className="border-t border-border bg-section-deep py-12 text-center">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-6">
          <img src={brandLogo1} alt="MaiProp" className="h-8 w-auto brightness-0 invert" />
          <img src={brandLogo2} alt="MaiProp OS" className="h-8 w-auto brightness-0 invert" />
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MaiProp. All rights reserved.
        </p>
      </div>
    </footer>
    <WhatsAppButton />
  </main>
);

export default Index;
