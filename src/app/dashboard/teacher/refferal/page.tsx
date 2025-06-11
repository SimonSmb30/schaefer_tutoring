import { auth } from "@/auth";
import ReferralTracking from "@/components/local/referral-tracking";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Helper function to get the start of the day, month, or year
const getStartOfPeriod = (period: "day" | "month" | "year") => {
  const now = new Date();
  switch (period) {
    case "day":
      return new Date(now.setHours(0, 0, 0, 0));
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "year":
      return new Date(now.getFullYear(), 0, 1);
    default:
      throw new Error("Invalid period");
  }
};

// Calculate the timestamp for the start of today, this month, and this year
const startOfDay = getStartOfPeriod("day");
const startOfMonth = getStartOfPeriod("month");
const startOfYear = getStartOfPeriod("year");

const Page = async () => {
  const cs = await auth();

  if (!cs?.user) redirect("/login");
  const myRecomendation = await prisma.recommendation.findFirst({
    where: {
      creator: cs.user.id,
    },
  });

  const countTotalCompletedLesson = await prisma.lesson.count({
    where: {
      status: "carried_out",
      teacherId: cs.user.id,
    },
    take: 8,
  });

  let content;
  if (countTotalCompletedLesson < 8) {
    content = (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-2xl shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">Referral System Locked</h2>
        <p className="text-base">
          To reveal the referral system, you need to complete at least{" "}
          <span className="font-bold">8 lessons</span>.
        </p>
        <p className="mt-2 text-sm text-yellow-700">
          Completed: {countTotalCompletedLesson} / 8
        </p>
      </div>
    );
  } else if (myRecomendation) {
    // Fetch counts for today, this month, and this year using Prisma's `count`
    const todayCount = await prisma.participantJoin.count({
      where: {
        joinedAt: { gte: startOfDay },
        recommendationId: myRecomendation.id,
      },
    });

    const monthCount = await prisma.participantJoin.count({
      where: {
        joinedAt: { gte: startOfMonth },
        recommendationId: myRecomendation.id,
      },
    });

    const yearCount = await prisma.participantJoin.count({
      where: {
        joinedAt: { gte: startOfYear },
        recommendationId: myRecomendation.id,
      },
    });

    // Calculate the timestamp for 7 days ago
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const sevenDaysParticipants = await prisma.participantJoin.count({
      where: {
        joinedAt: { gte: sevenDaysAgo },
        recommendationId: myRecomendation.id,
      },
    });

    content = (
      <ReferralTracking
        sevenDays={sevenDaysParticipants}
        today={todayCount}
        month={monthCount}
        year={yearCount}
      />
    );
  } else {
    content = <ReferralTracking sevenDays={0} today={0} month={0} year={0} />;
  }

  return <div>{content}</div>;
};

export default Page;
