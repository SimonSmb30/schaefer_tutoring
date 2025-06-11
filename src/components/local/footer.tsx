const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
          <ul className="space-y-2 text-gray-400">
            <li>onlinenachhilfe30@gmail.com</li>
            <li>+491627477536</li>
            <li>Speyerer Straße 51, 68199 Mannheim</li>
          </ul>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Schäfer Tutoring. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
