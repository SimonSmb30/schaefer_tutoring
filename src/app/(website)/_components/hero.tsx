"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) return null;
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-left text-gray-900 leading-tight mb-4">
            Individuelles Lernen,{" "}
            <span className="text-primary">bessere Noten</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Wir bieten qualitativ hochwertige Nachhilfe für Schüler aller
            Altersstufen. Unsere erfahrenen Tutoren helfen dir, deine Ziele zu
            erreichen.
          </p>

          {/* <p className="text-lg text-gray-600 mb-6">
            <span className="font-bold text-primary">Schäfer Tutoring</span> ist
            ein Zusammenschluss von Studenten aus Mannheim, die ihre
            akademischen Stärken nutzen, um Schülern{" "}
            <span className="font-bold text-primary">
              qualitativ hochwertige Nachhilfe
            </span>{" "}
            anzubieten.
          </p> */}
          <p className="text-lg text-gray-600 mb-6">
            Unser Team aus Fachexperten verschiedener Disziplinen bietet{" "}
            <span className="font-bold text-primary">
              maßgeschneiderte Lernpläne
            </span>{" "}
            und ein tiefes Verständnis für die Herausforderungen des
            Schulalltags – für nachhaltige Lernerfolge.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="shrink-0 h-[180px] w-[180px] relative">
              <Image
                src="https://res.cloudinary.com/drdztqgcx/image/upload/v1742875602/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e_wdvvm3.jpg"
                alt="Simon Schäfer"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-3">Simon Schäfer</h2>
              <p className="text-slate-800">
                Als Gründer bringe{" "}
                <span className="text-primary font-medium">
                  ich, Simon Schäfer
                </span>
                , meine Erfahrung als{" "}
                <span className="text-primary font-medium">
                  Wirtschaftsingenieurstudent
                </span>{" "}
                und{" "}
                <span className="text-primary font-medium">
                  3 Jahre Nachhilfepraxis
                </span>{" "}
                ein. Ich habe es mir zur Aufgabe gemacht, Schüler effektiv auf
                ihre Prüfungen vorzubereiten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
