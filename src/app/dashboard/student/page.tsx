import { PricingSection } from "@/app/(website)/_components/pricing-section";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import StudentDashboardStats from "./_components/student-dashboard-stats";

const SchuelerDashboard = async () => {
  const cu = await auth();

  if (!cu?.user.id) redirect("/login");

  const now = new Date();

  // Start of today (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Start of tomorrow (00:00:00 of the next day)
  const startOfTomorrow = new Date(startOfDay);
  startOfTomorrow.setDate(startOfDay.getDate() + 1);

  const todayLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      date: {
        gte: startOfDay,
        lt: startOfTomorrow,
      },
    },
  });
  const totalCompletedLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      status: "carried_out",
    },
  });
  const totalPlannedLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      status: "planned",
    },
  });

  const pricing = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    include: {
      pricing: true,
    },
  });

  const userPurchased = pricing?.pricingId;

  const subscription = await prisma.pricing.findMany();

  return (
    <div>
      <StudentDashboardStats
        todaysLessons={todayLesson}
        completedLessons={totalCompletedLesson}
        plannedSessions={totalPlannedLesson}
        pricing={pricing?.pricing || undefined}
      />

      {!userPurchased && (
        <PricingSection
          data={subscription}
          isLoggedIn={!!cu}
          purchasedPlan={userPurchased as string}
        />
      )}

      {totalCompletedLesson > 3 && (
        <Card className="border rounded-lg hover:shadow-md transition-shadow mx-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 text-blue-500 mr-2" />
              Rate Your Experience
            </CardTitle>
            <CardDescription>Share your overall satisfaction</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm">
              Rate your tutoring sessions and overall platform experience.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
              <Link href="/feedback" className="w-full">
                Give Rating
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SchuelerDashboard;
