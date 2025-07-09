"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product, User } from "@/payload-types";
import LottieAnimation from "@/components/LottieAnimation";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator & {
    size?: string;
    names?: string[];
    team?: string;
    hasPrint?: boolean | null;
    nation?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  hideSoldItems?: boolean;
  showSaleItems?: boolean;
  itemsPerPage?: number;
  loadMore?: boolean;
  isHomePage?: boolean;
  finalSale?: boolean;
  productCode?: string;
  nasjon?: string;
  user?: User | null; // Add user as optional prop
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
    loadMore = false,
    showSaleItems = false,
    user = null, // Get user from props instead of hook
  } = props;

  // Remove the useAuthFallback hook since we get user as prop
  const userLoading = false; // No loading since user comes from prop

  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: queryResults,
    isLoading: isQueryLoading,
    isError,
    error,
  } = trpc.getInfiniteProducts.useQuery({
    limit: 200, // Set a high limit to fetch all products
    cursor: 1, // Start from the first page
    query: { ...query, sortBy, sortOrder },
  });

  const productIds = queryResults?.items.map((p: Product) => p.id);

  const { data: favoritesData } = trpc.favoritesData.getFavoritesData.useQuery(
    {
      productIds: productIds ?? [],
      userId: (user as any)?.id,
    },
    {
      enabled: !!productIds && productIds.length > 0 && !userLoading,
      staleTime: 0, // No caching for favorites to ensure fresh data
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (queryResults && queryResults.items) {
      setLoadedProducts(queryResults.items);
      setIsLoading(false); // Set loading to false after products are loaded
    }
  }, [queryResults]);

  if (isQueryLoading && isLoading) {
    return <LottieAnimation />;
  }

  if (isError) {
    return <div>Feil ved henting av produkter: {error.message}</div>;
  }

  if (!queryResults) {
    return <div className="mt-8">Vent litt, drakter lastes...</div>;
  }

  const filteredProducts = (loadedProducts || []).filter((product: Product) => {
    // ALWAYS hide sold products - they should never be shown
    if (product.isSold) {
      return false;
    }
    
    const sizeMatch = !query.size || product.size === query.size;
    const searchTermMatch =
      !query.searchTerm ||
      product.name.toLowerCase().includes(query.searchTerm.toLowerCase());
    const saleMatch = !props.showSaleItems || product.onSale;
    const namesMatch = !query.names || query.names.includes(product.name);
    const teamMatch = !query.team || product.name === query.team;
    const printMatch =
      query.hasPrint === null ||
      query.hasPrint === undefined ||
      product.trykk === (query.hasPrint ? "Ja" : "Nei");
    const finalSaleMatch = !props.finalSale || product.finalSale;
    const nationMatch = !query.nation || product.nasjon === query.nation;

    const matches =
      sizeMatch &&
      searchTermMatch &&
      saleMatch &&
      namesMatch &&
      teamMatch &&
      printMatch &&
      finalSaleMatch &&
      nationMatch;

    return matches;
  });

  return (
    <section id="product-reel-section" className="py-12">
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
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-4 px-2 sm:px-0 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 lg:grid-cols-4 md:gap-y-6 lg:gap-x-6">
            {filteredProducts.map((product, i) => {
              const favoriteCount =
                favoritesData?.favoriteCounts[product.id] ?? 0;
              const isFavorited =
                favoritesData?.userFavorites[product.id] ?? false;

              return (
                <ProductListing
                  key={`product-${i}`}
                  product={product}
                  index={i}
                  user={user as any}
                  isFavorited={isFavorited}
                  favoriteCount={favoriteCount}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
