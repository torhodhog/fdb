"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import LottieAnimation from "@/components/LottieAnimation";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator & { size?: string; names?: string[], team?: string }; // Include size and team in query type
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  itemsPerPage?: number;
  loadMore?: boolean; // Add this prop to control "Load More" button visibility
  isHomePage?: boolean; // Flag to differentiate between home page and product page
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
    loadMore = false, // Default to false
  } = props;

  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: queryResults, isLoading: isQueryLoading, isError, error } = trpc.getInfiniteProducts.useQuery({
    limit: 200, // Set a high limit to fetch all products
    cursor: 1, // Start from the first page
    query: {
      ...query,
      sortBy,
      sortOrder,
    },
  });

  useEffect(() => {
    if (queryResults && queryResults.items) {
      console.log(`Fetched items: ${queryResults.items.length}`, queryResults.items); // Log the fetched items
      setLoadedProducts(queryResults.items);
      setIsLoading(false); // Set loading to false after products are loaded
    } else {
      console.log("No items fetched");
    }
  }, [queryResults]);

  if (isQueryLoading && isLoading) {
    return <LottieAnimation />;
  }

  if (isError) {
    console.error("Error fetching products:", error);
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  if (!queryResults) {
    console.warn("No query results returned");
    return <div>Ingen produkter funnet</div>;
  }

  const filteredProducts = (loadedProducts || []).filter(
    (product) =>
      (!query.size || product.size === query.size) &&
      (!query.searchTerm || product.name.toLowerCase().includes(query.searchTerm.toLowerCase())) &&
      (!product.isSold || !hideSoldItems) &&
      (!props.showSaleItems || product.onSale) &&
      (!query.names || query.names.includes(product.name)) &&
      (!query.team || product.name === query.team) && // Filter by team
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
