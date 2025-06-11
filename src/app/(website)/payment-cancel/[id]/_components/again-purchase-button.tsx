"use client";

import { saveSepaPayment } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

const AgainPurchaseButton = ({ id }: { id: string }) => {
  const [pending, startTransition] = useTransition();

  const onAgainPurchase = () => {
    startTransition(() => {
      saveSepaPayment(id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // redirect to checkout
        window.location.href = res.sessionUrl as string;
      });
    });
  };
  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700"
      onClick={onAgainPurchase}
      disabled={pending}
    >
      Try Again
    </Button>
  );
};

export default AgainPurchaseButton;
