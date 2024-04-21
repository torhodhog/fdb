"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";


interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
  size?: string;
  sortBy?: 'string'
  sortOrder?: 'asc' | 'desc'; 
  hideSoldItems?: boolean;
}


const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query, size, sortBy = 'createdAt', sortOrder = 'desc', hideSoldItems=false } = props;

  const { data: queryResults, isLoading, isError, error } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: 20,
      query: {
        ...query,
        sortBy,
        sortOrder,
      },
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  console.log('Query Results:', queryResults);
  console.log('Query Error:', error);

  if (isError) {
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  const products = queryResults?.pages.flatMap((page) => page.items) || [];

  const filteredProducts = products.filter(product => 
    (size ? product.size === size : true) &&
    (query.searchTerm ? product.name.includes(query.searchTerm) : true) &&
    (!hideSoldItems || !product.isSold)
  )

  let map = filteredProducts.length ? filteredProducts : new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
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
            href="/products"
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Se hele kolleksjonen <span aria-hidden="true">&rarr;</span>
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
    </section>
  );
};

export default ProductReel;
