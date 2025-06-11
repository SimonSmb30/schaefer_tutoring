import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ReviewColumns } from "./_components/review-column";
import ReviewTableContainer from "./_components/review-table-container";

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;

async function getData(): Promise<ReviewWithUser[]> {
  const data = await prisma.review.findMany({
    include: {
      user: true,
    },
  });

  return data;
}

const Page = async () => {
  const data = await getData();

  return (
    <div>
      <ReviewTableContainer data={data ?? []} columns={ReviewColumns} />
    </div>
  );
};

export default Page;
