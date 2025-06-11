"use client";
import { createLessonAction, editLessonAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { isPastDateAndTime } from "@/lib/lessonUtils";
import { cn } from "@/lib/utils";
import { LessonCreateSchema, lessonCreateSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lesson, Subject, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookLessonModalProps {
  students: User[];
  initialData?: Lesson;
  subjects: Subject[];
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

// Define the form schema with Zod

export default function LessonCreateForm({
  students,
  initialData,
  subjects,
}: BookLessonModalProps) {
  const [pending, startTransition] = useTransition();
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<LessonCreateSchema>({
    resolver: zodResolver(lessonCreateSchema),
    defaultValues: {
      studentId: initialData?.studentId ?? "",
      time: initialData?.time ?? "",
      date: initialData?.date ?? undefined,
      subject: initialData?.subjectId ?? subjects[0].id,
    },
  });

  const router = useRouter();

  function onSubmit(data: LessonCreateSchema) {
    const isPastTImeSelected = isPastDateAndTime(data.date, data.time);

    // Show warning if the selected date and time are in the past
    if (isPastTImeSelected) {
      toast.warning(
        "The selected date and time are in the past. Please choose a future date and time."
      );
      return; // Exit early to prevent further processing
    }

    if (initialData) {
      startTransition(() => {
        editLessonAction(data, initialData?.id).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            toast.success(res.message);
            form.reset();
            router.back();
          }
        });
      });
    } else {
      startTransition(() => {
        createLessonAction(data).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            toast.success(res.message);
            form.reset();
            router.back();
          }
        });
      });
    }
  }

  return (
    <main className="max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {initialData ? "Edit lesson" : "Book a new lesson"}
        </h1>
        <Button
          variant="link"
          effect="hoverUnderline"
          onClick={() => router.back()}
        >
          Back Now
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "MM/dd/yyyy")
                          : "mm/dd/yyyy"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        typeof field.value === "string"
                          ? undefined
                          : field.value
                      }
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Uhrzeit wählen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Stunden dauern immer 60 Minuten
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <SubmitButton
              text={initialData ? "Save Now" : "Create lesson"}
              pending={pending}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
