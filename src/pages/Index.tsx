import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import { LeadBotProvider } from "@/components/LeadBotProvider";

const CookieConsent = lazy(() => import("@/components/CookieConsent"));

// Lazy-load below-the-fold sections
const GoldenVisaStats = lazy(() => import("@/components/GoldenVisaStats"));
const InvestmentOpportunities = lazy(() => import("@/components/InvestmentOpportunities"));
const DeliveredProjects = lazy(() => import("@/components/DeliveredProjects"));
const ValueSection = lazy(() => import("@/components/ValueSection"));
const PlatformReference = lazy(() => import("@/components/PlatformReference"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const Index = () =>
<main className="min-h-screen bg-background overflow-x-hidden" role="main" itemScope itemType="https://schema.org/WebPage">
    <LeadBotProvider>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <GoldenVisaStats />
      </Suspense>
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
      <Suspense fallback={null}>
        <LeadCaptureBot />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </LeadBotProvider>
  </main>;

export default Index;
