"use client";

import { Role } from "@prisma/client";
// Packages
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";
import { Tab } from "./data";

// Define the props for DashboardContent
interface DashboardContentProps {
  children: ReactNode;
  role: Role;
  tabLists: Tab[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  children,
  role,
  tabLists,
}) => {
  const pathname = usePathname();

  // Filter tabs based on the user's role
  const filteredTabs = tabLists.filter((tab) => tab.roles.includes(role));

  return (
    <div>
      <div className="md:hidden flex items-center gap-x-3 mb-4">
        {filteredTabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.path}
            className={clsx(
              "rounded-lg p-2 text-gray-500 transition-all hover:text-gray-900 border border-white",
              {
                "rounded-lg bg-gray-200 p-2 text-gray-900  transition-all hover:text-gray-900 border border-tourHub-title":
                  pathname === tab.path,
              }
            )}
          >
            {tab.icon}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};

export default DashboardContent;
