import { prisma } from "@/lib/prisma";
import { StudentColumns } from "./student-column";
import StudentTableContainer from "./student-table-container-";

const StudentManagement = async () => {
  const student = await prisma.user.findMany({
    where: {
      role: "student",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="my-5">
      <StudentTableContainer data={student ?? []} columns={StudentColumns} />
    </div>
  );
};

export default StudentManagement;
