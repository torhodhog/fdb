"use client";
import React, { useState } from "react";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import Image from "next/image";

// Eksempel på (forenklet) Product-type – juster til ditt schema
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

  // Hvis "image" er en streng
  if (typeof first.image === "string") {
    return first.image;
  }
  // Hvis "image" er et objekt med "url"
  else if ("url" in first.image && first.image.url) {
    return first.image.url;
  }
  return null;
}

export default function Searchbar() {
  const [term, setTerm] = useState("");

  // Kaller TRPC-prosedyren searchProducts
  const { data: results = [], isLoading } = trpc.searchProducts.useQuery(
    { term },
    {
      enabled: term.trim().length > 0, // kun søk hvis vi har input
    }
  );

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Søk etter drakt..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300"
      />

      {/* Vis treff bare når vi har et søk, ikke laster, og har resultater */}
      {term && !isLoading && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg">
          {results.map((product: Product) => {
            const imageUrl = getFirstImageUrl(product);

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Hvis vi fant en gyldig bildeadresse */}
                {imageUrl && (
                  <div className="w-16 h-16 relative mr-2 flex-shrink-0">
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
                <span className="ml-2 ">{product.name}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Vis en melding hvis vi har søketerm, men ingen treff */}
      {term && !isLoading && results.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg p-2">
          Ingen treff ...
        </div>
      )}
    </div>
  );
}