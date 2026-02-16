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

const Index = () =>
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
    <footer className="border-t border-border bg-section-deep text-center py-[12px]">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-6">
          
          
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} mAI Prop. All rights reserved.
        </p>
      </div>
    </footer>
    <WhatsAppButton />
  </main>;


export default Index;