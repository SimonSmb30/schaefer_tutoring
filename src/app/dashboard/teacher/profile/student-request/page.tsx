import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentRequestContainer from "./_components/students-request-container";

const Page = async () => {
  const cu = await auth();

  if (!cu?.user.id) redirect("/login");
  const myStudents = await prisma.connection.findMany({
    where: {
      teacherId: cu.user.id,
    },
    select: {
      studentId: true,
    },
  });

  const studentsIds = myStudents.map((item) => item.studentId);

  const allStudents = await prisma.user.findMany({
    where: {
      role: "student",
      id: {
        notIn: studentsIds,
      },
    },
    include: {
      studentLessons: true,
    },
  });
  return (
    <div>
      <div>
        <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
          All Students
        </h2>
        <p className="text-tourHub-green-dark text-base mb-1">
          Request to get a student
        </p>
      </div>

      <StudentRequestContainer students={allStudents ?? []} />
    </div>
  );
};

export default Page;
