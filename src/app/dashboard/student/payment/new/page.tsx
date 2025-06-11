"use client";

import { saveSepaPayment } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isPending, startTransition] = useTransition();

  const onGo = () => {
    startTransition(() => {
      saveSepaPayment("").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        if (res.sessionUrl) window.location.href = res.sessionUrl;
      });
    });
  };
  return (
    <div>
      <Button asChild variant="link" effect="hoverUnderline">
        <Link
          href="/dashboard/student/payment"
          className="flex items-center gap-x-3"
        >
          <ArrowLeft /> Back Now
        </Link>
      </Button>

      <div className="mt-5">
        <Button onClick={onGo} disabled={isPending}>
          Pay with sepa
        </Button>
      </div>
    </div>
  );
};

export default Page;
