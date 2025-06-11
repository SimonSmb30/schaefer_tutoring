import SubjectPill from "@/app/dashboard/admin/_components/subjects/subject-pill";
import { mockSubjects } from "../../../../lib/mockData";

const Subjects = async () => {
  const subjects = mockSubjects;

  if (subjects.length == 0) return;
  return (
    <section id="subjects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our subjects
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pt-8">
          {subjects.map((item) => (
            <SubjectPill data={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;