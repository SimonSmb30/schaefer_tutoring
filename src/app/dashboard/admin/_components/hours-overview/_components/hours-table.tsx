import { Lesson } from "@prisma/client";
import moment from "moment";
import StatusBadge from "./status-badge";

interface Teacher {
  name: string;
}

interface Student {
  name: string;
}
interface Subject {
  name: string;
}

interface HoursTableProps {
  hours: (Lesson & {
    teacher: Teacher;
    student: Student;
    subject: Subject;
  })[];
}

export default function HoursTable({ hours }: HoursTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Date</th>
            <th className="py-3 px-4 text-left font-medium">Start time</th>
            <th className="py-3 px-4 text-left font-medium">Teacher</th>
            <th className="py-3 px-4 text-left font-medium">Pupils</th>
            <th className="py-3 px-4 text-left font-medium">
              Academic subject
            </th>
            <th className="py-3 px-4 text-left font-medium">status</th>
          </tr>
        </thead>
        <tbody>
          {hours.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-4 px-4 text-center text-muted-foreground"
              >
                No hours found
              </td>
            </tr>
          ) : (
            hours?.map((hour) => (
              <tr key={hour.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 ">
                  {moment(hour.date).format("DD/MM/YYYY")}
                </td>
                <td className="py-3 px-4">{hour.time}</td>
                <td className="py-3 px-4">{hour.teacher.name}</td>
                <td className="py-3 px-4">{hour.student.name}</td>
                <td className="py-3 px-4">{hour.subject.name}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={hour.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
