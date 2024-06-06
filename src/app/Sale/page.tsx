"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

const SalePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ligaSystem, setLigaSystem] = useState("");
  const [size, setSize] = useState("");

  return (
    <>
      <MaxWidthWrapper className="relative">
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-sm items-center mt-14">
          <div className="flex space-x-2 flex-grow mb-4 sm:mb-0">
            <Input
              className="flex-grow"
              type="search"
              placeholder="Søk etter drakter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">Søk</Button>
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
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <ProductReel
          title="Salg"
          query={{
            limit: 80,
            searchTerm: searchTerm,
            liga_system: ligaSystem,
            size: size,
            onSale: true,
          }}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default SalePage;

