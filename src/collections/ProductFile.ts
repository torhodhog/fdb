import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { User } from "../payload-types";

// Hook: legg til innlogget bruker som eier
const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

// Access control: tillat admin og eierskap/kjøp
const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products
    .flatMap((prod: any) => prod.product_files || [])
    .filter(Boolean);

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .flatMap((order: any) =>
      (order.products as any[]).flatMap((product: any) => {
        if (typeof product === "string") {
          req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );
          return [];
        }

        return (product.product_files || [])
          .map((product_file: any) => {
            if (product_file?.file && typeof product_file.file !== "string") {
              return product_file.file.id;
            }
            return null;
          })
          .filter(Boolean);
      })
    )
    .filter(Boolean);

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "liga_system",
      label: "Liga System",
      type: "text",
    },
    {
      name: "tilstand",
      label: "Tilstand",
      type: "select",
      options: [
        { label: "10 - Utmerket", value: "10" },
        { label: "9 - Bra", value: "9" },
        { label: "8 - Små feil", value: "8" },
        { label: "7 - Synlige feil/skader", value: "7" },
      ],
    },
    {
      name: "size",
      label: "Størrelse",
      type: "select",
      options: [
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
      ],
    },
    {
      name: "isSold",
      label: "Sold",
      type: "checkbox",
      defaultValue: false,
      admin: {
        condition: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
