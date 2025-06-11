import { auth } from "@/auth";
import { mockSubjects } from "../../../lib/mockData";
import { redirect } from "next/navigation";
import TrialLessonForm from "./_components/free-trial-form";
import Hero from "./_components/hero";
import { PricingSection } from "./_components/pricing-section";
import Subjects from "./_components/subjects";
import Testmonial from "./_components/testmonial";
import WhySchafer from "./_components/why-schafer";

const NachhilfeLandingPage = async () => {
  const subjects = mockSubjects;

  const cs = await auth();

  let user;

  if (cs?.user) {
    // Since we're using mock data, we'll create a mock user object
    user = {
      isGreeting: true,
      id: cs.user.id,
      pricingId: null
    };
  }

  // Mock pricing data
  const pricing = [
    {
      id: "1",
      name: "Basic Plan",
      price: 25,
      unit: "hour",
      description: "Perfect for occasional tutoring needs",
      isRecommended: false,
      features: ["1 hour per week", "Access to learning materials", "Email support"]
    },
    {
      id: "2",
      name: "Standard Plan",
      price: 40,
      unit: "hour",
      description: "Our most popular tutoring package",
      isRecommended: true,
      features: ["2 hours per week", "Personalized learning plan", "Priority scheduling", "24/7 support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Navigation */}

      {/* Hero Section + About Us Combined */}
      <Hero />

      {/* Features */}
      <WhySchafer />

      {/* Subjects */}
      <Subjects />

      {/* Pricing */}
      <PricingSection
        data={pricing}
        isLoggedIn={!!cs}
        purchasedPlan={user?.pricingId as string}
      />

      {/* Contact Form */}
      <div className="w-full bg-white py-20">
        <TrialLessonForm subjects={subjects} />
      </div>

      {/* Testimonials */}
      <Testmonial />

      {/* Footer */}
    </div>
  );
};

export default NachhilfeLandingPage;