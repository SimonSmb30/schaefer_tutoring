import { PricingForm } from "../_components/pricing-form";

const page = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Pricing Plan</h1>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <PricingForm />
      </div>
    </div>
  );
};

export default page;
