"use client";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Link from "next/link";

interface Props {
  pmid?: string | null;
}

const CardConnectRemoveContainer = ({ pmid }: Props) => {
  // const onRemove = () => {
  //   startTransition(() => {
  //     removePaymentMethod().then((res) => {
  //       if (!res.success) {
  //         toast.error(res.message);
  //         return;
  //       }

  //       // handle success
  //       toast.success(res.message);
  //     });
  //   });
  // };
  return (
    <div>
      {pmid ? (
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Wallet Connected
        </Button>
      ) : (
        <Link href="/dashboard/student">
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Buy Subscription
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CardConnectRemoveContainer;
