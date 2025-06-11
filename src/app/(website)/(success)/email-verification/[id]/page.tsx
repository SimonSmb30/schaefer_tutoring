import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EmailVerificationConfirmed({
  params,
}: {
  params: { id: string };
}) {
  const currentUser = await auth();
  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  if (!user.emailVerified) notFound();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pt-6 pb-2">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-800">
            Email Verified!
          </h1>
        </CardHeader>

        <CardContent className="text-center px-6 pt-4">
          <div className="mb-6">
            <p className="text-slate-600 mb-4">
              Thank you for verifying your email address. Your Schaefer-Tutor
              account is now active.
            </p>
            <p className="text-slate-600">
              You can now access all features of the Schaefer-Tutor platform and
              start your learning journey.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 px-6 pb-6">
          {currentUser ? (
            <Button asChild variant="outline" className="w-full">
              <Link href={`/dashboard/${user.role}`}>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Login Now</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
