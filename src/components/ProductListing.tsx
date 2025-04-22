"use client";

import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { Heart } from "lucide-react";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [hasFetchedFavorites, setHasFetchedFavorites] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (hasFetchedFavorites) return;

    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites", {
          credentials: "include",
        });

        const data = await response.json();

        const docs = Array.isArray(data) ? data : data.docs;

        if (!Array.isArray(docs)) {
          console.error("Uventet format på /api/favorites:", data);
          return;
        }

        const productIds = docs.map((fav: any) =>
          typeof fav.product === "string"
            ? fav.product
            : fav.product?.id || ""
        );

        setFavorites(new Set(productIds));
        setHasFetchedFavorites(true);
      } catch (error) {
        console.error("Feil under henting av favoritter:", error);
      }
    };

    fetchFavorites();
  }, [hasFetchedFavorites]);
    

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to fetch user:", await response.json());
          return;
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleFavorite = async (productId: string) => {
    try {
      if (favorites.has(productId)) {
        const response = await fetch(`/api/favorites/${productId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error:", errorData);
          alert("Kunne ikke oppdatere favoritt. Prøv igjen senere.");
          return;
        }

        setFavorites((prev) => {
          const updated = new Set(prev);
          updated.delete(productId);
          return updated;
        });
      } else {
        if (!userId) {
          alert("Du må være logget inn for å legge til favoritter.");
          return;
        }

        const response = await fetch(`/api/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ user: userId, product: productId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error:", errorData);
          alert("Kunne ikke oppdatere favoritt. Prøv igjen senere.");
          return;
        }

        setFavorites((prev) => new Set(prev).add(productId));
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (!product || !isVisible) return <ProductPlaceholder />;

  const validUrls = product.images
    .map(({ image }) => {
      if (typeof image === "string") {
        return image;
      } else if (image && "url" in image) {
        return image.url;
      }
      return null;
    })
    .filter(Boolean) as string[];

  return (
    <Link
      className={cn("invisible h-full w-full cursor-pointer group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/product/${product.id}`}
    >
      <div className="flex flex-col w-full relative">
        <ImageSlider urls={validUrls} />

        {product.isSold ? (
          <p className=" text-gray-400 mt-8">
            Dette produktet er dessverre solgt
          </p>
        ) : (
          <>
            <h3 className="mt-4 font-medium text-sm">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              Størrelse: {product.size}
            </p>

            {product.onSale &&
            product.salePrice !== null &&
            product.salePrice !== undefined ? (
              <>
                <p className="mt-1 font-medium text-sm line-through">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-1 font-medium text-sm text-red-500">
                  {formatPrice(product.salePrice)} (
                  {Math.round((1 - product.salePrice / product.price) * 100)}%
                  off)
                </p>
              </>
            ) : (
              <p className="mt-1 font-medium text-sm">
                {formatPrice(product.price)}
              </p>
            )}

<button
  onClick={(e) => {
    e.preventDefault();
    toggleFavorite(product.id);
  }}
  className="absolute top-4 right-4 z-10"
>
  <Heart
    className="w-6 h-6"
    fill={favorites.has(product.id) ? "red" : "none"}
    stroke={favorites.has(product.id) ? "red" : "currentColor"}
  />
</button> 
          </>

        )}
      </div>
    </Link>
  );
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="h-5 w-4/6 mt-4" />
      <Skeleton className="h-5 w-3/6 mt-2" />
      <Skeleton className="h-5 w-2/6 mt-2" />
    </div>
  );
};

export default ProductListing;
