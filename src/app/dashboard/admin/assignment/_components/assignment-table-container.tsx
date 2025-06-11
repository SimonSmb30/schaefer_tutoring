"use client";

import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Connection, User } from "@prisma/client";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Base interface with relations
export interface ConnectionWithUsers extends Connection {
  teacher: User;
  student: User;
}

// Props interface for your component
export interface AssignmentTableProps {
  data: ConnectionWithUsers[];
  columns: ColumnDef<ConnectionWithUsers>[];
}

const AssignmentTableContainer = ({ data, columns }: AssignmentTableProps) => {
  return (
    <div>
      <TableContainer data={data} columns={columns} />
    </div>
  );
};

export default AssignmentTableContainer;

const TableContainer = ({ data, columns }: AssignmentTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <div className="flex justify-between items-center py-4"></div>
      <DataTable columns={columns} table={table} />
      {data?.length > 10 && (
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
};
