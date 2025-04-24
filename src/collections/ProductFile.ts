import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

import { User } from "../payload-types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

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

  const ownProductFileIds = products.map((prod: { product_files: any[] }) => prod.product_files).flat();

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
    .map((order: any) => {
      return (order.products as any[]).map((product: any) => {
        if (typeof product === "string")
          return req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );

        if (product.product_files) {
          return product.product_files.map((product_file: any) => {
            if (product_file.file && typeof product_file.file !== 'string') {
              return product_file.file.id;
            }
          });
        }
      });
    })
    .filter(Boolean)
    .flat();

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
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
    {
      name: 'liga_system',
      label: 'Liga System',
      type: 'text',
    },
    {
      name: 'tilstand',
      label: 'Tilstand',
      type: 'select',
      options: [
        { label: "10 - Utmerket", value: "10" },
        { label: "9 - Bra", value: "9" },
        { label: "8 - Små feil", value: "8" },
        { label: "7 - Synlige feil/skader", value: "7" },
        // Legg til flere tilstandsnivåer etter behov
      ],
    },
    {
      name: 'size',
      label: 'Størrelse',
      type: 'select',
      options: [
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL"},
        // Legg til flere størrelser etter behov
      ],
    },
    {
      name: 'isSold',
      label: 'Sold',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ req }) => req.user.role === 'admin',
      },
    },
  ],
};
