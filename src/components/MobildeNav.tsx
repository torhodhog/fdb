"use client";

import { Home, ShoppingCart, Percent, Box } from "lucide-react";
import Link from "next/link";
import { User as UserType } from "@/payload-types";

const MobileNav = ({ user }: { user: UserType | null }) => {
  const isLoggedIn = Boolean(user);

  return (
    <div className="lg:hidden"> {/* Ensure this div is only shown on mobile devices */}
      <div className="fixed top-0 w-full bg-white bg-opacity-95 mt-10">
        <div className="flex justify-around items-center py-5 text-black">
          <Link href="/contact">Kontakt oss</Link>
          {!isLoggedIn && (
            <>
              <Link href="/sign-in">Logg inn</Link>
              <Link href="/sign-up">Opprett konto</Link>
            </>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full bg-gray-600  rounded-t-lg shadow-md transition-opacity duration-500">
        <div className="flex justify-around items-center py-5 text-white">
          <Link href="/">
            <Home className="h-6 w-6" />
          </Link>
          <Link href="/products">
            <Box className="h-6 w-6" />
          </Link>
          <Link href="/Sale">
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
