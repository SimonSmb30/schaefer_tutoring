"use client";
import { updateLessonStatusAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lesson } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Lesson;
}

const PlannedHoursAction = ({ data }: Props) => {
  const [cancelPending, startTransition] = useTransition();

  const status = data.status;

  const onCanel = () => {
    startTransition(() => {
      updateLessonStatusAction(data.id, "canceled").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success("Lesson caneled successfully");
        }
      });
    });
  };

  const onCommplete = () => {
    startTransition(() => {
      updateLessonStatusAction(data.id, "carried_out").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success("Lesson completed successfully");
        }
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2">
        {data.status === "planned" && (
          <DropdownMenuItem asChild>
            <Button className="w-full" size="sm" asChild>
              <Link href={`/dashboard/teacher/hours/edit/${data.id}`}>
                Move
              </Link>
            </Button>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Button
            variant="default"
            className="w-full cursor-pointer bg-red-500 hover:bg-red-500/80"
            size="sm"
            disabled={cancelPending}
            onClick={onCanel}
          >
            {cancelPending ? "Cancelling..." : "Cancel"}
          </Button>
        </DropdownMenuItem>
        {status === "accepted" && (
          <DropdownMenuItem asChild>
            <Button
              className="w-full"
              size="sm"
              onClick={onCommplete}
              disabled={cancelPending}
            >
              Complete
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlannedHoursAction;
