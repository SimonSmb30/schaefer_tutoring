import ReviewCard from "./reviewCard";

const Testmonial = async () => {
  // Mock reviews data
  const reviews = [
    {
      id: "1",
      message: "Die Nachhilfe hat mir sehr geholfen, meine Noten in Mathematik zu verbessern. Mein Tutor erklärt alles sehr geduldig und verständlich.",
      rating: 5,
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        name: "Max Müller",
        image: "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg",
        role: "student"
      }
    },
    {
      id: "2",
      message: "Seit ich bei Schäfer Tutoring bin, habe ich viel mehr Selbstvertrauen in Englisch. Die Lehrer sind sehr kompetent und freundlich.",
      rating: 5,
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        name: "Lisa Schmidt",
        image: "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg",
        role: "student"
      }
    },
    {
      id: "3",
      message: "Ich kann Schäfer Tutoring nur empfehlen! Die flexible Terminplanung passt perfekt zu meinem vollen Stundenplan.",
      rating: 4,
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        name: "Thomas Weber",
        image: "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg",
        role: "student"
      }
    }
  ];

  if (reviews.length === 0) return;
  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-12">
          Was unsere Schüler sagen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} data={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testmonial;