"use client";

import { Product, User } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { Heart } from "lucide-react";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";

interface ProductListingProps {
  product: Product | null;
  index: number;
  user: User | null;
  isFavorited: boolean;
  favoriteCount: number;
}

const ProductListing = ({
  product,
  index,
  user,
  isFavorited,
  favoriteCount,
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  const { mutate: toggleFavorite } = trpc.favorites.toggleFavorite.useMutation({
    onSuccess: () => {
      console.log("Favorite toggled successfully");
      // Invalidate all related queries more aggressively
      queryClient.invalidateQueries({ queryKey: ["favoritesData"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries(); // Invalidate all queries as fallback
      // Force re-fetch
      queryClient.refetchQueries({ queryKey: ["favoritesData"] });
    },
    onError: (error) => {
      console.error("Error toggling favorite:", error);
      alert("Feil ved lagring av favoritt. Prøv igjen.");
    },
  });

  const handleFavoriteClick = () => {
    console.log("Favorite click - User:", user, "Product:", product?.id);
    if (!user) {
      alert("Du må være logget inn for å legge til favoritter");
      return;
    }
    if (user && product) {
      console.log(
        "Toggling favorite for product:",
        product.id,
        "user:",
        user.id,
        "current status:",
        isFavorited
      );
      toggleFavorite({
        productId: product.id,
        userId: user.id,
        isFavorited: isFavorited,
      });
    } else {
      console.error("Missing user or product data", { user, product });
    }
  };

  if (!product || !isVisible) return <ProductPlaceholder />;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <div
        className={cn("relative w-full cursor-pointer group/main", {
          "animate-in fade-in-5 slide-in-from-top-8": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
            {isNavigating && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            <ImageSlider urls={validUrls} />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-white dark:bg-gray-800 p-1 sm:p-1.5 rounded-full shadow-md touch-manipulation"
              title={
                user
                  ? "Legg til favoritter"
                  : "Logg inn for å legge til favoritter"
              }
            >
              <Heart
                className={cn("h-4 w-4 sm:h-5 sm:w-5", {
                  "text-red-500 fill-red-500": user && isFavorited,
                  "text-gray-400 dark:text-gray-500": !user || !isFavorited,
                })}
              />
            </button>
          </div>

          <Link
            href={`/product/${product.id}`}
            onClick={() => setIsNavigating(true)}
            className={cn("block", {
              "pointer-events-none opacity-70": isNavigating,
            })}
          >
            <h3 className="mt-2 sm:mt-4 font-medium text-xs sm:text-sm text-gray-700 dark:text-white line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-white">
              {product.size}
            </p>
            <div className="flex items-center gap-2">
              {product.salePrice && (
                <span className="line-through text-gray-400 text-xs sm:text-sm">
                  {formatPrice(product.price)}
                </span>
              )}
              <span
                className={
                  product.salePrice
                    ? "text-red-500 font-bold text-xs sm:text-sm"
                    : "font-medium text-xs sm:text-sm text-gray-900 dark:text-white"
                }
              >
                {formatPrice(product.salePrice || product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductListing;
