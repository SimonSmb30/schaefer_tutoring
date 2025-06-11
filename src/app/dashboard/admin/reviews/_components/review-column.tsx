"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { ReviewWithUser } from "../page";
import ReviewAction from "./review-action";

export const ReviewColumns: ColumnDef<ReviewWithUser>[] = [
  {
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 ">
        <div className="h-[30px] w-[30px] rounded-full relative">
          <Image
            src={
              row.original.user.image ??
              "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg"
            }
            fill
            alt="profile"
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold">{row.original.user.name}</h3>
          <p className="font-normal text-muted-foreground">
            {row.original.user.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => <p className="max-w-[400px]">{row.original.message}</p>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => (
      <Badge className={cn(row.original.approved ? "bg-green-500" : "")}>
        {row.original.approved ? "Approved" : "Pending"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Published on",
    cell: ({ row }) => (
      <p>{moment(row.original.createdAt).format("D MMMM, YYYY")}</p>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => <ReviewAction data={row.original} />,
  },
];
