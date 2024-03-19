import { Access, CollectionConfig } from "payload/types";

import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";

const adminsOnly: Access = ({ req: { user } }) => user.role === 'admin';

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your email",
          buttonText: "Verify Email",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        })
      },
    },
  },
  access: {
    read: adminsOnly,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    {
      name: 'products',
      label: 'Products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
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
      name: 'størrelse',
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
      name: "role",
      label: "Role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    // Eventuelle andre felt du trenger
  ],
};
