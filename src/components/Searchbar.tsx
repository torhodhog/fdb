// "use client";
import React, { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

// 1) Debounce-hook
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface Product {
  id: string;
  name: string;
  images?: {
    image?: string | { url?: string };
  }[];
}

// Hjelpefunksjon for å hente første bildeadresse
function getFirstImageUrl(product: Product): string | null {
  if (!product.images || product.images.length === 0) return null;

  const first = product.images[0];
  if (!first?.image) return null;

  if (typeof first.image === "string") {
    return first.image;
  } else if ("url" in first.image && first.image.url) {
    return first.image.url;
  }
  return null;
}

export default function Searchbar() {
  const [term, setTerm] = useState("");

  // 2) Debounce selve søketermen
  const debouncedTerm = useDebounce(term, 300);

  // 3) Bare kjør query hvis minst 3 tegn
  const { data, isFetching } = trpc.searchProducts.useQuery(
    { term: debouncedTerm },
    { enabled: debouncedTerm.trim().length >= 3 }
  );

  const results = data?.docs || [];
  const hasMore = data?.hasMore || false;

  return (
    <div className="relative w-full max-w-md ml-20 mt-">
      <div className="relative">
        {/* Søkefeltet */}
        <input
          type="text"
          placeholder="Søk etter drakt..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
        />

        {/* Spinner vises når isFetching === true */}
        {isFetching && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <FaSpinner className="animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {/* Dropdown for resultater (vis bare hvis vi faktisk har minst 3 tegn) */}
      {debouncedTerm.trim().length >= 3 &&
        !isFetching &&
        results.length > 0 && (
          <div
            className="
            absolute 
            left-0 
            top-full 
            mt-1
            w-full
            z-50
            bg-white
            rounded-md
            shadow-lg
            border border-gray-200
            max-h-72        
            overflow-y-auto 
          "
          >
            {results.map((product: Product) => {
              const imageUrl = getFirstImageUrl(product);
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center p-2 border-b border-gray-200 last:border-none hover:bg-gray-50"
                  onClick={() => setTerm("")} // Nullstill søketeksten når man klikker
                >
                  {imageUrl && (
                    <div className="w-10 h-10 relative mr-2 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <span className="ml-2 text-sm">{product.name}</span>
                </Link>
              );
            })}

            {/* Se alle treff */}
            {hasMore && (
              <Link
                href={`/products?searchTerm=${debouncedTerm}`}
                className="block p-2 border-t border-gray-200 text-sm text-blue-600 hover:bg-gray-50"
                onClick={() => setTerm("")}
              >
                Se alle treff
              </Link>
            )}
          </div>
        )}

      {/* Ingen treff – vises bare hvis søk er aktivt (>=3 tegn) og 0 resultater */}
      {debouncedTerm.trim().length >= 3 &&
        !isFetching &&
        results.length === 0 && (
          <div
            className="
            absolute
            left-0
            top-full
            mt-1
            w-full
            z-50
            bg-white
            rounded-md
            shadow-lg
            border border-gray-200
            p-2
          "
          >
            <p className="text-sm">Ingen treff ...</p>
          </div>
        )}
    </div>
  );
}
