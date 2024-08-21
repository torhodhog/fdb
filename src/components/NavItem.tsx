"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  return (
    <div className="flex mt-10">
      <DropdownMenu open={isOpen} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="gap-1.5"
            variant={isOpen ? "secondary" : "ghost"}
          >
            {category.label}
            <ChevronDown
              className={cn("h-4 w-4 transition-all text-muted-foreground", {
                "-rotate-180": isOpen,
              })}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {category.featured.map((item) => (
            <DropdownMenuItem key={item.name} onSelect={close}>
              <Link href={item.href} className="block w-full">
                <span className="block font-medium text-gray-900">
                  {item.name}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavItem;