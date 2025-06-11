import Hero from "@/components/hero";
import WhySchafer from "@/components/why-schafer";
import Subjects from "@/components/subjects";
import { PricingSection } from "@/components/pricing-section";
import Testimonials from "@/components/testimonials";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features */}
      <WhySchafer />

      {/* Subjects */}
      <Subjects />

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}