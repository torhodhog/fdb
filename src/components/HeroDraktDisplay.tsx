"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Product } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

const HeroDraktDisplay = () => {
  const [selectedDrakter, setSelectedDrakter] = useState<Product[]>([]);

  const { data } = trpc.getInfiniteProducts.useQuery({
    limit: 1000,
    cursor: 1,
    query: {
      sortBy: "random",
    },
  });

  useEffect(() => {
    if (!data?.items || data.items.length === 0) return;

    const allProducts = data.items as Product[];
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    setSelectedDrakter(selected);
  }, [data]);

  return (
   <div className="absolute top-[65%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">

      {/* Drakter vises bare på md og opp */}
      <div className="hidden md:flex gap-6">
        {selectedDrakter.map((product, index) => {
          const rotation = [-12, -4, 4, 12][index] ?? 0;
          const imageField = product.images?.[0]?.image;
          const imageUrl =
            typeof imageField === "string"
              ? imageField
              : (imageField?.url ?? "");

          return (
            <Link
              href={`/product/${(product as any).slug ?? product.id}`}
              key={product.id}
            >
              <div
                className={`w-52 h-72 rounded-2xl bg-white shadow-2xl p-3 flex flex-col justify-between items-center transition-transform duration-300 hover:scale-105`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="relative w-full h-[200px] flex justify-center items-center">
                  <div className="absolute inset-0 bg-white/60 blur-sm rounded-xl z-0" />
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="relative z-10 object-contain rounded"
                    />
                  )}
                </div>
                <p className="text-xs mt-2 text-center font-semibold text-black">
                  {product.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

     {/* Slagord */}
     <div className="mt-44 sm:mt-28 md:mt-32 lg:mt-36 px-4">

  <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-cinzel italic text-gray-900 font-bold">
    For deg som vet at fotballdrakter er mer enn bare klær.
  </p>
</div>


    </div>
  );
};

export default HeroDraktDisplay;
