"use client";

import {
  AssignFromAdmin,
  getStudentsByTeacherIdNotConeected,
} from "@/action/connection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { GraduationCap, Loader2, UserPlus, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  teacherId: z.string(),
  studentId: z.string(),
});

interface Props {
  teachers: {
    name: string | null;
    id: string;
  }[];
}

export default function AdminAssignmentForm({ teachers }: Props) {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const teacherId = form.watch("teacherId");
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchStudents() {
      if (!teacherId) {
        setStudents([]);
        return;
      }

      setLoading(true);
      try {
        const data = await getStudentsByTeacherIdNotConeected(teacherId);
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Could not fetch students for this teacher.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [teacherId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      AssignFromAdmin(values.teacherId, values.studentId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        form.reset({
          teacherId: "",
          studentId: "",
        });
        router.push("/dashboard/admin/assignment");
      });
    });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Assign Teacher & Student
        </CardTitle>
        <CardDescription className="text-sky-100">
          Create a new teacher-student assignment
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Teacher Field */}
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <GraduationCap className="h-4 w-4 text-indigo-500" />
                    Teacher
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-slate-200 h-11">
                        <SelectValue placeholder="Please select a teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map(({ id, name }) => (
                        <SelectItem value={id} key={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Student Field */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <UserRound className="h-4 w-4 text-indigo-500" />
                    Student
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!teacherId || loading}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-slate-200 h-11">
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                            <span className="text-slate-400">
                              Loading students...
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select a student" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.length > 0 ? (
                        students.map(({ id, name }) => (
                          <SelectItem value={id} key={id}>
                            {name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-center text-slate-500">
                          {teacherId && !loading
                            ? "No students available for connection"
                            : "Select a teacher first"}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition-all h-11"
              disabled={pending || !form.formState.isValid}
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Assign Teacher & Student"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
