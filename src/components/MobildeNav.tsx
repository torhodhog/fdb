"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X, Home, ShoppingCart, Tag, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

//   useEffect(() => {
//     if (isOpen) document.body.classList.add("overflow-hidden");
//     else document.body.classList.remove("overflow-hidden");
//   }, [isOpen]);

//   // Listen to scroll event
//   // Listen to scroll event
// useEffect(() => {
//   let timeoutId: NodeJS.Timeout;

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;
//     setIsScrolled(currentScrollY > 0);

//     // Clear the timeout if it's already set
//     if (timeoutId) clearTimeout(timeoutId);

//     // Set the timeout to hide the navbar after 1 second
//     timeoutId = setTimeout(() => {
//       setIsScrolled(false);
//     }, 1000);
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);

//     // Clear the timeout when the component is unmounted
//     if (timeoutId) clearTimeout(timeoutId);
//   };
// }, []);

  // Don't render if not scrolled
  // if (!isScrolled) return null;


  return (
    <div>
       <button
  type="button"
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden absolute top-0 -m-2 inline-flex items-center justify-center rounded-md p-2 mt-8 text-gray-400"
>
  <Menu className="ml-4 h-6 w-6" aria-hidden="true" />
</button>
      {isOpen && (
        <div>
          <div className="relative z-40 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </div>

          <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
            <div className="w-4/5">
              <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="relative mr-20 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-2">
                  <ul>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <li
                        key={category.label}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="border-b border-gray-200">
                          <div className="-mb-px flex">
                            <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                              {category.label}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  fill
                                  src={item.imageSrc}
                                  alt="product category image"
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent("/sign-in")}
                      href="/sign-in"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Logg inn
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent("/sign-up")}
                      href="/sign-up"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Opprett konto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
  className={`fixed inset-x-0 bottom-0 w-full bg-gray-600 bg-opacity-95 rounded-t-lg shadow-md lg:hidden transition-opacity duration-500 ${
    isScrolled ? 'opacity-100' : 'opacity-0'
  }`}
>
  <div className="flex justify-around items-center py-5 text-white">
    <Link href="/">
      <Home className="h-6 w-6" />
    </Link>
    <Link href="/products">
      <Box className="h-6 w-6" />
    </Link>
    <Link href="/Sale">
      <Tag className="h-6 w-6" />
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
