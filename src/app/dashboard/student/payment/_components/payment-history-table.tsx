"use client";

import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { PaymentHistory } from "@prisma/client";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentHistoryColumn } from "./payment-history-columns";

interface Props {
  data: PaymentHistory[];
}

const PaymentHistoryTable = ({ data }: Props) => {
  console.log(data);
  return (
    <div>
      <TableContainer data={data} columns={PaymentHistoryColumn} />
    </div>
  );
};

export default PaymentHistoryTable;

const TableContainer = ({
  data,
  columns,
}: {
  data: PaymentHistory[];
  columns: ColumnDef<PaymentHistory>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="mt-[28px]">
        <DataTable table={table} columns={columns} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
};
