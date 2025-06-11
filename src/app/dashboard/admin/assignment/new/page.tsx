import { prisma } from "@/lib/prisma";
import AdminAssignmentForm from "./_components/admin-assignment-form";

const page = async () => {
  const teachers = await prisma.user.findMany({
    where: {
      role: "teacher",
    },
    select: {
      name: true,
      id: true,
    },
  });
  return (
    <div>
      <AdminAssignmentForm teachers={teachers} />
    </div>
  );
};

export default page;
