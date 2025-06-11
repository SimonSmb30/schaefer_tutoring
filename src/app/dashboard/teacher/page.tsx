// Sample data for past lessons

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherStatsDashboard from "./_components/teacher-stats";

export default async function Page() {
  const cu = await auth();
  if (!cu?.user.id) redirect("/login");
  const now = new Date();

  // Start of today (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Start of tomorrow (00:00:00 of the next day)
  const startOfTomorrow = new Date(startOfDay);
  startOfTomorrow.setDate(startOfDay.getDate() + 1);

  const totalFreeTrialCompleted = await prisma.freeTrialReq.count({
    where: {
      teacherId: cu.user.id,
      status: "completed",
    },
  });

  const totalLessonCompleted = await prisma.lesson.count({
    where: {
      teacherId: cu.user.id,
      status: "carried_out",
    },
  });

  const totalLessonPending = await prisma.lesson.count({
    where: {
      teacherId: cu.user.id,
      status: "accepted",
    },
  });

  const todayLesson = await prisma.lesson.count({
    where: {
      teacherId: cu.user.id,
      date: {
        gte: startOfDay,
        lt: startOfTomorrow,
      },
    },
  });

  return (
    <TeacherStatsDashboard
      freeTrialCompleted={totalFreeTrialCompleted}
      lessonsCompleted={totalLessonCompleted}
      lessonsPending={totalLessonPending}
      todayLessons={todayLesson}
    />
  );
}
