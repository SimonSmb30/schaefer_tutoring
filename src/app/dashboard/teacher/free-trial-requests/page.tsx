import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ConfirmFreeTrialReqColumns } from "./_components/confirm-free-trial-column";
import { FreeTrialReqColumns } from "./_components/free-trial-column";
import FreeTrialRequestTableContainer from "./_components/free-trial-request-table-container";

async function getUser(id: string) {
  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return data;
}

async function getMatchingFreeTrials(subjects: string[]) {
  const trials = await prisma.freeTrialReq.findMany({
    where: {
      status: "pending",
      subject: {
        in: subjects,
      },
    },
    include: {
      preferredSlots: true,
    },
  });

  return trials;
}

async function getConfirmedFreeTrial(subjects: string[], teacherId: string) {
  const trials = await prisma.freeTrialReq.findMany({
    where: {
      status: "confirmed",
      subject: {
        in: subjects,
      },
      teacherId: teacherId,
    },
    include: {
      preferredSlots: true,
    },
    orderBy: [
      {
        date: "asc", // Sort by date in ascending order (today first)
      },
      {
        time: "asc", // Optionally, sort by time within the same date
      },
    ],
  });

  return trials;
}
const Page = async () => {
  const currentUser = await auth();
  if (!currentUser) redirect("/login");
  const user = await getUser(currentUser.user.id as string);
  const mySubjects = user?.subjects; // array of string

  if (!mySubjects) notFound();

  const matchingTrials = await getMatchingFreeTrials(mySubjects);
  const confirmedFreeTrials = await getConfirmedFreeTrial(
    mySubjects,
    currentUser.user.id as string
  );

  if (!user.grantId && !user.grantEmail) {
    return (
      <div className="min-h-[600px] flex flex-col justify-center items-center gap-y-5">
        <h1 className="text-primary text-3xl font-bold">
          Connect Your Calendar
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          Easily integrate your calendar to sync events, schedule meetings, and
          stay organized. Click the button below to securely connect your
          calendar via OAuth.
        </p>
        <Button>
          <Link href="/api/auth/nylas" className="flex items-center gap-x-2">
            <Calendar /> Connect Calendar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <div>
          <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
            Trial Requests
          </h2>
          <p className="text-tourHub-green-dark text-base mb-1">
            Manage your trial requests
          </p>
        </div>
        <FreeTrialRequestTableContainer
          data={matchingTrials}
          columns={FreeTrialReqColumns}
        />
      </div>
      <div>
        <div>
          <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
            Confirmed Trial Request
          </h2>
          <p className="text-tourHub-green-dark text-base mb-1">
            The student confirmed the trial request
          </p>
        </div>
        <FreeTrialRequestTableContainer
          data={confirmedFreeTrials}
          columns={ConfirmFreeTrialReqColumns}
        />
      </div>
    </div>
  );
};

export default Page;
