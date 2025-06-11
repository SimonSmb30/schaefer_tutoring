import Image from "next/image";

const Hero = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Hauptüberschrift */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Individuelles Lernen, 
          <span className="text-blue-600 block">bessere Noten</span>
        </h1>
        
        {/* Beschreibung */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Qualitativ hochwertige Nachhilfe für Schüler aller Altersstufen. 
          Unsere erfahrenen Tutoren helfen dir, deine Ziele zu erreichen.
        </p>

        {/* Call-to-Action Button */}
        <div className="mb-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Kostenlose Probestunde buchen
          </button>
        </div>

        {/* Einfaches Profil */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/drdztqgcx/image/upload/v1742875602/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e_wdvvm3.jpg"
                alt="Simon Schäfer"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Simon Schäfer</h3>
              <p className="text-gray-600">
                Wirtschaftsingenieurstudent mit 3 Jahren Nachhilfepraxis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;