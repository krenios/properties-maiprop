import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
// Lazy-load all routes
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <TranslationProvider>
          <PropertyProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Suspense fallback={null}><Index /></Suspense>} />
                <Route path="/property/:id" element={<Suspense fallback={null}><PropertyPage /></Suspense>} />
                <Route path="/greek-golden-visa" element={<Suspense fallback={null}><GreekGoldenVisa /></Suspense>} />
                <Route path="/greek-golden-visa/" element={<Suspense fallback={null}><GreekGoldenVisa /></Suspense>} />
                <Route path="/greek-golden-visa-requirements" element={<Suspense fallback={null}><GreekGoldenVisaRequirements /></Suspense>} />
                <Route path="/greek-golden-visa-requirements/" element={<Suspense fallback={null}><GreekGoldenVisaRequirements /></Suspense>} />
                <Route path="/250k-golden-visa-properties" element={<Suspense fallback={null}><GoldenVisa250k /></Suspense>} />
                <Route path="/250k-golden-visa-properties/" element={<Suspense fallback={null}><GoldenVisa250k /></Suspense>} />
                <Route path="/guides" element={<Suspense fallback={null}><Guides /></Suspense>} />
                <Route path="/guides/" element={<Suspense fallback={null}><Guides /></Suspense>} />
                <Route path="/guides/:slug" element={<Suspense fallback={null}><GuideArticle /></Suspense>} />
                <Route path="/guides/:slug/" element={<Suspense fallback={null}><GuideArticle /></Suspense>} />
                <Route path="/portfolio" element={<Suspense fallback={null}><Portfolio /></Suspense>} />
                <Route path="/portfolio/" element={<Suspense fallback={null}><Portfolio /></Suspense>} />
                <Route path="/trackrecord" element={<Suspense fallback={null}><Portfolio /></Suspense>} />
                <Route path="/trackrecord/" element={<Suspense fallback={null}><Portfolio /></Suspense>} />
                <Route path="/properties" element={<Suspense fallback={null}><Properties /></Suspense>} />
                <Route path="/properties/" element={<Suspense fallback={null}><Properties /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={null}><Login /></Suspense>} />
                <Route path="/admin" element={<Suspense fallback={null}><ProtectedRoute><Admin /></ProtectedRoute></Suspense>} />
                <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
              </Routes>
            </BrowserRouter>
          </PropertyProvider>
          </TranslationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
