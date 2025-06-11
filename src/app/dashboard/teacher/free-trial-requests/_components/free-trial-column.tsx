"use client";

import { FreeTrialReq, preferredSlots } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import FreeTrialRequesAction from "./free-trial-action";

export interface FreeTrialWithSlot extends FreeTrialReq {
  preferredSlots: preferredSlots[];
}

export const FreeTrialReqColumns: ColumnDef<FreeTrialWithSlot>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "createdAt",
    header: "Requested at",
    cell: ({ row }) => (
      <p>{moment(row.original.createdAt).format("D MMMM, YYYY")}</p>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => <FreeTrialRequesAction data={row.original} />,
  },
];
