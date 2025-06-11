import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import LessonCreateForm from "../../new/_components/lesson-create-form";

const Page = async ({ params }: { params: { id: string } }) => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");
  const subjects = await prisma.subject.findMany();
  const students = await prisma.user.findMany({
    where: {
      role: "student",
      pricingId: {
        not: null,
      },
      stripePaymentMethodId: {
        not: null,
      },
      stripeCustomerId: {
        not: null,
      },
    },
  });

  const myInfo = await prisma.user.findFirst({
    where: {
      id: currentUser.user.id,
    },
  });

  const mySubjects = myInfo?.subjects;

  const filteredSubjects = subjects.filter((s) => mySubjects?.includes(s.name));

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!lesson) notFound();
  return (
    <div>
      <LessonCreateForm
        initialData={lesson}
        subjects={filteredSubjects}
        students={students}
      />
    </div>
  );
};

export default Page;
