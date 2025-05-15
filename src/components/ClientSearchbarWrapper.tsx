"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";

export default function ClientSearchbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/products") return null;
  return (
    <div className="mt-16 mb-1 md:mt-0">
      <Searchbar />
    </div>
  );
}
