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
  query: TQueryValidator & { size?: string; names?: string[] }; // Include size and names in query type
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  page?: number;
  setPage?: (page: number) => void; // Set setPage as optional
  itemsPerPage?: number;
  finalSale?: boolean;
  loadMore?: boolean; // Add this prop to control "Load More" button visibility
  onSale?: string;
}

interface QueryResults {
  items: Product[];
  totalItems: number;
  previousPage?: number;
  nextPage?: number;
}

const itemsPerPage = 8; // Show 20 products per page

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
  } = props;

  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(page);

  // Load products from session storage on component mount
  useEffect(() => {
    const storedProducts = sessionStorage.getItem("loadedProducts");
    const storedPage = sessionStorage.getItem("currentPage");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      // Validate parsed products
      if (Array.isArray(parsedProducts)) {
        setLoadedProducts(parsedProducts);
      }
    }
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  // Save products to session storage on state change
  useEffect(() => {
    sessionStorage.setItem("loadedProducts", JSON.stringify(loadedProducts));
    sessionStorage.setItem("currentPage", currentPage.toString());
  }, [loadedProducts, currentPage]);

  const { data: queryResults, isLoading, isError, error } = trpc.getInfiniteProducts.useQuery({
    limit: itemsPerPage,
    cursor: currentPage,
    query: {
      ...query,
      sortBy,
      sortOrder,
    },
  }) as { data: QueryResults; isLoading: boolean; isError: boolean; error: any };

  const loadMoreProducts = () => {
    if (queryResults && queryResults.items) {
      setLoadedProducts((prev) => {
        const uniqueProducts = [...prev, ...queryResults.items].filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        return uniqueProducts;
      });
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (queryResults && queryResults.items) {
      setLoadedProducts((prev) => {
        const uniqueProducts = [...prev, ...queryResults.items].filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        return uniqueProducts;
      });
    }
  }, [queryResults]);

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

  const products = loadedProducts;
  const totalItems = queryResults?.totalItems ?? products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredProducts = products.filter(
    (product) =>
      (!query.size || product.size === query.size) &&
      (!query.searchTerm || product.name.toLowerCase().includes(query.searchTerm.toLowerCase())) &&
      (!product.isSold || !hideSoldItems) &&
      (!props.showSaleItems || product.onSale) &&
      (!query.names || query.names.includes(product.name)) &&
      (!props.finalSale || product.finalSale) // Use this line for filtering by final sale
  );

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

