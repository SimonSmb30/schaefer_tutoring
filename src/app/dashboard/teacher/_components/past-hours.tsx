import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { filterLessonsByPasthours } from "@/lib/lessonUtils";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import moment from "moment";
import { redirect } from "next/navigation";

const PastTeacherHours = async () => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ); // Start of today (00:00:00)
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const session = await requireUser();
  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      teacherId: session.user.id,
      AND: {
        date: {
          gte: startOfDay, // Greater than or equal to the start of today
          lt: endOfDay, // Less than the start of tomorrow
        },
        status: "accepted",
      },
    },
    include: {
      student: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          name: true,
        },
      },
      subject: {
        select: {
          name: true,
        },
      },
    },
  });

  const { pastHours } = filterLessonsByPasthours(data);

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Past hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pupils</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Academic subject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastHours.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell className="font-medium">
                {lesson.student.name}
              </TableCell>
              <TableCell>
                {moment(lesson.date).format("MMMM D, YYYY")}
              </TableCell>
              <TableCell>{lesson.time}</TableCell>
              <TableCell>{lesson.subject.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PastTeacherHours;
