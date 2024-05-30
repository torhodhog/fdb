import { AfterChangeHook, BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

import { PRODUCT_CATEGORIES } from "../../config";
import { stripe } from "../../lib/stripe";
import { Product, User } from "../../payload-types";

const isAdmin: Access = ({ req: { user: _user } }) => {
  const user = _user as User | undefined;

  if (!user) return false;
  return user.role === "admin";
};

const markAsSold: AfterChangeHook<Product> = async ({ req, doc }) => {
  // Sjekk om produktet er solgt
  if (doc.isSold) {
    return;
  }

  // Sjekk om stripeId er definert
  if (!doc.stripeId) {
    console.error('stripeId is undefined');
    return;
  }

  // Hent produktet fra Stripe
  const stripeProduct = await stripe.products.retrieve(doc.stripeId);

  // Sjekk om produktet er solgt
  if (stripeProduct.metadata && stripeProduct.metadata.sold === 'true') {
    // Oppdater produktet i databasen
    await req.payload.update({
      collection: 'products',
      id: doc.id,
      data: {
        isSold: true,
      },
    });
  }
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [markAsSold],
    beforeChange: [
      async (args) => {
        console.log('Anonymous function in beforeChange hooks called');

        const user = args.req.user;
        if (!user) {
          console.error('req.user is undefined');
          return args.data;
        }

        if (args.operation === "create") {
  const data = args.data as Product;

  const createdProduct = await stripe.products.create({
    name: data.name,
  });
  console.log('Created product:', createdProduct)

  const price = await stripe.prices.create({
    currency: "nok",
    unit_amount: Math.round(data.price * 100), // Convert price to øre
    product: createdProduct.id,
  });

  const updated: Partial<Product> = {
    ...data,
    stripeId: createdProduct.id,
    priceId: price.id, // Use the ID from the created price
    user: user.id, // Add the user ID
  };

  return updated;
} else if (args.operation === "update") {
  const data = args.data as Product;



          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
          });

          const newPrice = await stripe.prices.create({
            currency: "nok",
            unit_amount: Math.round(data.price * 100), // Convert price to øre
            product: updatedProduct.id,
          });

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: newPrice.id, // Use the ID from the new price
            user: user.id, // Add the user ID
          };

          return updated;
        }
      },
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "isSold",
      label: "Sold",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "Price in NOK",
      min: 0,
      max: 10000,
      type: "number",
      required: true,
    },
    {
      name: "onSale",
      label: "On Sale",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "salePrice",
      label: "Sale Price in NOK",
      min: 0,
      max: 10000,
      type: "number",
      admin: {
        condition: (data) => data.onSale,
      },
    },
    {
      name: "product_files",
      type: "array",
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "size",
      label: "Størrelse",
      type: "select",
      options: [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" },
        // Add more sizes as needed
      ],
      required: true,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "liga_system",
      label: "Liga System",
      type: "text",
    },
    {
  name: "nasjon",
  label: "Nasjon",
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
        { label: "6 - Bør repareres", value: "6" },
        { label: "5 - Reparasjon kreves", value: "5" },
        // Legg til flere tilstandsnivåer etter behov
      ],
    },
    {
      name: "trykk",
      label: "Trykk",
      type: "select", // Du manglet også 'type'-feltet her
      options: [
        { label: "Ja", value: "Ja" },
        { label: "Nei", value: "Nei" },
      ],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map((category) => ({
        label: category.label,
        value: category.value,
      })),
      required: true,
    },
   {
  name: "finalSale",
  label: "Final Sale",
  type: "checkbox",
  defaultValue: false,
},
  ],
};