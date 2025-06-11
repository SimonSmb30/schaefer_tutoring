"use client";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("lehrer");
  const [exportStart, setExportStart] = useState("");
  const [exportEnd, setExportEnd] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedLehrer, setSelectedLehrer] = useState("");
  const [selectedSchueler, setSelectedSchueler] = useState("");

  // Demo-Daten
  const lehrer = [
    {
      id: 1,
      name: "Simon Schäfer",
      email: "simon@schaefertutoring.de",
      faecher: ["Mathematik", "Physik"],
      schuelerAnzahl: 8,
    },
    {
      id: 2,
      name: "Anna Fischer",
      email: "anna@schaefertutoring.de",
      faecher: ["Deutsch", "Englisch"],
      schuelerAnzahl: 6,
    },
    {
      id: 3,
      name: "Michael Weber",
      email: "michael@schaefertutoring.de",
      faecher: ["Chemie", "Biologie"],
      schuelerAnzahl: 5,
    },
  ];

  const schueler = [
    {
      id: 1,
      name: "Max Müller",
      email: "max@example.com",
      klasse: "10b",
      lehrer: ["Simon Schäfer", "Anna Fischer"],
    },
    {
      id: 2,
      name: "Lena Schmidt",
      email: "lena@example.com",
      klasse: "8a",
      lehrer: ["Simon Schäfer"],
    },
    {
      id: 3,
      name: "Tim Weber",
      email: "tim@example.com",
      klasse: "11c",
      lehrer: ["Michael Weber"],
    },
    {
      id: 4,
      name: "Sophie Becker",
      email: "sophie@example.com",
      klasse: "9d",
      lehrer: ["Anna Fischer"],
    },
  ];

  const zuordnungen = [
    { id: 1, lehrerId: 1, schuelerId: 1, fach: "Mathematik" },
    { id: 2, lehrerId: 2, schuelerId: 1, fach: "Deutsch" },
    { id: 3, lehrerId: 1, schuelerId: 2, fach: "Mathematik" },
    { id: 4, lehrerId: 3, schuelerId: 3, fach: "Chemie" },
    { id: 5, lehrerId: 2, schuelerId: 4, fach: "Englisch" },
  ];

  const stunden = [
    {
      id: 1,
      lehrer: "Simon Schäfer",
      schueler: "Max Müller",
      datum: "24.03.2025",
      startzeit: "16:00",
      fach: "Mathematik",
      status: "Geplant",
    },
    {
      id: 2,
      lehrer: "Anna Fischer",
      schueler: "Max Müller",
      datum: "25.03.2025",
      startzeit: "14:30",
      fach: "Deutsch",
      status: "Angefragt",
    },
    {
      id: 3,
      lehrer: "Simon Schäfer",
      schueler: "Lena Schmidt",
      datum: "20.03.2025",
      startzeit: "16:00",
      fach: "Mathematik",
      status: "Durchgeführt",
    },
    {
      id: 4,
      lehrer: "Michael Weber",
      schueler: "Tim Weber",
      datum: "26.03.2025",
      startzeit: "17:15",
      fach: "Chemie",
      status: "Angefragt",
    },
    {
      id: 5,
      lehrer: "Anna Fischer",
      schueler: "Sophie Becker",
      datum: "18.03.2025",
      startzeit: "14:30",
      fach: "Englisch",
      status: "Durchgeführt",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = (type: any) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const handleExport = () => {
    alert(
      `Daten für den Zeitraum vom ${exportStart} bis ${exportEnd} werden exportiert.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-blue-600 font-bold text-xl">
                Schäfer Tutoring
              </span>
              <span className="ml-4 text-gray-600">Admin-Bereich</span>
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
              Ausloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg">
          <nav className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab("lehrer")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "lehrer"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Lehrer
              </button>
              <button
                onClick={() => setActiveTab("schueler")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "schueler"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Schüler
              </button>
              <button
                onClick={() => setActiveTab("zuordnungen")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "zuordnungen"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Zuordnungen
              </button>
              <button
                onClick={() => setActiveTab("stunden")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "stunden"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Stunden
              </button>
              <button
                onClick={() => setActiveTab("export")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "export"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Export
              </button>
            </div>
          </nav>

          <div className="p-6">
            {/* Lehrer Tab */}
            {activeTab === "lehrer" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Lehrer Übersicht
                  </h2>
                  <button
                    onClick={() => openModal("lehrer")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Neuen Lehrer hinzufügen
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">E-Mail</th>
                        <th className="py-2 px-4 border-b text-left">Fächer</th>
                        <th className="py-2 px-4 border-b text-left">
                          Schüleranzahl
                        </th>
                        <th className="py-2 px-4 border-b text-left">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lehrer.map((lehrer) => (
                        <tr key={lehrer.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{lehrer.name}</td>
                          <td className="py-2 px-4 border-b">{lehrer.email}</td>
                          <td className="py-2 px-4 border-b">
                            {lehrer.faecher.join(", ")}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {lehrer.schuelerAnzahl}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                              Bearbeiten
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Löschen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Schüler Tab */}
            {activeTab === "schueler" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Schüler Übersicht
                  </h2>
                  <button
                    onClick={() => openModal("schueler")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Neuen Schüler hinzufügen
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">E-Mail</th>
                        <th className="py-2 px-4 border-b text-left">Klasse</th>
                        <th className="py-2 px-4 border-b text-left">Lehrer</th>
                        <th className="py-2 px-4 border-b text-left">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {schueler.map((schueler) => (
                        <tr key={schueler.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">
                            {schueler.name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {schueler.email}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {schueler.klasse}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {schueler.lehrer.join(", ")}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                              Bearbeiten
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Löschen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Zuordnungen Tab */}
            {activeTab === "zuordnungen" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Zuordnungen
                  </h2>
                  <button
                    onClick={() => openModal("zuordnung")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Neue Zuordnung erstellen
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Lehrer</th>
                        <th className="py-2 px-4 border-b text-left">
                          Schüler
                        </th>
                        <th className="py-2 px-4 border-b text-left">Fach</th>
                        <th className="py-2 px-4 border-b text-left">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {zuordnungen.map((zuordnung) => (
                        <tr key={zuordnung.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">
                            {lehrer.find((l) => l.id === zuordnung.lehrerId)
                              ?.name || ""}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {schueler.find((s) => s.id === zuordnung.schuelerId)
                              ?.name || ""}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {zuordnung.fach}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button className="text-red-600 hover:text-red-800">
                              Löschen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stunden Tab */}
            {activeTab === "stunden" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Stunden Übersicht
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter nach Status
                  </label>
                  <div className="flex space-x-4">
                    <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                      Alle
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                      Angefragt
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                      Geplant
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                      Durchgeführt
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Datum</th>
                        <th className="py-2 px-4 border-b text-left">
                          Startzeit
                        </th>
                        <th className="py-2 px-4 border-b text-left">Lehrer</th>
                        <th className="py-2 px-4 border-b text-left">
                          Schüler
                        </th>
                        <th className="py-2 px-4 border-b text-left">Fach</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stunden.map((stunde) => (
                        <tr key={stunde.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{stunde.datum}</td>
                          <td className="py-2 px-4 border-b">
                            {stunde.startzeit} Uhr
                          </td>
                          <td className="py-2 px-4 border-b">
                            {stunde.lehrer}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {stunde.schueler}
                          </td>
                          <td className="py-2 px-4 border-b">{stunde.fach}</td>
                          <td className="py-2 px-4 border-b">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                stunde.status === "Durchgeführt"
                                  ? "bg-green-100 text-green-800"
                                  : stunde.status === "Geplant"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {stunde.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export Tab */}
            {activeTab === "export" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Daten exportieren
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <p className="text-gray-700 mb-4">
                      Hier können Sie Daten für einen bestimmten Zeitraum
                      exportieren.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Startdatum
                        </label>
                        <input
                          type="date"
                          value={exportStart}
                          onChange={(e) => setExportStart(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enddatum
                        </label>
                        <input
                          type="date"
                          value={exportEnd}
                          onChange={(e) => setExportEnd(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exportformat
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="csv"
                          name="format"
                          value="csv"
                          defaultChecked
                          className="mr-2"
                        />
                        <label htmlFor="csv">CSV</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="excel"
                          name="format"
                          value="excel"
                          className="mr-2"
                        />
                        <label htmlFor="excel">Excel</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="pdf"
                          name="format"
                          value="pdf"
                          className="mr-2"
                        />
                        <label htmlFor="pdf">PDF</label>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    disabled={!exportStart || !exportEnd}
                  >
                    Daten exportieren
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals für Registrierung/Hinzufügen */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalType === "lehrer" && "Neuen Lehrer hinzufügen"}
                {modalType === "schueler" && "Neuen Schüler hinzufügen"}
                {modalType === "zuordnung" && "Neue Zuordnung erstellen"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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

            {/* Lehrer Form */}
            {modalType === "lehrer" && (
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fächer (kommagetrennt)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Speichern
                  </button>
                </div>
              </form>
            )}

            {/* Schüler Form */}
            {modalType === "schueler" && (
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Klasse
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Speichern
                  </button>
                </div>
              </form>
            )}

            {/* Zuordnung Form */}
            {modalType === "zuordnung" && (
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lehrer
                    </label>
                    <select
                      value={selectedLehrer}
                      onChange={(e) => setSelectedLehrer(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {lehrer.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schüler
                    </label>
                    <select
                      value={selectedSchueler}
                      onChange={(e) => setSelectedSchueler(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {schueler.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fach
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Mathematik">Mathematik</option>
                      <option value="Deutsch">Deutsch</option>
                      <option value="Englisch">Englisch</option>
                      <option value="Physik">Physik</option>
                      <option value="Chemie">Chemie</option>
                      <option value="Biologie">Biologie</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Speichern
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
