import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, HelpCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgainPurchaseButton from "./_components/again-purchase-button";

export default async function CancelPage({
  params,
}: {
  params: { id: string };
}) {
  const pricing = await prisma.pricing.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!pricing) notFound();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <XCircle className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Payment Cancelled
        </h1>
        <p className="mb-6 text-gray-600">
          Your subscription purchase was not completed. No charges have been
          made.
        </p>

        <div className="mb-6 rounded-md bg-blue-50 p-4 text-left">
          <h3 className="mb-2 font-semibold text-gray-800">
            Why try our subscription?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {pricing.features.map((item) => (
              <li className="flex items-start" key={item}>
                <span className="mr-2 text-blue-600">•</span>
                <span>{item}</span>
              </li>
            ))}
            {/* <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span>Save 20% compared to individual lessons</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span>Guaranteed regular appointments</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span>Continuous learning progress</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span>Personal learning plan</span>
            </li> */}
          </ul>
        </div>

        <div className="mb-6 space-y-4">
          <AgainPurchaseButton id={params.id} />
          <div className="flex gap-2">
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>

            <Link href="/contact" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          If you have any questions, please contact our support team.
        </p>
      </div>
    </div>
  );
}
