import React from "react";
import HeroSection from '@/components/HeroSection';
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQs";
import Footer from "@/components/Footer";
import TermsModal from "@/components/TermsModal";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TermsModal />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
