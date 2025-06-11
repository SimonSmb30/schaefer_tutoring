"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { verifyEmail } from "@/action/authentication";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Email step schema
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Password reset schema

type EmailFormValues = z.infer<typeof emailSchema>;

export default function ResetPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onEmailSubmit(data: EmailFormValues) {
    setFormError(null);

    try {
      startTransition(() => {
        verifyEmail(data.email).then((res) => {
          if (!res.success) {
            setFormError("No account found with this email address");
            return;
          }

          // handle success
          //   passwordForm.setValue("email", res.data?.email as string);
          router.push(`/reset-password/checked?email=${res.data?.email}`);
          //   passwordForm.setValue("email", res.data?.email as string);
        });
      });
    } catch {
      setFormError("An error occurred. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center text-blue-500">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formError && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {formError}
          </div>
        )}

        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={pending}
            >
              Continue
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
