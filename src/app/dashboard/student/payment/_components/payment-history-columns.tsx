import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentHistory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CloudDownload } from "lucide-react";

export const PaymentHistoryColumn: ColumnDef<PaymentHistory>[] = [
  {
    header: "Transaction ID",
    cell: ({ row }) => <p>{row.original.paymentIntentId}</p>,
  },
  {
    header: "Month",
    cell: ({ row }) => {
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        row.original.paymentForDate
      );

      return <p>{month}</p>;
    },
  },

  {
    header: "Amount",
    cell: ({ row }) => <p className=" font-medium">${row.original.amount}</p>,
  },
  {
    header: "Total Lesson",
    cell: ({ row }) => <Badge>{row.original.totalLessonsPaidFor}</Badge>,
  },

  {
    header: "Discount",
    cell: ({ row }) => <p className=" font-medium">${row.original.discount}</p>,
  },
  {
    header: "Paid",
    cell: ({ row }) => (
      <p className=" font-medium">
        ${row.original.amount - row.original.discount}
      </p>
    ),
  },
  {
    header: "Invoice",
    cell: ({ row }) => <InvoiceDownload pdf={row.original.edgePdfUrl} />,
  },
];

const InvoiceDownload = ({ pdf }: { pdf: string | null }) => {
  const handleDownload = () => {
    if (!pdf) return;

    const link = document.createElement("a");
    link.href = pdf;
    link.download = "receipt.pdf"; // or extract filename from URL if needed
    link.target = "_blank"; // optional, opens in new tab
    link.click();
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDownload}
      disabled={!pdf}
      effect="gooeyLeft"
    >
      <CloudDownload className="mr-2" />
      Receipt
    </Button>
  );
};
