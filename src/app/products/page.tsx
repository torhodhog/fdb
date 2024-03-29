"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex w-full max-w-sm items-center mt-14 space-x-2">
          <Input
            type="search"
            placeholder="Søk etter drakter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" onClick={() => console.log(searchTerm)}>
            Søk
          </Button>
          {/* <Button type="button" onClick={() => setLigaSystem("liga1")}>
            Liga 1
          </Button>
          <Button type="button" onClick={() => setLigaSystem("liga2")}>
            Liga 2
          </Button> */}
          {/* Add more buttons for other liga systems */}
        </div>
        <ProductReel
          title={label ?? "Alle produkter"}
          query={{
            category,
            limit: 80,
            sort: sort === "desc" || sort === "asc" ? sort : undefined,
            searchTerm: searchTerm,
            liga_system: ligaSystem,
          }}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
