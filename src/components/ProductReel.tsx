"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator & { size?: string; names?: string[] };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  page?: number;
  setPage?: (page: number) => void;
  itemsPerPage?: number;
  finalSale?: boolean;
}

const ProductReel = (props: ProductReelProps) => {
  const {
    title,
    subtitle,
    href,
    query,
    sortBy = "createdAt",
    sortOrder = "desc",
    hideSoldItems = false,
    page = 1,
    setPage,
    itemsPerPage = 20,
  } = props;

  const { data, isLoading, isError, error } = trpc.product.searchProducts.useQuery({
    searchTerm: query.searchTerm,
    category: query.category,
    size: query.size,
    sort: sortOrder,
    page,
    limit: itemsPerPage,
  });

  console.log("Query sent to server:", {
    searchTerm: query.searchTerm,
    category: query.category,
    size: query.size,
    sort: sortOrder,
    page,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching products:", error);
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  if (!data || data.products.length === 0) {
    return <div>Ingen produkter funnet</div>;
  }

  const products: Product[] = data.products;
  const totalItems = data.totalItems ?? products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-extrabold text-gray-600 hover:text-blue-500 md:block"
          >
            {props.showSaleItems
              ? "Se alle salgsvarer"
              : "Se hele kolleksjonen"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products.map((product: Product, i: number) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
                currentPage={page}
              />
            ))}
          </div>
        </div>
      </div>
      {setPage && (
        <div className="flex justify-between mt-4 items-center">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Forrige
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Side: {page} av {totalPages}
          </span>
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : page)}
            disabled={page === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Neste
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductReel;
