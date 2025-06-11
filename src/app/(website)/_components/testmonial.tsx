import { prisma } from "@/lib/prisma";
import ReviewCard from "./reviewCard";

const Testmonial = async () => {
  const reviews = await prisma.review.findMany({
    where: {
      approved: true,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          role: true,
        },
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

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
