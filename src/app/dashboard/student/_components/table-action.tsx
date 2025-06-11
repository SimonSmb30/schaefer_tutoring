"use client";

import { updateLessonStatusAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface TableActionsProps {
  id: string;
}

export function TableActions({ id }: TableActionsProps) {
  const [acceptPending, startAcceptTransition] = useTransition();
  const [cancelPending, startCancelTransition] = useTransition();

  const handleAccept = () => {
    startAcceptTransition(() => {
      updateLessonStatusAction(id, "accepted").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(
            "Lesson successfully accepted! You can now proceed with the scheduled session."
          );
        }
      });
    });
  };

  const handleRefuse = () => {
    startCancelTransition(() => {
      updateLessonStatusAction(id, "canceled").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(
            "Lesson successfully canceled. You can reschedule or book another session."
          );
        }
      });
    });
  };

  // Otherwise, show the action buttons
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2">
        <DropdownMenuItem asChild>
          <Button
            variant="default"
            className={cn(
              "bg-green-500 w-full hover:bg-green-600 hover:bg-green-600/80 text-white cursor-pointer",
              cancelPending && "cursor-not-allowed"
            )}
            disabled={acceptPending}
            onClick={handleAccept}
          >
            Accept
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="default"
            className={cn(
              "bg-red-500 w-full hover:bg-red-600 hover:bg-red-600/80 text-white cursor-pointer",
              acceptPending && "cursor-not-allowed"
            )}
            onClick={handleRefuse}
            disabled={cancelPending}
          >
            Refuse
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
