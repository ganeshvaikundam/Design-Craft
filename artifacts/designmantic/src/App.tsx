import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HomePage from "@/pages/HomePage";
import LogoMakerPage from "@/pages/LogoMakerPage";
import WebsiteTemplatesPage from "@/pages/WebsiteTemplatesPage";
import PricingPage from "@/pages/PricingPage";
import CustomDesignPage from "@/pages/CustomDesignPage";
import BusinessCardPage from "@/pages/BusinessCardPage";
import BrandingPage from "@/pages/BrandingPage";
import { GlobalModals } from "@/components/modals/GlobalModals";

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={base}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logo-maker" element={<LogoMakerPage />} />
            <Route path="/website/templates" element={<WebsiteTemplatesPage />} />
            <Route path="/website/pricing" element={<PricingPage />} />
            <Route path="/services/custom" element={<CustomDesignPage />} />
            <Route path="/services/business-card" element={<BusinessCardPage />} />
            <Route path="/services/branding" element={<BrandingPage />} />
            <Route path="/website/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Coming Soon</h1></div>} />
            <Route path="/services/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Coming Soon</h1></div>} />
          </Routes>
        </main>
        <Footer />
        <GlobalModals />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;