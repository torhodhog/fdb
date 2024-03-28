import { AfterChangeHook, BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload/types'

import { PRODUCT_CATEGORIES } from '../../config'
import { stripe } from '../../lib/stripe'
import { Product, User } from '../../payload-types'

const addUser: BeforeChangeHook<Product> = async ({
   req,
   data,
}) => {
   const user = req.user

   return { ...data, user: user.id }
}

const syncUser: AfterChangeHook<Product> = async ({
   req,
   doc,
}) => {
   const fullUser = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
   })

   if (fullUser && typeof fullUser === 'object') {
      const { products } = fullUser

      const allIDs = [
         ...(products?.map((product) =>
            typeof product === 'object' ? product.id : product
         ) || []),
      ]

      const createdProductIDs = allIDs.filter(
         (id, index) => allIDs.indexOf(id) === index
      )

      const dataToUpdate = [...createdProductIDs, doc.id]

      await req.payload.update({
         collection: 'users',
         id: fullUser.id,
         data: {
            products: dataToUpdate,
         },
      })
   }
}

const isAdminOrHasAccess =
   (): Access =>
   ({ req: { user: _user } }) => {
      const user = _user as User | undefined

      if (!user) return false
      if (user.role === 'admin') return true

      const userProductIDs = (user.products || []).reduce<
         Array<string>
      >((acc, product) => {
         if (!product) return acc
         if (typeof product === 'string') {
            acc.push(product)
         } else {
            acc.push(product.id)
         }

         return acc
      }, [])

      return {
         id: {
            in: userProductIDs,
         },
      }
   }

export const Products: CollectionConfig = {
   slug: 'products',
   admin: {
      useAsTitle: 'name',
   },
   access: {
      read: isAdminOrHasAccess(),
      update: isAdminOrHasAccess(),
      delete: isAdminOrHasAccess(),
   },
   hooks: {
      afterChange: [syncUser],
      beforeChange: [
        addUser,
        async (args) => {
          if (args.operation === 'create') {
            const data = args.data as Product
    
            const createdProduct = await stripe.products.create({
               name: data.name,
            });

            const price = await stripe.prices.create({
               currency: 'nok',
               unit_amount: Math.round(data.price * 100), // Convert price to øre
               product: createdProduct.id,
            });

            const updated: Product = {
               ...data,
               stripeId: createdProduct.id,
               priceId: createdProduct.default_price as string,
            }

               return updated
            } else if (args.operation === 'update') {
               const data = args.data as Product

               const updatedProduct =
                  await stripe.products.update(data.stripeId!, {
                     name: data.name,
                     default_price: data.priceId!,
                  })

               const updated: Product = {
                  ...data,
                  stripeId: updatedProduct.id,
                  priceId: updatedProduct.default_price as string,
               }

               return updated
            }
         },
      ],
   },
   fields: [
      {
         name: 'user',
         type: 'relationship',
         relationTo: 'users',
         required: true,
         hasMany: false,
         admin: {
            condition: () => false,
         },
      },
      {
         name: 'name',
         label: 'Name',
         type: 'text',
         required: true,
      },
      {
         name: 'description',
         type: 'textarea',
         label: 'Product details',
      },
      {
         name: 'price',
         label: 'Price in NOK',
         min: 0,
         max: 10000,
         type: 'number',
         required: true,
      },
      {
         name: 'product_files',
         type: 'array',
         fields: [
           {
             name: 'file',
             type: 'upload',
             relationTo: 'media',
           },
         ],
       },
      {
         name: 'size',
         label: 'Størrelse',
         type: 'select',
         options: [
            { label: "XS", value: "XS"},
            { label: "S", value: "S" },
            { label: "M", value: "M" },
            { label: "L", value: "L" },
            { label: "XL", value: "XL"},
            { label: "XXL", value: "XXL"},
            // Add more sizes as needed
         ],
         required: true,
      },
      {
         name: 'approvedForSale',
         label: 'Product Status',
         type: 'select',
         defaultValue: 'pending',
         access: {
            create: ({ req }) => req.user.role === 'admin',
            read: ({ req }) => req.user.role === 'admin',
            update: ({ req }) => req.user.role === 'admin',
         },
         options: [
            {
               label: 'Pending verification',
               value: 'pending',
            },
            {
               label: 'Approved',
               value: 'approved',
            },
            {
               label: 'Denied',
               value: 'denied',
            },
         ],
      },
      {
         name: 'priceId',
         access: {
            create: () => false,
            read: () => false,
            update: () => false,
         },
         type: 'text',
         admin: {
            hidden: true,
         },
      },
      {
         name: 'stripeId',
         access: {
            create: () => false,
            read: () => false,
            update: () => false,
         },
         type: 'text',
         admin: {
            hidden: true,
         },
      },
      {
         name: 'images',
         type: 'array',
         label: 'Product images',
         minRows: 1,
         maxRows: 4,
         required: true,
         labels: {
            singular: 'Image',
            plural: 'Images',
         },
         fields: [
            {
               name: 'image',
               type: 'upload',
               relationTo: 'media',
               required: true,
            },
         ],
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
            { label: "6 - Bør repareres", value: "6" },
            { label: "5 - Reparasjon kreves", value: "5" },
            // Legg til flere tilstandsnivåer etter behov
         ],
      },
      {
        name: 'trykk',
        label: 'Trykk',
        type: 'select', // Du manglet også 'type'-feltet her
        options: [
          { label: 'Ja', value: 'Ja' },
          { label: 'Nei', value: 'Nei' },
        ],
      },
     
   ],
}