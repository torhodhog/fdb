"use client";

import { useState } from "react";
import { Home, ShoppingCart, Percent, Box, Menu, X } from "lucide-react";
import Link from "next/link";
import { User as UserType } from "@/payload-types";
import InstallAppButton from "./InstallAppButton";
import Cart from "./Cart";
import { trpc } from "@/trpc/client";
import { useAuth } from "@/hooks/use-auth";

const MobileNav = ({ user: initialUser }: { user: UserType | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();

  // Hent brukerinfo fra tRPC for å få oppdateringer
  const { data: meData } = trpc.auth.getMe.useQuery();
  const currentUser = meData?.user || initialUser;
  const isLoggedIn = Boolean(currentUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="lg:hidden">
      {" "}
      {/* Ensure this div is only shown on mobile devices */}
      <div className="fixed  top-0 w-full bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 z-[60] shadow-sm">
        <div className="flex items-center justify-between px-1 py-3 text-black dark:text-white min-h-[56px]">
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Åpne meny"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <div className="flex items-center space-x-1 mr-10">
            <Cart />
            <InstallAppButton />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-[55] flex flex-col justify-center items-center space-y-6 text-white">
          <Link href="/" onClick={toggleMenu} className="text-xl">
            Hjem
          </Link>
          <Link href="/products" onClick={toggleMenu} className="text-xl">
            Produkter
          </Link>
          <Link href="/Sale" onClick={toggleMenu} className="text-xl">
            Tilbud
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="text-xl">
            Kontakt oss
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/cart" onClick={toggleMenu} className="text-xl">
                Handlekurv
              </Link>
              <button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="text-xl"
              >
                Logg ut
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={toggleMenu} className="text-xl">
                Logg inn
              </Link>
              <Link href="/sign-up" onClick={toggleMenu} className="text-xl">
                Opprett konto
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
