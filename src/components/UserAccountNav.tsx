"use client";

// Antatte nødvendige import-setninger basert på din bruk av komponenter og kroker.
import React from 'react';
import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

interface UserAccountNavProps {
  user: User;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
      <div className="relative group">
  <Button variant="ghost" size="sm" className="relative font-bold">
    Min side
  </Button>
    <div
    className="absolute left-1/2 -translate-x-1/2 mt-10 w-max px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
    dangerouslySetInnerHTML={{
      __html: "Her kan du:<br/>- Se dine ordre<br/>- Finne dine favoritter",
    }}
  ></div>
</div>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {user.role === 'admin' ? (
          <DropdownMenuItem asChild>
            <Link href="/sell">Rediger produkter</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/sell">Mine side</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logg ut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
