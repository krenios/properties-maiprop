import { lazy, Suspense, useEffect } from "react";
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
const FaqSection = lazy(() => import("@/components/FaqSection"));
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum investment for a Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum investment for a Greek Golden Visa is €250,000 in qualifying real estate. mAI Investments offers pre-verified properties starting at this threshold, covering Athens, Piraeus, Glyfada, and the Athenian Riviera.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the Greek Golden Visa process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Greek Golden Visa process typically takes 6–9 months from initial consultation to residency permit approval, including property purchase, legal registration, and biometrics appointment.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries can I access with a Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Greek Golden Visa grants the right to live in Greece and travel freely across all 27 Schengen Area countries without additional visas.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rent out my Golden Visa property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Golden Visa properties in Greece can be rented out. mAI Investments' portfolio is specifically designed for rental income — properties are sourced, renovated, and stabilised with tenants in place, targeting average net yields of 3–5% annually through a mix of mid-term and long-term rental strategies.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to live in Greece to keep the Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Greek Golden Visa does not require a minimum stay in Greece. You can maintain the residency permit simply by keeping the qualifying real estate investment.",
      },
    },
  ],
};

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Use a fixed delay to allow all lazy sections to render before scrolling
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
  <main
    className="min-h-screen bg-background overflow-x-hidden"
    role="main"
    itemScope
    itemType="https://schema.org/WebPage"
  >
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <LeadBotProvider>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <GoldenVisaStats />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[1200px]" />}>
        <InvestmentOpportunities />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <DeliveredProjects />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <PlatformReference />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <ValueSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <JourneySection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <FaqSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <ContactSection />
      </Suspense>
      <footer className="border-t border-border bg-background text-center py-[12px]" role="contentinfo">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/maiprop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/maipropos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/mai-prop/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@maipropos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} mAI Prop. All rights reserved.</p>
        </div>
      </footer>
      <Suspense fallback={null}>
        <LeadCaptureBot />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </LeadBotProvider>
  </main>
  );
};

export default Index;
