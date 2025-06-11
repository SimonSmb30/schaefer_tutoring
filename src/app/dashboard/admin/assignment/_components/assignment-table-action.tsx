import { ApproveConnection, RejectConnection } from "@/action/connection";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { ConnectionWithUsers } from "./assignment-table-container";

interface Props {
  data: ConnectionWithUsers;
}

const AssignmentTableAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();

  const onReject = () => {
    startTransition(() => {
      RejectConnection(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
      });
    });
  };

  const onApprove = () => {
    startTransition(() => {
      ApproveConnection(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      });
    });
  };
  return (
    <div className="flex items-center gap-x-2 ">
      <Button size="sm" variant="outline" onClick={onReject} disabled={pending}>
        Reject
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onApprove}
        disabled={pending}
      >
        Approve
      </Button>
    </div>
  );
};

export default AssignmentTableAction;
