import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PricingTable } from "./_components/pricing-table";

const Page = async () => {
  const pricing = await prisma.pricing.findMany();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Pricing Management</h1>
        <Link href="/dashboard/admin/price-management/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Plan
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <PricingTable data={pricing} />
      </div>
    </div>
  );
};

export default Page;
