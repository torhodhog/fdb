import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { getPayloadClient } from '../get-payload'
import { stripe } from '../lib/stripe'
import { privateProcedure, publicProcedure, router } from './trpc'

import type Stripe from 'stripe'

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      let { productIds } = input

      if (productIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const payload = await getPayloadClient()

      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      })

      console.log('Found products:', products) // Log the found products

      const filteredProducts = products.filter((prod) =>
        Boolean(prod.priceId)
      )

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      })

      console.log('Created order:', order) // Log the created order

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        []

      filteredProducts.forEach((product) => {
         line_items.push({
            price_data: {
               currency: 'nok',
               product_data: {
                  name: product.name,
               },
               unit_amount: product.price * 100, // Convert price to øre
            },
            quantity: 1,
         })
      })

      console.log('Created line items:', line_items) // Log the created line items

      try {
        const stripeSession =
          await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
            payment_method_types: ['card'],
            mode: 'payment',
            metadata: {
              userId: user.id,
              orderId: order.id,
            },
            line_items,
            shipping_address_collection: {
              allowed_countries: ['NO'], // Only allow shipping to Norway
            },
          })

        console.log('Created Stripe session:', stripeSession) // Log the created Stripe session

        return { url: stripeSession.url }
      } catch (err) {
        console.error('Error creating Stripe session:', err) // Log any errors
        return { url: null }
      }
    }),
  // ...
})