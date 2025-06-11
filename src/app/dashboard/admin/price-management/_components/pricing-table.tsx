"use client";

import { Edit, Loader, Trash } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

import { PlanDeleteAction } from "@/action/pricing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pricing } from "@prisma/client";
import { toast } from "sonner";

interface props {
  data: Pricing[];
}

export function PricingTable({ data }: props) {
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(() => {
      PlanDeleteAction(id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }

        // handle success
        toast.success(res.message);
      });
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Plan Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="text-xl font-bold">{plan.price}€</span>
                <span className="text-muted-foreground ml-1">
                  / {plan.unit}
                </span>
              </div>
            </TableCell>
            <TableCell className="max-w-[300px]">{plan.description}</TableCell>
            <TableCell>
              <ul className="list-disc pl-5 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              {plan.isRecommended ? (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  Recommended
                </Badge>
              ) : (
                <Badge variant="outline">Standard</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/dashboard/admin/price-management/edit/${plan.id}`}
                >
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Trash className="text-rose-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the &quot;{plan.name}&quot;
                        pricing plan. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isDeleting}
                        onClick={() => handleDelete(plan.id)}
                        className="bg-red-500 hover:bg-red-400"
                      >
                        Continue{" "}
                        {isDeleting && <Loader className="animate-spin" />}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
