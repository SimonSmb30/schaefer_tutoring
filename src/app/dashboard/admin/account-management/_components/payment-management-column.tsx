import { Badge } from "@/components/ui/badge";
import {
  getAllRecomendationByStudentId,
  getSubscriptionById,
} from "@/data/user";
import { calculateDiscount } from "@/lib/payment";
import { Account } from "@/types/account";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import MakeChargeAction from "./make-charge-action";

export const PaymentColumns: ColumnDef<Account>[] = [
  {
    header: "Student",
    cell: ({ row }) => {
      // const image = row.original.student.image;
      const name = row.original.student.name;
      const email = row.original.student.email;

      return (
        <div className="flex items-center gap-x-2">
          {/* s */}
          <div>
            <h2 className="font-semibold text-pretty text-primary">{name}</h2>
            <p className="text-muted-foreground">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Total Lesson",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground">
        {row.original.lessons.length}
      </p>
    ),
  },
  {
    header: "Subscription",
    cell: async ({ row }) => {
      const subscriptionId = row.original.student.pricingId;
      const subscription = await getSubscriptionById(subscriptionId as string);

      return <Badge>{subscription?.name ?? ""}</Badge>;
    },
  },
  {
    header: "Amount",
    cell: async ({ row }) => {
      const totalLesson = row.original.lessons.length;

      const subscriptionId = row.original.student.pricingId;
      const subscription = await getSubscriptionById(subscriptionId as string);

      if (!subscription) {
        toast.error("Subscription not found on payment column");
      }

      const isIndividual = subscription?.name === "Individual lessons";

      let amount;

      if (isIndividual) {
        amount = totalLesson * subscription.price;
      } else {
        if (totalLesson >= 4) {
          amount = totalLesson * (subscription?.price ?? 0);
        } else {
          amount = 4 * (subscription?.price ?? 0);
        }
      }

      return <div>${amount}</div>;
    },
  },
  {
    header: "Recomendation",
    cell: async ({ row }) => {
      const studentId = row.original.studentId;

      const reco = await getAllRecomendationByStudentId(studentId);

      return <div>{reco}</div>;
    },
  },
  {
    header: "Discount",
    cell: async ({ row }) => {
      const discount = await calculateDiscount({
        studentId: row.original.studentId as string,
        totalLesson: row.original.lessons.length,
      });
      return <p className="text-muted-foreground">${discount}</p>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => <MakeChargeAction data={row.original} />,
  },
];
