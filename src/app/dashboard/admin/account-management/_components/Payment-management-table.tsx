"use client";

import { DataTable } from "@/components/ui/data-table";
import { Account } from "@/types/account";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentColumns } from "./payment-management-column";

interface Props {
  data: Account[];
}

const PaymentManagementTable = ({ data }: Props) => {
  console.log(data);
  return (
    <div>
      <TableContainer data={data} columns={PaymentColumns} />
    </div>
  );
};

export default PaymentManagementTable;

const TableContainer = ({
  data,
  columns,
}: {
  data: Account[];
  columns: ColumnDef<Account>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="mt-[48px]">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
