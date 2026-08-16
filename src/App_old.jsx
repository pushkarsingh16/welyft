import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import GetQuote from "./pages/GetQuote";
import ServicePage from "./pages/ServicePage";
import JobDetailPage from "./components/JobDetailPage";
import ApplyPage from "./components/ApplyPage";
import AnnouncementBar from "./components/AnnouncementBar";
import MooncakePopup from "./components/MooncakePopup";
import FloatingBadge from "./components/FloatingBadge";
import MidAutumnFestival from "./pages/MidAutumnFestival";
import BusinessQuoteForm from "./pages/BusinessQuoteForm";
import CookieBanner from "./components/CookieBanner";
import { useState,useEffect } from "react";


function App() {
  
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
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <MooncakePopup/>
      <FloatingBadge />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/careers" element={<Careers />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/careers/:jobId" element={<JobDetailPage />} />
        <Route path="/careers/apply/:jobId" element={<ApplyPage />} />
        <Route path="/mid-autumn-festival" element={<MidAutumnFestival />} />
        <Route path="/business-quote" element={<BusinessQuoteForm />} />
      </Routes>
      
      <CookieBanner />
    </>
  );
}

export default App;
