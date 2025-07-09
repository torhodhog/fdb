import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";

export const fetchProduct = async (productId: string) => {
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
    // Optimize by only fetching necessary fields
    depth: 1, // Reduce depth to speed up query
  });

  const [product] = products;

  if (!product) return notFound();

  return product;
};
