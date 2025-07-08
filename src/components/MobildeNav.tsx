"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Percent, Box, Menu, X } from "lucide-react";
import Link from "next/link";
import { User as UserType } from "@/payload-types";
import InstallAppButton from "./InstallAppButton";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";

const MobileNav = ({ user }: { user: UserType | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = Boolean(user);
  const { signOut } = useAuth();
  const { items } = useCart();
  const itemCount = isMounted ? items.length : 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sticky mobile navbar - always visible */}
      <div className="sticky top-0 lg:hidden w-full bg-white z-50 shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Right side: Cart + Install */}
          <div className="flex items-center space-x-3">
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
            <InstallAppButton />
          </div>
        </div>
      </div>
      {/* Fullscreen menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 lg:hidden">
          <div className="flex flex-col justify-center items-center h-full space-y-8 text-white">
            <Link 
              href="/" 
              onClick={toggleMenu} 
              className="text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              Hjem
            </Link>
            <Link 
              href="/products" 
              onClick={toggleMenu} 
              className="text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              Produkter
            </Link>
            <Link 
              href="/Sale" 
              onClick={toggleMenu} 
              className="text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              Tilbud
            </Link>
            <Link 
              href="/contact" 
              onClick={toggleMenu} 
              className="text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              Kontakt oss
            </Link>

            {isLoggedIn ? (
              <>
                <Link 
                  href="/cart" 
                  onClick={toggleMenu} 
                  className="text-2xl font-medium hover:text-gray-300 transition-colors"
                >
                  Handlekurv
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="text-2xl font-medium hover:text-gray-300 transition-colors"
                >
                  Logg ut
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/sign-in" 
                  onClick={toggleMenu} 
                  className="text-2xl font-medium hover:text-gray-300 transition-colors"
                >
                  Logg inn
                </Link>
                <Link 
                  href="/sign-up" 
                  onClick={toggleMenu} 
                  className="text-2xl font-medium hover:text-gray-300 transition-colors"
                >
                  Opprett konto
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
