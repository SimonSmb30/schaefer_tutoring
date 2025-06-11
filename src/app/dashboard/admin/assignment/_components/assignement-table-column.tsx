"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import AssignmentTableAction from "./assignment-table-action";
import { ConnectionWithUsers } from "./assignment-table-container";

export const defaultImage =
  "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg";

export const AssignmentTableColumn: ColumnDef<ConnectionWithUsers>[] = [
  {
    header: "Teacher",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-x-2 w-auto">
          <div className="relative h-[20px] w-[30px] rounded-full  ">
            <Image
              src={data.teacher.image ?? defaultImage}
              alt={data.teacher.name!}
              className="rounded-full h-[30px]"
              fill
            />
          </div>
          <div>
            <h3 className="font-medium text-primary text-[15px]">
              {data.teacher.name}
            </h3>
            <h6 className="text-muted-foreground text-[12px]">
              {data.teacher.email}
            </h6>
            <div className="mt-1">
              {data.teacher.subjects.map((item, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0 bg-blue-50 border-input border-[1px] rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Student",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <div className="relative h-[30px] w-[30px] rounded-full">
            <Image
              src={data.student.image ?? defaultImage}
              alt={data.student.name!}
              className="rounded-full h-[30px]"
              fill
            />
          </div>
          <div>
            <h3 className="font-medium text-primary text-[15px]">
              {data.student.name}
            </h3>
            <h6 className="text-muted-foreground text-[12px]">
              {data.student.email}
            </h6>
          </div>
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          className={cn(
            status === "approved"
              ? "bg-green-600"
              : status === "rejected"
                ? "bg-red-600"
                : "bg-yellow-600"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "Action",
    cell: ({ row }) => <AssignmentTableAction data={row.original} />,
  },
];
