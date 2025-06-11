import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "../ui/button";

const DashboardNav = async () => {
  const session = await auth();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto ">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center  cursor-pointer">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            {session && (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">Log out</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
