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
  query: TQueryValidator;
  size?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc'; 
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  page?: number;
  setPage?: (page: number) => void; // Set setPage as optional
  itemsPerPage?: number;
}

const itemsPerPage = 20; // Show 20 products per page

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query, size, sortBy = 'createdAt', sortOrder = 'desc', hideSoldItems=false, page = 1, setPage } = props;

  const { data: queryResults, isLoading, isError, error } = trpc.getInfiniteProducts.useQuery(
    {
      limit: itemsPerPage, // Setter limit til itemsPerPage
      cursor: page, // Inkluderer current page som cursor
      query: {
        ...query,
        sortBy,
        sortOrder,
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  const products = queryResults?.items || [];

  const filteredProducts = products.filter(product => 
    (!size || product.size === size) &&
    (!query.searchTerm || product.name.includes(query.searchTerm)) &&
    (!product.isSold || !hideSoldItems) &&
    (!props.showSaleItems || product.onSale)
  );

  let map = filteredProducts.length ? filteredProducts : new Array<null>(itemsPerPage).fill(null);
  
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
            {props.showSaleItems ? 'Se alle salgsvarer' : 'Se hele kolleksjonen'} <span aria-hidden="true">&rarr;</span>
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
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => setPage(queryResults?.previousPage || 1)} 
            disabled={!queryResults?.previousPage}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Forrige
          </button>
          <button 
            onClick={() => setPage(queryResults?.nextPage || page + 1)}
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
