"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  className?: string;
  effect?:
    | "expandIcon"
    | "ringHover"
    | "shine"
    | "shineHover"
    | "gooeyRight"
    | "gooeyLeft"
    | "underline"
    | "hoverUnderline"
    | "gradientSlideShow"
    | null
    | undefined;
  pending: boolean;
}

export function SubmitButton({
  text,
  variant,
  className,
  effect,
  pending,
}: iAppProps) {
  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          className={cn("w-fit", className)}
          effect={effect}
        >
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit", className)}
          effect={effect}
        >
          {text}
        </Button>
      )}
    </>
  );
}
