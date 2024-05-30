"use client";

import { Home, ShoppingCart, Percent, Box } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User as UserType } from "@/payload-types";

type User = UserType & {
  name?: string; // name is optional
};

const MobileNav = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const isLoggedIn = !!user && !!user.email;

  console.log('User:', user);  // Debugging: Log user object

  return (
    <div>
      <div className="fixed top-0 w-full bg-white bg-opacity-95 lg:hidden mt-10">
        <div className="flex justify-around items-center py-5 text-black">
          <Link href="/contact">Kontakt oss</Link>
          {!isLoggedIn ? (
            <>
              <Link href="/sign-in">Logg inn</Link>
              <Link href="/sign-up">Opprett konto</Link>
            </>
          ) : (
            <Link href="/profile"></Link>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full bg-gray-600 bg-opacity-95 rounded-t-lg shadow-md lg:hidden transition-opacity duration-500">
        <div className="flex justify-around items-center py-5 text-white">
          <Link href="/">
            <Home className="h-6 w-6" />
          </Link>
          <Link href="/products">
            <Box className="h-6 w-6" />
          </Link>
          <Link href="/sale">
            <Percent className="h-6 w-6" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;



