"use client";

import { Product, User } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
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
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  const { mutate: toggleFavorite } = trpc.favorites.toggleFavorite.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritesData"] });
    },
  });

  const handleFavoriteClick = () => {
    if (user && product) {
      toggleFavorite({
        productId: product.id,
        userId: user.id,
        isFavorited: isFavorited,
      });
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
            <ImageSlider urls={validUrls} />
            {user && (
              <button
                onClick={handleFavoriteClick}
                className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-white p-1 sm:p-1.5 rounded-full shadow-md touch-manipulation"
              >
                <Heart
                  className={cn("h-4 w-4 sm:h-5 sm:w-5", {
                    "text-red-500 fill-red-500": isFavorited,
                    "text-gray-400": !isFavorited,
                  })}
                />
              </button>
            )}
            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 z-10 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md flex items-center">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-0.5 sm:mr-1" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {favoriteCount}
              </span>
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="mt-2 sm:mt-4 font-medium text-xs sm:text-sm text-gray-700 dark:text-white line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-white">
              {product.size}
            </p>
            <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

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

export default ProductListing;
