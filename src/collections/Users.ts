import { Access, CollectionConfig } from 'payload/types'

import { PrimaryActionEmailHtml } from '../components/emails/PrimaryActionEmail'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }: { token: string }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        });
      },
    },
    forgotPassword: {
      generateEmailHTML: ({ req, token, user } = {}) => {
        return PrimaryActionEmailHtml({
          actionLabel: "reset your password",
          buttonText: "Reset Password",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`
        });
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    {
      name: 'products',
      label: 'Products',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'product_files',
      label: 'Product files',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: true,
    },
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: false,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: false,
      admin: {
        condition: ({ operation }) => operation !== 'forgotPassword',
      },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: false,
      admin: {
        condition: ({ operation }) => operation !== 'forgotPassword',
      },
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: false,
      admin: {
        condition: ({ operation }) => operation !== 'forgotPassword',
      },
    },
    {
      name: 'favorites',
      label: 'Favorites',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'update' && data && data._isForgotPassword) {
          
          data.address = undefined;
          data.country = undefined;
          data.postalCode = undefined;
        }
        return data;
      },
    ],
  },
}