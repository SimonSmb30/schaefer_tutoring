import { Lesson, User } from "@prisma/client";
import StudentRequestCard from "./student-request-card";

type StudentWithLessons = User & {
  studentLessons: Lesson[];
};

interface Props {
  students: StudentWithLessons[];
}

const StudentRequestContainer = ({ students }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {students.map((student) => (
        <StudentRequestCard key={student.id} data={student} />
      ))}
    </div>
  );
};

export default StudentRequestContainer;
