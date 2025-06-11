import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MyTeacherContainer from "./_components/my-teacher-container";
import ProfileForm from "./_components/profile-form";

const Page = async () => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.user.id,
    },
  });

  const myConnections = await prisma.connection.findMany({
    where: {
      studentId: currentUser.user.id,
    },
    select: {
      teacherId: true,
    },
  });

  const teacherIds = myConnections.map((item) => item.teacherId);

  const myTeachers = await prisma.user.findMany({
    where: {
      id: {
        in: teacherIds,
      },
    },
    include: {
      teacherLessons: true,
    },
  });

  return (
    <div>
      <ProfileForm user={user!} />

      <div className="mt-8 border rounded-lg p-6">
        <MyTeacherContainer data={myTeachers} />
      </div>
    </div>
  );
};

export default Page;
