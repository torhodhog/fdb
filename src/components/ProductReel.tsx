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
  query: TQueryValidator & { size?: string; names?: string[]; onSale?: boolean }; // Include onSale in query type
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  page?: number;
  setPage?: (page: number) => void; // Set setPage as optional
  itemsPerPage?: number;
  finalSale?: boolean;
  loadMore?: boolean; // Add this prop to control "Load More" button visibility
  isHomePage?: boolean; // Add this prop to differentiate between Home and Products page
}

interface QueryResults {
  items: Product[];
  totalItems: number;
  previousPage?: number;
  nextPage?: number;
}

const itemsPerPage = 20; // Show 20 products per page

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
    loadMore = false, // Default to false
    isHomePage = false, // Default to false
  } = props;

  const [loadedProducts, setLoadedProducts] = useState<Product[]>(() => {
    if (isHomePage) return []; // Don't use localStorage for home page
    const storedProducts = localStorage.getItem("loadedProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [currentPage, setCurrentPage] = useState(() => {
    if (isHomePage) return 1; // Always start at page 1 for home page
    return parseInt(localStorage.getItem("currentPage") || "1");
  });

  const { data: queryResults, isLoading, isError, error } = trpc.getInfiniteProducts.useQuery({
    limit: query.limit || itemsPerPage, // Use limit from query or default to itemsPerPage
    cursor: currentPage,
    query: {
      ...query,
      sortBy,
      sortOrder,
    },
  }) as { data: QueryResults; isLoading: boolean; isError: boolean; error: any };

  useEffect(() => {
    if (queryResults) {
      console.log("queryResults received:", queryResults);
      setLoadedProducts((prev) => {
        const newProducts = currentPage === 1 ? queryResults.items : [...prev, ...queryResults.items];
        if (!isHomePage) {
          localStorage.setItem("loadedProducts", JSON.stringify(newProducts));
        }
        return newProducts;
      });
    }
  }, [queryResults, currentPage, isHomePage]);

  console.log("loadedProducts:", loadedProducts);
  console.log("currentPage:", currentPage);

  const loadMoreProducts = () => {
    if (queryResults && queryResults.items) {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        if (!isHomePage) {
          localStorage.setItem("currentPage", nextPage.toString());
        }
        return nextPage;
      });
    }
  };

  if (isLoading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching products:", error);
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  if (!queryResults && currentPage === 1) {
    console.warn("No query results returned");
    return <div>Ingen produkter funnet</div>;
  }

  const totalItems = queryResults?.totalItems ?? loadedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredProducts = loadedProducts.filter(
    (product) =>
      (!query.size || product.size === query.size) &&
      (!query.searchTerm || product.name.toLowerCase().includes(query.searchTerm.toLowerCase())) &&
      (!product.isSold || !hideSoldItems) &&
      (!query.onSale || product.onSale) && // Filter by onSale prop
      (!query.names || query.names.includes(product.name)) &&
      (!props.finalSale || product.finalSale) // Use this line for filtering by final sale
  );

  console.log("filteredProducts:", filteredProducts);

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
            {filteredProducts.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
                currentPage={currentPage}  // Pass currentPage prop to ProductListing
              />
            ))}
          </div>
        </div>
      </div>
      {loadMore && queryResults?.nextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Last inn flere
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductReel;
