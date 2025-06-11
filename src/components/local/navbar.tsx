import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const role = session?.user?.role as "student" | "teacher" | "admin";

  return (
    <nav className="shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center  cursor-pointer">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            {!session && (
              <Button effect="gooeyLeft" asChild>
                <a href="#pricing">Free trial lesson</a>
              </Button>
            )}

            {session && (
              <Button
                effect="expandIcon"
                icon={ArrowRightIcon}
                iconPlacement="right"
                variant="outline"
                asChild
              >
                <Link href={`/dashboard/${role}`}>Dashboard</Link>
              </Button>
            )}
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">Log out</Button>
              </form>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;