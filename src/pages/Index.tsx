import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoldenVisaStats from "@/components/GoldenVisaStats";
import SectionDivider from "@/components/SectionDivider";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadCaptureBot from "@/components/LeadCaptureBot";
import CookieConsent from "@/components/CookieConsent";

// Lazy-load below-the-fold sections
const InvestmentOpportunities = lazy(() => import("@/components/InvestmentOpportunities"));
const DeliveredProjects = lazy(() => import("@/components/DeliveredProjects"));
const ValueSection = lazy(() => import("@/components/ValueSection"));
const PlatformReference = lazy(() => import("@/components/PlatformReference"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () =>
<main className="min-h-screen bg-background overflow-x-hidden" role="main" itemScope itemType="https://schema.org/WebPage">
    <LeadCaptureBot>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <GoldenVisaStats />
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <InvestmentOpportunities />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <DeliveredProjects />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <PlatformReference />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ValueSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <JourneySection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ContactSection />
      </Suspense>
      <footer className="border-t border-border bg-background text-center py-[12px]" role="contentinfo">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-6">
            
            
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} mAI Prop. All rights reserved.
          </p>
        </div>
      </footer>
      <WhatsAppButton />
      <CookieConsent />
    </LeadCaptureBot>
  </main>;

export default Index;
