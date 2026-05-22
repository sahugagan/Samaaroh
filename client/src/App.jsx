import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer.jsx";
import Navbar from "./components/Navbar.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.jsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.jsx"));
const SecurityPage = lazy(() => import("./pages/SecurityPage.jsx"));

export default function App() {
  return (
    <div className="app-shell">
      <GlobalAudioPlayer />
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/security" element={<SecurityPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
