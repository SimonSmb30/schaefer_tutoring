import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PricingForm } from "../../_components/pricing-form";

export default async function EditPricingPlan({
  params,
}: {
  params: { id: string };
}) {
  const plan = await prisma.pricing.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!plan) notFound();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Pricing Plan</h1>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <PricingForm initialvalue={plan} />
      </div>
    </div>
  );
}
