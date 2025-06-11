import Footer from "@/components/local/footer";
import Navbar from "@/components/local/navbar";
import { ReactNode } from "react";

export default async function WebsiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
