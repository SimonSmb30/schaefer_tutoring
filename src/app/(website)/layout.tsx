import Footer from "@/components/local/footer";
import Navbar from "@/components/local/navbar";
import { auth } from "@/auth";
import { ReactNode } from "react";

export default async function WebsiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <div>
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
}