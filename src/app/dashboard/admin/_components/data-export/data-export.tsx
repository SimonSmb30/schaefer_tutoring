"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  dateRange: z.object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date({
      required_error: "End date is required",
    }),
  }),
  format: z.enum(["csv", "excel", "pdf"], {
    required_error: "Please select an export format",
  }),
});

export default function DataExport() {
  const [isExporting, setIsExporting] = useState(false);
  const today = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "csv",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsExporting(true);

      const { dateRange, format: exportFormat } = values;
      const fromDate = dateRange.from.toISOString();
      const toDate = dateRange.to.toISOString();

      const response = await fetch(
        `/api/admin/export?from=${fromDate}&to=${toDate}&format=${exportFormat}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `lessons-export-${exportFormat}-${format(
        dateRange.from,
        "yyyy-MM-dd"
      )}-to-${format(dateRange.to, "yyyy-MM-dd")}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Export successful", {
        description: `Your data has been exported `,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export failed", {
        description:
          "There was an error exporting your data. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Export data</h1>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <p className="text-muted-foreground mb-6">
          Here you can export data for a specific period.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Date Range</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              {field.value?.from
                                ? format(field.value.from, "MM/dd/yyyy")
                                : "mm/dd/yyyy"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value?.from}
                            onSelect={(date) =>
                              field.onChange({
                                ...field.value,
                                from: date,
                              })
                            }
                            disabled={(date) => date > today}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value?.to && "text-muted-foreground"
                              )}
                            >
                              {field.value?.to
                                ? format(field.value.to, "MM/dd/yyyy")
                                : "mm/dd/yyyy"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value?.to}
                            onSelect={(date) =>
                              field.onChange({
                                ...field.value,
                                to: date,
                              })
                            }
                            disabled={(date) =>
                              date > today ||
                              (field.value?.from
                                ? date < field.value.from
                                : false)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Export format</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="csv" id="csv" />
                        </FormControl>
                        <FormLabel
                          className="font-normal cursor-pointer"
                          htmlFor="csv"
                        >
                          CSV
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export data"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
