"use client";

// Packages
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginAction } from "@/action/authentication";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, LoginValues } from "@/schemas/schema";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<true | false>(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  function onSubmit(values: LoginValues) {
    startTransition(() =>
      LoginAction(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
        } else {
          toast.success("Login successful");
        }
      })
    );
  }

  const isLoading = loading || isPending;

  return (
    <div className="mt-[40px]">
      {/* <SocialLogin /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-[16px] pt-[24px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Link
              href="/reset-password"
              className="font-inter text-[14px] font-medium leading-[16.94px] text-[#1D3557] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-[40px]"
            effect="gooeyLeft"
            disabled={isLoading}
            variant={isLoading ? "outline" : "default"}
          >
            {isLoading && <Loader2 className="absolute right-5 animate-spin" />}
            {isLoading ? "Please wait..." : "Log In"}
          </Button>
        </form>
      </Form>

      <p className="mt-[32px] text-center text-[14px] font-normal leading-[16.94px] text-[#9CA3AF]">
        Don&apos;t have an account?{" "}
        <Link
          href={`/sign-up`}
          className="font-medium text-[#1D3557] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
