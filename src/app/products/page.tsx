"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import LottieAnimation from "@/components/LottieAnimation"; // Import LottieAnimation

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

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  const [searchTerm, setSearchTerm] = useState("");
  const [ligaSystem, setLigaSystem] = useState("");
  const [size, setSize] = useState("");
  const [team, setTeam] = useState(""); // New state for team selection
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = () => {
    setIsLoading(true); // Set loading state to true when searching
  };

  // const teams = ["Manchester United", "Liverpool", "Chelsea"]; // Example teams

  // Simulate loading by setting a delay
  useEffect(() => {
    setIsLoading(false); // Set loading state to false after initial load
  }, []);

  return (
    <>
      <MaxWidthWrapper className="relative">
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-sm items-center mt-14">
          <div className="flex space-x-2 flex-grow mb-4 sm:mb-0">
            <Input
              className="flex-grow"
              type="search"
              placeholder="Søk etter produkter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} type="submit">
              Søk
            </Button>
          </div>
          <div>
            <Select
              className="sm:absolute sm:right-0"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Alle størrelser</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
              <option value="XXL">XXL</option>
            </Select>
          </div>
          {/* <div>
            <Select
              className="sm:absolute sm:right-0"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="">Alle lag</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </Select>
          </div> */}
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
              searchTerm: searchTerm,
              liga_system: ligaSystem,
              size: size,
              limit: 1000,
              // team: team, // Pass the selected team to the query
            }}
          />
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;

