import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoldenVisaStats from "@/components/GoldenVisaStats";
import InvestmentOpportunities from "@/components/InvestmentOpportunities";
import DeliveredProjects from "@/components/DeliveredProjects";
import ValueSection from "@/components/ValueSection";
import PlatformReference from "@/components/PlatformReference";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <GoldenVisaStats />
    <InvestmentOpportunities />
    <DeliveredProjects />
    <ValueSection />
    <PlatformReference />
    <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} MaiProp. All rights reserved.
    </footer>
    <WhatsAppButton />
  </main>
);

export default Index;
