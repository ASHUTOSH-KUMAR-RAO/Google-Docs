import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./searchinput";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 w-full px-4 border-b border-gray-200 bg-white shadow-sm">
      {/* Left Side - Logo & Brand */}
      <div className="flex gap-3 items-center shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.svg"
            alt="Docs Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
            Docs
          </h1>
        </Link>
      </div>
      <SearchInput/>
      <UserButton/>
    </nav>
  );
};
