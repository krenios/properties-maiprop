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

const queryClient = new QueryClient({
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
