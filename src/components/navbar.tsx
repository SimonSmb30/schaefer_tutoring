import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button effect="gooeyLeft">
              <a href="#pricing">Kostenlose Probestunde</a>
            </Button>
            <Button variant="outline">
              Anmelden
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;