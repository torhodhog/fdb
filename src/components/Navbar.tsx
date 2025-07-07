"use client";

import { User as UserType } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Importer next/image for å vise flagg
import Cart from "./Cart";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobildeNav";
// Sørg for at importen er korrekt her
import { ModeToggle } from "./ModeToggle";
import NavItems from "./NavItems";
import ClientSearchbarWrapper from "./ClientSearchbarWrapper";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import InstallAppButton from "./InstallAppButton";
import { trpc } from "@/trpc/client";

const Navbar = () => {
  const { data: userResponse, isLoading } = trpc.auth.getMe.useQuery();
  const user = userResponse?.user;

  // Prevent hydration mismatch by showing loading state initially
  if (isLoading) {
    return (
      <div className="top-0 inset-x-0 z-50 sticky bg-white">
        <header className="relative bg-transparent lg:bg-background">
          <MaxWidthWrapper>
            <div className="border-b border-gray-200">
              <div className="flex h-28 items-center">
                <div className="ml-4 hidden lg:flex lg:ml-0">
                  <Link href="/">
                    <Icons.logo className="h-8 w-10" />
                  </Link>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    );
  }

  return (
    <div className="top-0 inset-x-0 z-50 sticky bg-white">
      <header className="relative bg-transparent lg:bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-28 items-center">
              <MobileNav user={user as UserType | null} />

              <div className="ml-4 hidden lg:flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-8 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <ClientSearchbarWrapper />

              <div className="ml-auto flex items-center">
                <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <div className="hidden lg:flex">
                      <Link
                        href="/sign-in"
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        Logg inn
                      </Link>
                    </div>
                  )}

                  {user && (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  <div
                    className="ml-8 hidden lg:flex flex-row flex-auto space-x-4 lg:ml-6"
                    suppressHydrationWarning
                  >
                    <InstallAppButton />
                    <Cart />
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
