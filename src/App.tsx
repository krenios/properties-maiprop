import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
import { LeadBotProvider } from "@/components/LeadBotProvider";

const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const Index = lazy(() => import("./pages/Index"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const GreekGoldenVisa = lazy(() => import("./pages/GreekGoldenVisa"));
const GreekGoldenVisaRequirements = lazy(() => import("./pages/GreekGoldenVisaRequirements"));
const GoldenVisa250k = lazy(() => import("./pages/GoldenVisa250k"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideArticle = lazy(() => import("./pages/GuideArticle"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Properties = lazy(() => import("./pages/Properties"));
const GoldenVisaJourney = lazy(() => import("./pages/GoldenVisaJourney"));
const ProcessPage = lazy(() => import("./pages/Process"));
// SEO Landing Pages
const BuyTheLifestyle = lazy(() => import("./pages/BuyTheLifestyle"));
const GreeceVsPortugalGoldenVisa = lazy(() => import("./pages/GreeceVsPortugalGoldenVisa"));
const GoldenVisaFamilyIncluded = lazy(() => import("./pages/GoldenVisaFamilyIncluded"));
const GoldenVisaRentalIncomeProperties = lazy(() => import("./pages/GoldenVisaRentalIncomeProperties"));
const GoldenVisaTaxBenefits = lazy(() => import("./pages/GoldenVisaTaxBenefits"));
const GoldenVisaForInvestors = lazy(() => import("./pages/GoldenVisaForInvestors"));
const GoldenVisaForHighNetWorth = lazy(() => import("./pages/GoldenVisaForHighNetWorth"));
const GoldenVisaPropertyCompliance = lazy(() => import("./pages/GoldenVisaPropertyCompliance"));
const IsGoldenVisaWorthIt = lazy(() => import("./pages/IsGoldenVisaWorthIt"));
const GreeceVsDubaiGoldenVisa = lazy(() => import("./pages/GreeceVsDubaiGoldenVisa"));
const GoldenVisaForChineseInvestors = lazy(() => import("./pages/GoldenVisaForChineseInvestors"));
const GoldenVisaForUAEInvestors = lazy(() => import("./pages/GoldenVisaForUAEInvestors"));
const GoldenVisaForRussianInvestors = lazy(() => import("./pages/GoldenVisaForRussianInvestors"));
const GoldenVisaForTurkishInvestors = lazy(() => import("./pages/GoldenVisaForTurkishInvestors"));
const GoldenVisaByNationality = lazy(() => import("./pages/GoldenVisaByNationality"));
const Compare = lazy(() => import("./pages/Compare"));

const whatsappMessage = [
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
const WHATSAPP_URL = `https://wa.me/306971853470?text=${encodeURIComponent(whatsappMessage)}`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes — prevents refetch on every focus/mount
      gcTime: 10 * 60 * 1000,   // 10 minutes garbage collection
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

// Stable-height skeleton prevents CLS while lazy chunks load
const PageFallback = () => <div className="min-h-screen" aria-hidden="true" />;
const W = ({ c }: { c: React.ReactNode }) => <Suspense fallback={<PageFallback />}>{c}</Suspense>;

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform hover:scale-110 active:scale-95 max-sm:bottom-[4.5rem] max-sm:left-3"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <TranslationProvider>
          <PropertyProvider>
          <LeadBotProvider>
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<W c={<Index />} />} />
                <Route path="/property/:id" element={<W c={<PropertyPage />} />} />
                <Route path="/greek-golden-visa" element={<W c={<GreekGoldenVisa />} />} />
                <Route path="/greek-golden-visa/" element={<W c={<GreekGoldenVisa />} />} />
                <Route path="/greek-golden-visa-requirements" element={<W c={<GreekGoldenVisaRequirements />} />} />
                <Route path="/greek-golden-visa-requirements/" element={<W c={<GreekGoldenVisaRequirements />} />} />
                <Route path="/250k-golden-visa-properties" element={<W c={<GoldenVisa250k />} />} />
                <Route path="/250k-golden-visa-properties/" element={<W c={<GoldenVisa250k />} />} />
                <Route path="/guides" element={<W c={<Guides />} />} />
                <Route path="/guides/" element={<W c={<Guides />} />} />
                <Route path="/guides/:slug" element={<W c={<GuideArticle />} />} />
                <Route path="/guides/:slug/" element={<W c={<GuideArticle />} />} />
                <Route path="/portfolio" element={<W c={<Portfolio />} />} />
                <Route path="/portfolio/" element={<W c={<Portfolio />} />} />
                <Route path="/trackrecord" element={<W c={<Portfolio />} />} />
                <Route path="/trackrecord/" element={<W c={<Portfolio />} />} />
                <Route path="/properties" element={<W c={<Properties />} />} />
                <Route path="/properties/" element={<W c={<Properties />} />} />
                <Route path="/golden-visa-journey" element={<W c={<GoldenVisaJourney />} />} />
                <Route path="/golden-visa-journey/" element={<W c={<GoldenVisaJourney />} />} />
                <Route path="/process" element={<W c={<ProcessPage />} />} />
                <Route path="/process/" element={<W c={<ProcessPage />} />} />
                {/* SEO Landing Pages */}
                <Route path="/buy-the-lifestyle" element={<W c={<BuyTheLifestyle />} />} />
                <Route path="/buy-the-lifestyle/" element={<W c={<BuyTheLifestyle />} />} />
                <Route path="/greece-vs-portugal-golden-visa" element={<W c={<GreeceVsPortugalGoldenVisa />} />} />
                <Route path="/greece-vs-portugal-golden-visa/" element={<W c={<GreeceVsPortugalGoldenVisa />} />} />
                <Route path="/golden-visa-family-included" element={<W c={<GoldenVisaFamilyIncluded />} />} />
                <Route path="/golden-visa-family-included/" element={<W c={<GoldenVisaFamilyIncluded />} />} />
                <Route path="/golden-visa-rental-income-properties" element={<W c={<GoldenVisaRentalIncomeProperties />} />} />
                <Route path="/golden-visa-rental-income-properties/" element={<W c={<GoldenVisaRentalIncomeProperties />} />} />
                <Route path="/golden-visa-tax-benefits" element={<W c={<GoldenVisaTaxBenefits />} />} />
                <Route path="/golden-visa-tax-benefits/" element={<W c={<GoldenVisaTaxBenefits />} />} />
                <Route path="/golden-visa-for-investors" element={<W c={<GoldenVisaForInvestors />} />} />
                <Route path="/golden-visa-for-investors/" element={<W c={<GoldenVisaForInvestors />} />} />
                <Route path="/golden-visa-for-high-net-worth" element={<W c={<GoldenVisaForHighNetWorth />} />} />
                <Route path="/golden-visa-for-high-net-worth/" element={<W c={<GoldenVisaForHighNetWorth />} />} />
                <Route path="/golden-visa-property-compliance" element={<W c={<GoldenVisaPropertyCompliance />} />} />
                <Route path="/golden-visa-property-compliance/" element={<W c={<GoldenVisaPropertyCompliance />} />} />
                <Route path="/is-golden-visa-worth-it" element={<W c={<IsGoldenVisaWorthIt />} />} />
                <Route path="/is-golden-visa-worth-it/" element={<W c={<IsGoldenVisaWorthIt />} />} />
                <Route path="/greece-vs-dubai-golden-visa" element={<W c={<GreeceVsDubaiGoldenVisa />} />} />
                <Route path="/greece-vs-dubai-golden-visa/" element={<W c={<GreeceVsDubaiGoldenVisa />} />} />
                <Route path="/greek-golden-visa-chinese-investors" element={<W c={<GoldenVisaForChineseInvestors />} />} />
                <Route path="/greek-golden-visa-chinese-investors/" element={<W c={<GoldenVisaForChineseInvestors />} />} />
                <Route path="/greek-golden-visa-uae-investors" element={<W c={<GoldenVisaForUAEInvestors />} />} />
                <Route path="/greek-golden-visa-uae-investors/" element={<W c={<GoldenVisaForUAEInvestors />} />} />
                <Route path="/greek-golden-visa-russian-investors" element={<W c={<GoldenVisaForRussianInvestors />} />} />
                <Route path="/greek-golden-visa-russian-investors/" element={<W c={<GoldenVisaForRussianInvestors />} />} />
                <Route path="/greek-golden-visa-turkish-investors" element={<W c={<GoldenVisaForTurkishInvestors />} />} />
                <Route path="/greek-golden-visa-turkish-investors/" element={<W c={<GoldenVisaForTurkishInvestors />} />} />
                <Route path="/golden-visa-by-nationality" element={<W c={<GoldenVisaByNationality />} />} />
                <Route path="/golden-visa-by-nationality/" element={<W c={<GoldenVisaByNationality />} />} />
                <Route path="/compare" element={<W c={<Compare />} />} />
                <Route path="/login" element={<W c={<Login />} />} />
                <Route path="/admin" element={<W c={<ProtectedRoute><Admin /></ProtectedRoute>} />} />
                <Route path="*" element={<W c={<NotFound />} />} />
              </Routes>
              <Suspense fallback={null}>
                <LeadCaptureBot />
              </Suspense>
              <WhatsAppButton />
            </BrowserRouter>
          </LeadBotProvider>
          </PropertyProvider>
          </TranslationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
