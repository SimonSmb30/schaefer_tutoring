import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: { userId: string; pricingId: string };
}) => {
  const pricing = await prisma.pricing.findFirst({
    where: {
      id: params.pricingId,
    },
  });

  if (!pricing) notFound();

  const updatedUser = await prisma.user.update({
    where: {
      id: params.userId,
    },
    data: {
      pricingId: params.pricingId,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <CheckCircle className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your subscription has been activated.
        </p>

        <div className="mb-6 rounded-md bg-blue-50 p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="font-medium text-gray-700">Plan</span>
              <span className="font-semibold text-blue-700">
                {pricing.name}
              </span>
            </div>
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="font-medium text-gray-700">Price</span>
              <span className="font-semibold text-blue-700">
                ${pricing.price}/hour
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Billing Cycle</span>
              <span className="font-semibold text-blue-700">Monthly</span>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <Link href={`/dashboard/${updatedUser.role}`} className="block">
            <Button
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  );
};

export default page;
