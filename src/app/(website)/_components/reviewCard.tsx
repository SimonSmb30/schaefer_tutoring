import { Badge } from "@/components/ui/badge";
import { Review, Role } from "@prisma/client";
import Image from "next/image";

interface ReviewWithUser extends Review {
  user: {
    name: string | null;
    image: string | null;
    role: Role;
  };
}

interface Props {
  data: ReviewWithUser;
}

const ReviewCard = ({ data }: Props) => {
  const image =
    data.user.image ??
    "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold relative">
          <Image src={image} fill alt="profile" className="rounded-full" />
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-x-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {data.user.name || "Unknown User"}
            </h3>
            <Badge>{data.user.role}</Badge>
          </div>

          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  i < data.rating ? "text-yellow-400" : "text-gray-300"
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
      <p className="text-gray-600">{data.message}</p>
    </div>
  );
};

export default ReviewCard;
