import { makeCharge } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import { Account } from "@/types/account";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Account;
}

const MakeChargeAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();

  const onCharge = () => {
    startTransition(() => {
      makeCharge(data.studentId, data).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  };
  return (
    <Button disabled={pending} onClick={onCharge}>
      Make Charge
    </Button>
  );
};

export default MakeChargeAction;
