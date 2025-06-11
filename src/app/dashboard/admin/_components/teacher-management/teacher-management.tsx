import { prisma } from "@/lib/prisma";
import { TeacherColumns } from "./teacher-column";
import TeacherTableContainer from "./teacher-table-container";

const TeacherManagement = async () => {
  const teachers = await prisma.user.findMany({
    where: {
      role: "teacher",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="my-5">
      <TeacherTableContainer data={teachers ?? []} columns={TeacherColumns} />
    </div>
  );
};

export default TeacherManagement;
