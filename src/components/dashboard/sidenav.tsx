import Link from "next/link";
import NavLinks from "@/components/dashboard/nav-links";
import AcmeLogo from "@/components/AcmeLogo";
import { signOut } from "@/auth.config";
import { Button } from "../ui/button";
import { PowerIcon } from "lucide-react";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button
            className="bg-gray-50 hover:bg-sky-100 hover:text-blue-600 text-gray-600 w-full  md:flex-none md:justify-start"
            size="lg"
          >
            <PowerIcon />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form>
      </div>
    </div>
  );
}
