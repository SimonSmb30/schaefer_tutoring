import { approveReview, cancelReview } from "@/action/review";
import { Button } from "@/components/ui/button";
import { Review } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Review;
}

const ReviewAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();

  const onStatusChange = () => {
    startTransition(() => {
      if (data.approved) {
        cancelReview(data.id).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          toast.success(res.message);
        });
      } else {
        approveReview(data.id).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          toast.success(res.message);
        });
      }
    });
  };
  if (data.approved) {
    return (
      <Button
        size="sm"
        variant="link"
        onClick={onStatusChange}
        disabled={pending}
      >
        Cancel
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onStatusChange}
      disabled={pending}
    >
      Approve
    </Button>
  );
};

export default ReviewAction;
