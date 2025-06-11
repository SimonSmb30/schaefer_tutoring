import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const subjects = [
    "Mathematik",
    "Physik", 
    "Chemie",
    "Deutsch",
    "Englisch",
    "Biologie",
    "Geschichte",
    "Französisch"
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2 fill-current" />
              #1 Nachhilfe-Plattform in Deutschland
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Bessere Noten
                <span className="block text-blue-600">beginnen hier</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Qualifizierte Tutoren, flexible Zeiten und personalisierte Lernpläne. 
                Erreiche deine Ziele mit Schäfer Tutoring.
              </p>
            </div>

            {/* Subject Selection & CTA */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Wähle dein Fach für eine kostenlose Probestunde</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <select className="w-full h-14 text-lg border-2 border-gray-200 hover:border-blue-300 transition-colors rounded-md px-3 bg-white">
                      <option value="">Fach auswählen...</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    asChild
                  >
                    <Link href="/#pricing">
                      Probestunde anfragen
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Zufriedene Schüler</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Erfolgsrate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Bewertung</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/drdztqgcx/image/upload/v1742875602/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e_wdvvm3.jpg"
                    alt="Simon Schäfer - Gründer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Simon Schäfer</h3>
                  <p className="text-gray-600">Gründer & Wirtschaftsingenieur</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 -left-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
              <Users className="w-4 h-4 inline mr-1" />
              Live: 23 Schüler online
            </div>
            
            <div className="absolute bottom-10 -right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              ✨ 3 Jahre Erfahrung
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm mb-6">Vertraut von Schülern und Eltern</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Mannheim</div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="text-2xl font-bold text-gray-400">Heidelberg</div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="text-2xl font-bold text-gray-400">Karlsruhe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;