"use client";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator & { size?: string }; // Include size in query type
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  page?: number;
  setPage?: (page: number) => void; // Set setPage as optional
  itemsPerPage?: number;
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
  } = props;

  const {
    data: queryResults,
    isLoading,
    isError,
    error,
  } = trpc.getInfiniteProducts.useQuery({
    limit: itemsPerPage, // Setter limit til itemsPerPage
    cursor: page, // Inkluderer current page som cursor
    query: {
      ...query,
      sortBy,
      sortOrder,
    },
  }) as { data: QueryResults; isLoading: boolean; isError: boolean; error: any };

  console.log("queryResults:", queryResults);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  // If totalItems is not returned, calculate it from the length of the items array
  const products = queryResults?.items || [];
  const totalItems = queryResults?.totalItems ?? products.length;
  console.log("totalItems:", totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredProducts = products.filter(
    (product) =>
      (!query.size || product.size === query.size) &&
      (!query.searchTerm || product.name.toLowerCase().includes(query.searchTerm.toLowerCase())) &&
      (!product.isSold || !hideSoldItems) &&
      (!props.showSaleItems || product.onSale)
  );

  let map = filteredProducts.length
    ? filteredProducts
    : new Array<null>(itemsPerPage).fill(null);

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
            {map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
      {setPage && (
        <div className="flex justify-between mt-4 items-center">
          <button
            onClick={() => setPage(queryResults?.previousPage || 1)}
            disabled={!queryResults?.previousPage}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Forrige
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Side: {page} 
          </span>
          <button
            onClick={() => {
              setPage(queryResults?.nextPage || page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Neste
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductReel;
