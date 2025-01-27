"use client";
import React, { useState } from "react";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import Image from "next/image";

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

  // Henter { docs, hasMore, ... } fra TRPC, men viser bare når term ikke er tomt
  const { data, isLoading } = trpc.searchProducts.useQuery(
    { term },
    { enabled: term.trim().length > 0 }
  );

  const results = data?.docs || [];
  const hasMore = data?.hasMore || false;

  return (
    <div className="relative w-full max-w-md">
      {/* Søkefeltet */}
      <input
        type="text"
        placeholder="Søk etter drakt..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
      />

      {/* Dropdown for resultater */}
      {term && !isLoading && results.length > 0 && (
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
            max-h-72        /* valgfritt: begrense høyden */
            overflow-y-auto /* valgfritt: scroll hvis mange resultater */
          "
        >
          {results.map((product: Product) => {
            const imageUrl = getFirstImageUrl(product);
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center p-2 border-b border-gray-200 last:border-none hover:bg-gray-50"
                onClick={() => setTerm("")}
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
              href={`/products?searchTerm=${term}`}
              className="block p-2 border-t border-gray-200 text-sm text-blue-600 hover:bg-gray-50"
              onClick={() => setTerm("")}
            >
              Se alle treff
            </Link>
          )}
        </div>
      )}

      {/* Ingen treff */}
      {term && !isLoading && results.length === 0 && (
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
