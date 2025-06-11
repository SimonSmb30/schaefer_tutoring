"use client";

import { RemoveStudentConnection } from "@/action/connection";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { LessonWithUser } from "./my-students-container";

interface Props {
  data: LessonWithUser;
}

const defaultImage =
  "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg";

const MyStudentCard = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onRemove = () => {
    startTransition(() => {
      RemoveStudentConnection(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      });
    });
  };
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
            <Image
              src={data.image ?? defaultImage}
              alt={data.name ?? ""}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium text-lg">{data.name}</h3>
          <p className="text-sm text-gray-500">
            {data.studentLessons.length} completed lessons
          </p>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild className="w-full mt-2">
            <Button variant="destructive" size="sm" className="w-full">
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={onRemove}
                disabled={pending}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default MyStudentCard;
