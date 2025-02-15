"use client";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import Image from "next/image";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

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
              <p className="mt-1 font-medium text-sm">{formatPrice(product.price)}</p>
            )}
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
