"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";

export default function ClientSearchbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/products") return null;
  return (
    <div className="w-full lg:w-auto">
      <div className="mt-20 sm:mt-24 mb-4 lg:mt-0 lg:mb-0 lg:ml-8">
        <div className="flex justify-center lg:justify-start px-4 lg:px-0">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
