import TeacherManagement from "../_components/teacher-management/teacher-management";
import TeacherOverview from "../_components/teacher/teacher-overview";

const Page = () => {
  return (
    <div>
      <TeacherOverview />
      <TeacherManagement />
    </div>
  );
};

export default Page;
