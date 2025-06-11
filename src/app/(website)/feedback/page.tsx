import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReviewCreateForm from "./_components/review-create-form";

const Page = async () => {
  const cu = await auth();

  if (!cu) redirect("/login");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ReviewCreateForm />
    </div>
  );
};

export default Page;
