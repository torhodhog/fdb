import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-square rounded-xl"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
        <div className="bg-gray-200 h-4 rounded w-1/4"></div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export { ProductSkeleton, ProductGridSkeleton };
export default ProductGridSkeleton;
