import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherRequestContainer from "./_components/TeacherRequestContainer";

const Page = async () => {
  const cu = await auth();

  if (!cu?.user.id) redirect("/login");
  const myTeachers = await prisma.connection.findMany({
    where: {
      studentId: cu.user.id,
    },
    select: {
      teacherId: true,
    },
  });

  const teacherIds = myTeachers.map((item) => item.teacherId);

  const allTeachers = await prisma.user.findMany({
    where: {
      role: "teacher",
      id: {
        notIn: teacherIds,
      },
    },
    include: {
      teacherLessons: true,
    },
  });
  return (
    <div>
      <div>
        <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
          All Teachers
        </h2>
        <p className="text-tourHub-green-dark text-base mb-1">
          Request to get a teacher
        </p>
      </div>

      <TeacherRequestContainer teachers={allTeachers ?? []} />
    </div>
  );
};

export default Page;
