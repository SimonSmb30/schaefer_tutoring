"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAFreeTrialRequest } from "@/action/free-trial";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { freeTrialSchema, FreeTrialSchemaType } from "@/schemas/schema";
import { Subject } from "@prisma/client";
import { toast } from "sonner";

interface Props {
  subjects: Subject[];
}

export default function TrialLessonForm({ subjects }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof freeTrialSchema>>({
    resolver: zodResolver(freeTrialSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredSlots: [{ date: undefined, time: "" }],
      notes: "",
    },
  });

  function onSubmit(values: FreeTrialSchemaType) {
    startTransition(() => {
      createAFreeTrialRequest(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        // handle success
        toast.success(res.message);
        setIsSubmitted(true);
      });
    });
  }

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  // Function to add a new date-time slot
  const addDateTimeSlot = () => {
    const currentSlots = form.getValues("preferredSlots");
    form.setValue("preferredSlots", [
      ...currentSlots,
      { date: new Date(), time: "" },
    ]);
  };

  // Function to remove a date-time slot
  const removeDateTimeSlot = (index: number) => {
    const currentSlots = form.getValues("preferredSlots");
    if (currentSlots.length > 1) {
      const updatedSlots = currentSlots.filter((_, i) => i !== index);
      form.setValue("preferredSlots", updatedSlots);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for your request!
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your trial lesson request and will contact you
            shortly to confirm the details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Request your free trial lesson now!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience our personalized tutoring approach with a complimentary
          session. Fill out the form below and we&apos;ll arrange your free
          trial lesson.
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="Enter your phone number"
                          {...field}
                          defaultCountry="TR"
                        />
                      </FormControl>
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
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.name}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-base">
                    Preferred Dates & Times
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDateTimeSlot}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Option
                  </Button>
                </div>
                <FormDescription className="mb-4">
                  Please select multiple date and time options that work for
                  you.
                </FormDescription>

                {form.watch("preferredSlots").map((_, index) => (
                  <div key={index} className="flex items-start gap-3 mb-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 flex-1">
                      <FormField
                        control={form.control}
                        name={`preferredSlots.${index}.date`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="sr-only">Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() ||
                                    date >
                                      new Date(
                                        new Date().setMonth(
                                          new Date().getMonth() + 2
                                        )
                                      )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`preferredSlots.${index}.time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Time</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {form.getValues("preferredSlots").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDateTimeSlot(index)}
                        className="mt-1"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </div>
                ))}
                {form.formState.errors.preferredSlots?.message && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {form.formState.errors.preferredSlots?.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your learning goals or any specific topics you'd like to focus on..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share any additional information that might help us
                      prepare for your trial lesson.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton
                pending={isPending}
                text="Submit Request"
                className="w-full"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
