import { Lesson, User } from "@prisma/client";
import TeacherRequestCard from "./teacher-request-card";

type StudentWithLessons = User & {
  teacherLessons: Lesson[];
};

interface Props {
  teachers: StudentWithLessons[];
}

const TeacherRequestContainer = ({ teachers }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {teachers.map((teacher) => (
        <TeacherRequestCard key={teacher.id} data={teacher} />
      ))}
    </div>
  );
};

export default TeacherRequestContainer;
