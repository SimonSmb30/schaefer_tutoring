import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const Testimonials = () => {
  const reviews = [
    {
      id: "1",
      message: "Die Nachhilfe hat mir sehr geholfen, meine Noten in Mathematik zu verbessern. Mein Tutor erklärt alles sehr geduldig und verständlich.",
      rating: 5,
      user: {
        name: "Max Müller",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
        role: "student"
      }
    },
    {
      id: "2",
      message: "Seit ich bei Schäfer Tutoring bin, habe ich viel mehr Selbstvertrauen in Englisch. Die Lehrer sind sehr kompetent und freundlich.",
      rating: 5,
      user: {
        name: "Lisa Schmidt",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
        role: "student"
      }
    },
    {
      id: "3",
      message: "Ich kann Schäfer Tutoring nur empfehlen! Die flexible Terminplanung passt perfekt zu meinem vollen Stundenplan.",
      rating: 4,
      user: {
        name: "Thomas Weber",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
        role: "student"
      }
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-12">
          Was unsere Schüler sagen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold relative">
                  <Image src={review.user.image} fill alt="profile" className="rounded-full" />
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.user.name}
                    </h3>
                    <Badge>{review.user.role}</Badge>
                  </div>

                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;