import { Access, CollectionConfig, Document } from "payload/types";
import { getPayloadClient } from "../get-payload";

const yourOwn: Access = ({ req: { user } }) => {
  if (user?.role === "admin") return true;
  return {
    user: user?.id,
  };
};

const updateProductAsSold = async ({ operation, doc, previousDoc }: { operation: string, doc: Document, previousDoc: Document }) => {
  if (operation === "update" && doc.data._isPaid && !previousDoc.data._isPaid) {
    const payload = await getPayloadClient();

    const productsToUpdate = doc.data.products || [];
    await Promise.all(
      productsToUpdate.map(async (productId: string) => {
        try {
          await payload.update({
            collection: 'products',
            id: productId,
            data: { isSold: true },
          });
          console.log(`Product ${productId} marked as sold.`);
        } catch (error) {
          console.error(`Failed to mark product ${productId} as sold:`, error);
        }
      })
    );
  }
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "En oversikt over dine bestillinger hos Fotballdraktbutikken",
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [updateProductAsSold]
  }
};