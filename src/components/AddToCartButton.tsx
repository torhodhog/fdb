"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({product}: {product: Product}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        if (!product.isSold) {
          addItem(product);
          setIsSuccess(true);
        }
      }}
      size="lg"
      className={`w-full ${product.isSold ? 'bg-gray-500' : 'bg-blue-500'}`}
      disabled={product.isSold!}
    >
      {product.isSold ? "Solgt" : isSuccess ? "Puttet i handlekurven" : "Legg til i handlekurven"}
    </Button>
  );
};

export default AddToCartButton;
