"use client";

import { useState } from "react";
import { Home, ShoppingCart, Percent, Box, Menu, X } from "lucide-react";
import Link from "next/link";
import { User as UserType } from "@/payload-types";

const MobileNav = ({ user }: { user: UserType | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = Boolean(user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="lg:hidden"> {/* Ensure this div is only shown on mobile devices */}
      <div className="fixed top-0 w-full bg-white bg-opacity-95 z-50">
        <div className="flex justify-between items-center p-5 text-black">
          <Link href="/">
            <Home className="h-6 w-6" />
          </Link>
          <button onClick={toggleMenu} className="text-black">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex flex-col justify-center items-center space-y-6 text-white">
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
            <Link href="/cart" onClick={toggleMenu} className="text-xl">
              Handlekurv
            </Link>
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
