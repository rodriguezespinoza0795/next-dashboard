"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Files, House, Users } from "lucide-react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: House },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Files,
  },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Button
            key={link.name}
            className={clsx(
              "grow bg-gray-50 hover:bg-sky-100 hover:text-blue-600 text-gray-600  md:flex-none md:justify-start",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
            size="lg"
            asChild
          >
            <Link href={link.href}>
              <LinkIcon />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Button>
        );
      })}
    </>
  );
}
