import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import WelcomeMessage from "./_components/welcome-message";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
      isGreeting: false,
    },
  });

  if (!user) redirect("/");

  await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      isGreeting: true,
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <WelcomeMessage
        role={user.role as "teacher" | "student"}
        isGratings={user.isGreeting}
      />
    </div>
  );
};

export default Page;
