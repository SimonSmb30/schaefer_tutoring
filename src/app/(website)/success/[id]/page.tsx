import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  User,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.freeTrialReq.findFirst({
    where: { id },
  });

  return data;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const freeTrialReq = await getData(params.id);

  if (!freeTrialReq) notFound();

  const teacherinfo = await prisma.user.findFirst({
    where: { id: freeTrialReq.teacherId as string },
    select: { name: true },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-green-50 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">
            Tutoring Session Confirmed!
          </CardTitle>
          <CardDescription className="text-lg text-green-600">
            Your session with {teacherinfo?.name} has been scheduled.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex items-center">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">STUDENT</h3>
            </div>
            <p className="text-xl font-semibold">{freeTrialReq.fullName}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-500">DATE</h3>
              </div>
              <p className="text-lg font-medium">
                {moment(freeTrialReq.date).format("D MMMM, YYYY")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-500">TIME</h3>
              </div>
              <p className="text-lg font-medium">{freeTrialReq.time}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">SUBJECT</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{freeTrialReq.subject}</p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {teacherinfo?.name}
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExternalLink className="mr-2 h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-700">
                  GOOGLE MEET LINK
                </h3>
              </div>
              <a
                href={freeTrialReq?.meetingLink as string}
                target="_blank"
                className="cursor-pointer"
              >
                Join Meeting
              </a>
            </div>
            <p className="mt-2 truncate text-sm text-gray-500">
              {freeTrialReq.meetingLink}
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
            <p className="text-sm">
              Please join the meeting 5 minutes before the scheduled time. Make
              sure you have a stable internet connection and a quiet
              environment.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 bg-gray-50 p-6 sm:flex-row sm:justify-between sm:space-y-0">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
