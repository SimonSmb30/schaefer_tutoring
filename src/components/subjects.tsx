import { Badge } from "@/components/ui/badge";

const Subjects = () => {
  const subjects = [
    { id: "1", name: "Mathematik" },
    { id: "2", name: "Physik" },
    { id: "3", name: "Chemie" },
    { id: "4", name: "Deutsch" },
    { id: "5", name: "Englisch" },
    { id: "6", name: "Biologie" },
    { id: "7", name: "Geschichte" },
    { id: "8", name: "Französisch" }
  ];

  return (
    <section id="subjects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Unsere Fächer
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pt-8">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex justify-center">
              <Badge 
                variant="outline" 
                className="py-3 px-4 text-center justify-center inline-flex items-center rounded-[50px] border text-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {subject.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;