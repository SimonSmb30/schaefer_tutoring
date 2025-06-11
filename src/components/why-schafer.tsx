const WhySchafer = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-12">
          Warum Schäfer Tutoring?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg animate-in duration-500 transition-all">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Qualifizierte Tutoren
            </h3>
            <p className="text-gray-600">
              Unsere Tutoren sind Fachexperten und haben Erfahrung im
              Unterrichten von Schülern aller Altersstufen.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg animate-in duration-500 transition-all">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexible Zeiten
            </h3>
            <p className="text-gray-600">
              Wir passen uns deinem Zeitplan an. Lerne, wann es für dich am
              besten passt, auch am Wochenende.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg animate-in duration-500 transition-all">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Persönlicher Lernplan
            </h3>
            <p className="text-gray-600">
              Jeder Schüler ist anders. Wir erstellen individualisierte
              Lernpläne basierend auf deinen Bedürfnissen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySchafer;