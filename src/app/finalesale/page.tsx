// FinalSalePage.tsx
"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

type Param = string | string[] | undefined;

interface FinalSalePageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const FinalSalePage = ({ searchParams }: FinalSalePageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  const [searchTerm, setSearchTerm] = useState("");
  const [ligaSystem, setLigaSystem] = useState("");
  const [size, setSize] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productName, setProductName] = useState(""); // New state for product name
  const itemsPerPage = 16;

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <MaxWidthWrapper>
        <ProductReel
  title={label ?? "CHAMPIONS LEAGUE"}
  query={{
    category,
    sort: sort === "desc" || sort === "asc" ? sort : undefined,
    searchTerm: searchTerm,
    liga_system: ligaSystem,
    size: size, // Include size in the query object
    finalSale: true, // Only show products marked as final sale
    limit: itemsPerPage,
  }}
  // page={currentPage}
  // setPage={setCurrentPage}
/>
      </MaxWidthWrapper>
    </>
  );
};

export default FinalSalePage;
