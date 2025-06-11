"use client";
import { useState } from "react";

const EinfachesDashboard = () => {
  // Demo-Daten
  const vergangeneStunden = [
    {
      id: 1,
      schüler: "Max Müller",
      datum: "20.03.2025",
      uhrzeit: "16:00-17:30",
      fach: "Mathematik",
    },
    {
      id: 2,
      schüler: "Lena Schmidt",
      datum: "18.03.2025",
      uhrzeit: "14:30-16:00",
      fach: "Englisch",
    },
    {
      id: 3,
      schüler: "Tim Weber",
      datum: "15.03.2025",
      uhrzeit: "17:15-18:45",
      fach: "Physik",
    },
  ];

  const geplanteStunden = [
    {
      id: 1,
      schüler: "Max Müller",
      datum: "24.03.2025",
      uhrzeit: "16:00-17:30",
      fach: "Mathematik",
    },
    {
      id: 2,
      schüler: "Lena Schmidt",
      datum: "25.03.2025",
      uhrzeit: "14:30-16:00",
      fach: "Englisch",
    },
    {
      id: 3,
      schüler: "Tim Weber",
      datum: "26.03.2025",
      uhrzeit: "17:15-18:45",
      fach: "Physik",
    },
  ];

  const [showNeueBuchung, setShowNeueBuchung] = useState(false);
  const [neueStunde, setNeueStunde] = useState({
    schüler: "",
    datum: "",
    uhrzeit: "09:00",
  });

  const uhrzeiten = [
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNeueStunde({
      ...neueStunde,
      [name]: value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Hier würde normalerweise die Logik zum Speichern der neuen Stunde stehen
    alert(
      "Neue Stunde gebucht: " +
        neueStunde.schüler +
        " am " +
        neueStunde.datum +
        " um " +
        neueStunde.uhrzeit +
        " Uhr"
    );
    setNeueStunde({
      schüler: "",
      datum: "",
      uhrzeit: "09:00",
    });
    setShowNeueBuchung(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Hallo, Simon Schäfer</span>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                Ausloggen
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Mein Dashboard</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => setShowNeueBuchung(true)}
            >
              Neue Stunde buchen
            </button>
          </div>

          {showNeueBuchung && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Neue Stunde buchen</h3>
                  <button
                    onClick={() => setShowNeueBuchung(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Schüler
                      </label>
                      <select
                        name="schüler"
                        value={neueStunde.schüler}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Max Müller">Max Müller</option>
                        <option value="Lena Schmidt">Lena Schmidt</option>
                        <option value="Tim Weber">Tim Weber</option>
                        <option value="Sophie Becker">Sophie Becker</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Datum
                      </label>
                      <input
                        type="date"
                        name="datum"
                        value={neueStunde.datum}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Startzeit
                      </label>
                      <select
                        name="uhrzeit"
                        value={neueStunde.uhrzeit}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        {uhrzeiten.map((zeit) => (
                          <option key={zeit} value={zeit}>
                            {zeit} Uhr
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Stunden dauern immer 60 Minuten
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                      Stunde buchen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Geplante Stunden</h3>
            {geplanteStunden.length === 0 ? (
              <p className="text-gray-500">Keine geplanten Stunden.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Schüler</th>
                      <th className="py-2 px-4 border-b text-left">Datum</th>
                      <th className="py-2 px-4 border-b text-left">
                        Startzeit
                      </th>
                      <th className="py-2 px-4 border-b text-left">Fach</th>
                      <th className="py-2 px-4 border-b text-left">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geplanteStunden.map((stunde) => (
                      <tr key={stunde.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{stunde.schüler}</td>
                        <td className="py-2 px-4 border-b">{stunde.datum}</td>
                        <td className="py-2 px-4 border-b">
                          {stunde.uhrzeit.split("-")[0]}
                        </td>
                        <td className="py-2 px-4 border-b">{stunde.fach}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex flex-col space-y-1">
                            <button className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                              Verschieben
                            </button>
                            <button className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                              Absagen
                            </button>
                            <button className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                              Zur Stunde
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Vergangene Stunden</h3>
            {vergangeneStunden.length === 0 ? (
              <p className="text-gray-500">Keine vergangenen Stunden.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Schüler</th>
                      <th className="py-2 px-4 border-b text-left">Datum</th>
                      <th className="py-2 px-4 border-b text-left">
                        Startzeit
                      </th>
                      <th className="py-2 px-4 border-b text-left">Fach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vergangeneStunden.map((stunde) => (
                      <tr key={stunde.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{stunde.schüler}</td>
                        <td className="py-2 px-4 border-b">{stunde.datum}</td>
                        <td className="py-2 px-4 border-b">
                          {stunde.uhrzeit.split("-")[0]}
                        </td>
                        <td className="py-2 px-4 border-b">{stunde.fach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EinfachesDashboard;
