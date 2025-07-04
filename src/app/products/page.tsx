"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LottieAnimation from "@/components/LottieAnimation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Shirt, Bold, XCircle, Users, Globe } from "lucide-react";
import Link from "next/link";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);
  const nation = parse(searchParams.nation); // Nytt parameter for å hente nasjon til dropdown søk

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  const [searchTerm, setSearchTerm] = useState("");
  const [ligaSystem, setLigaSystem] = useState("");
  const [size, setSize] = useState("");
  const [team, setTeam] = useState(""); // For å hente lag fra dropdown
  const [hasPrint, setHasPrint] = useState<boolean | null>(null); // Har drakten trykk?
  const [selectedNation, setSelectedNation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = () => {
    setIsLoading(true); // Setter loading til true for å vise animasjonen samtidig som vi henter data
    setTimeout(() => {
      setIsLoading(false); // Setter den til false etter 500ms eller når dataene er lastet inn
    }, 500);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLigaSystem("");
    setSize("");
    setTeam("");
    setHasPrint(null); // sett til null for å tilbakestille trykkfilteret
    setSelectedNation("");
    setIsLoading(true); // Setter loading til true for å vise animasjonen
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Simulultere loading hvis det er første gang siden vi har en useEffect som setter den til false
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <MaxWidthWrapper className="relative">
        <div className="flex flex-col gap-4 w-full mt-8 sm:mt-14">
          <div className="flex gap-2 w-full">
            <Input
              className="flex-1"
              type="search"
              placeholder="Søk etter produkter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              type="submit"
              className="bg-green-900 px-4 sm:px-6"
            >
              <span className="hidden sm:inline">Søk</span>
              <span className="sm:hidden">🔍</span>
            </Button>
          </div>
          <div className="flex gap-2 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 bg-yellow-400">
                  <Filter className="mr-2 h-4 w-4" /> Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full sm:w-56 left-0 sm:left-auto">
                <DropdownMenuLabel>Filtrer Produkter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Shirt className="mr-2 h-4 w-4" />
                      <span>Størrelse</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-full sm:w-auto">
                        <DropdownMenuItem onClick={() => setSize("XS")}>
                          XS
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSize("S")}>
                          S
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSize("M")}>
                          M
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSize("L")}>
                          L
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSize("XL")}>
                          XL
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSize("XXL")}>
                          XXL
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Lag</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-full sm:w-auto">
                        <DropdownMenuItem
                          onClick={() => setTeam("Manchester United")}
                        >
                          Manchester United
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTeam("Arsenal")}>
                          Arsenal
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTeam("Barcelona")}>
                          Barcelona
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTeam("Real Madrid")}
                        >
                          Real Madrid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTeam("Juventus")}>
                          Juventus
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTeam("Bayern Munchen")}
                        >
                          Bayern Munchen
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Bold className="mr-2 h-4 w-4" />
                      <span>Trykk</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-full sm:w-auto">
                        <DropdownMenuItem onClick={() => setHasPrint(true)}>
                          Med Trykk
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setHasPrint(false)}>
                          Uten Trykk
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Nasjon</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-full sm:w-auto">
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Norge")}
                        >
                          Norge
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Sverige")}
                        >
                          Sverige
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Danmark")}
                        >
                          Danmark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Tyskland")}
                        >
                          Tyskland
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Spania")}
                        >
                          Spania
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Italia")}
                        >
                          Italia
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("Frankrike")}
                        >
                          Frankrike
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedNation("England")}
                        >
                          England
                        </DropdownMenuItem>
                        {/* Add more nations as needed */}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>{" "}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={resetFilters}>
                  <XCircle className="mr-2 h-4 w-4" />
                  <span>Nullstill Filter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <XCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Nullstill</span>
              <span className="sm:hidden">↻</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mt-16 px-4">
          <Link
            href={{ pathname: "/products", query: { nation: "England" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇬🇧
            </span>
          </Link>
          <Link
            href={{ pathname: "/products", query: { nation: "Spania" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇪🇸
            </span>
          </Link>
          <Link
            href={{ pathname: "/products", query: { nation: "Norge" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇳🇴
            </span>
          </Link>
          <Link
            href={{ pathname: "/products", query: { nation: "Italia" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇮🇹
            </span>
          </Link>
          <Link
            href={{ pathname: "/products", query: { nation: "Frankrike" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇫🇷
            </span>
          </Link>
          <Link
            href={{ pathname: "/products", query: { nation: "Tyskland" } }}
            className="text-black text-lg font-semibold hover:underline"
          >
            <span style={{ fontSize: "1.5rem" }} className="sm:text-3xl">
              🇩🇪
            </span>
          </Link>

          <Link
            href="/products"
            className="text-black text-lg font-semibold hover:underline"
          >
            <XCircle style={{ fontSize: "1.5rem" }} className="sm:text-3xl" />
          </Link>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        {isLoading ? (
          <LottieAnimation /> // Display the Lottie animation while loading
        ) : (
          <ProductReel
            title={label ?? "Alle produkter"}
            query={{
              category,
              sort: sort === "desc" || sort === "asc" ? sort : undefined,
              searchTerm: team ? team : searchTerm, // <--- henter fra din local state
              liga_system: ligaSystem,
              size: size,
              limit: 1000,
              hasPrint: hasPrint,
              nation: selectedNation || nation,
            }}
          />
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
