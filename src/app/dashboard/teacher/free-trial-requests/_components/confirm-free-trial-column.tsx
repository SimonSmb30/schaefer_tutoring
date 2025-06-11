"use client";

import { onCompletedFreeTrialRequest } from "@/action/free-trial";
import { Button } from "@/components/ui/button";
import { FreeTrialReq, preferredSlots } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Loader2 } from "lucide-react";
import moment from "moment";
import { useTransition } from "react";
import { toast } from "sonner";

export interface FreeTrialWithSlot extends FreeTrialReq {
  preferredSlots: preferredSlots[];
}

export const ConfirmFreeTrialReqColumns: ColumnDef<FreeTrialWithSlot>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    header: "Meeting On",
    cell: ({ row }) => {
      const date = row.original.date;
      const time = row.original.time;

      return (
        <div>
          <h4 className="text-sm">{moment(date).format("DD MMMM, YYYY")}</h4>
          <p className="text-muted-foreground text-xs">at {time}</p>
        </div>
      );
    },
  },
  {
    header: "Meet Link",
    cell: ({ row }) => {
      const meetingLink = row.original.meetingLink;

      if (!meetingLink) return;

      return (
        <Button asChild>
          <a href={meetingLink} target="_blank">
            Join Now
          </a>
        </Button>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => <OnComplete data={row.original} />,
  },
];

const OnComplete = ({ data }: { data: FreeTrialReq }) => {
  const [pending, startTransition] = useTransition();

  const onTap = () => {
    startTransition(() => {
      onCompletedFreeTrialRequest(data.id).then((res) => {
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
    <Button variant="outline" size="icon" disabled={pending} onClick={onTap}>
      {pending ? <Loader2 className="animate-spin " /> : <Check />}
    </Button>
  );
};
