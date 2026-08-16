import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import MooncakePopup from "./components/MooncakePopup";
import FloatingBadge from "./components/FloatingBadge";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import GetQuote from "./pages/GetQuote";
import ServicePage from "./pages/ServicePage";
import JobDetailPage from "./components/JobDetailPage";
import ApplyPage from "./components/ApplyPage";
import MidAutumnFestival from "./pages/MidAutumnFestival";
import BusinessQuoteForm from "./pages/BusinessQuoteForm";

import Chatbot from "./components/Chatbot";

// Layout = wahi cheez jo pehle App.jsx mein thi (Navbar, popups, cookie logic, sab)
function Layout({ children }) {
  useEffect(() => {
    const consent = localStorage.getItem("welyft_cookies");
    if (consent === "accepted" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  }, []);

  return (
    <HelmetProvider>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <MooncakePopup />
      <FloatingBadge />
      <Chatbot />
      {children}
      <Footer />
      <CookieBanner />
    </HelmetProvider>
  );
}

export const routes = [
  { path: "/", element: <Layout><HomePage /></Layout> },
  { path: "/careers", element: <Layout><Careers /></Layout> },
  { path: "/get-quote", element: <Layout><GetQuote /></Layout> },
  { path: "/privacy-policy", element: <Layout><PrivacyPolicy /></Layout> },
  { path: "/terms", element: <Layout><Terms /></Layout> },
  { path: "/services/:slug", element: <Layout><ServicePage /></Layout> },
  { path: "/careers/:jobId", element: <Layout><JobDetailPage /></Layout> },
  { path: "/careers/apply/:jobId", element: <Layout><ApplyPage /></Layout> },
  { path: "/mid-autumn-festival", element: <Layout><MidAutumnFestival /></Layout> },
  { path: "/business-quote", element: <Layout><BusinessQuoteForm /></Layout> },
];