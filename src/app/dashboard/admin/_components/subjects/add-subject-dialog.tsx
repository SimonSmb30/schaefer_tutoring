"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { subjectSchema, SubjectSchemaType } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { CreateSubjectAction, EditSubjectAction } from "@/action/subject";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { Subject } from "@prisma/client";
import { toast } from "sonner";

interface Props {
  initialData?: Subject;
  trigger: ReactNode;
}

export function AddSubjectDialog({ initialData, trigger }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<SubjectSchemaType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  function onSubmit(values: SubjectSchemaType) {
    if (initialData) {
      startTransition(() => {
        EditSubjectAction(initialData?.id as string, values)
          .then((res) => {
            if (!res.success) {
              toast.error(res.message);
              return;
            } else {
              form.reset();
              toast.success(res.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setOpen(false);
          });
      });
    } else {
      startTransition(() => {
        CreateSubjectAction(values)
          .then((res) => {
            if (!res.success) {
              toast.error(res.message);
              return;
            } else {
              form.reset();
              toast.success(res.message);
              setOpen(false);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Subject" : "Add a new Subject"}
          </DialogTitle>
          <DialogDescription>
            Enter the subject name and click save.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Subject Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <SubmitButton
                text={initialData ? "Save Now" : "Create Subject"}
                pending={isPending}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
