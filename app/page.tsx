import React from "react";
import HeroSection from '@/components/HeroSection';
import { DatePicker } from 'antd';
import FeaturesSection from "@/components/FeaturesSection";
import png from "@/public/magicpattern-grid-pattern-1720160852088.png"
import FAQSection from "@/components/FAQs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
