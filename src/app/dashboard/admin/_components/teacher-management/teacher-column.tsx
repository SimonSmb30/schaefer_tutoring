"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const TeacherColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "subjects",
    header: "Subject",
  },
  {
    accessorKey: "createdAt",
    header: "Registered on",
    cell: ({ row }) => (
      <p>{moment(row.original.createdAt).format("D MMMM, YYYY")}</p>
    ),
  },
];
