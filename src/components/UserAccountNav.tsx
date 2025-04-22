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
        <Button variant="ghost" size="sm" className="relative">
          Min konto
        </Button>
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
