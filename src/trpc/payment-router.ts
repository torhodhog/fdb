import { z } from 'zod'
import {
   privateProcedure,
   router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { stripe } from '../lib/stripe'
import type Stripe from 'stripe'
import { Product } from '../payload-types'

export const paymentRouter = router({
   createSession: privateProcedure
      .input(z.object({ 
         productIds: z.array(z.string()),
         leveringsinfo: z.object({
            navn: z.string(),
            adresse: z.string(),
            postnummer: z.string(),
            by: z.string(),
            telefonnummer: z.string(),
            land: z.string(),
         }),
      }))
      .mutation(async ({ ctx, input }) => {
         console.log('Create Session called with input :', input)
         const { user } = ctx
         let { productIds, leveringsinfo } = input

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

         const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
            []

         filteredProducts.forEach((product) => {
            line_items.push({
               price: product.priceId!,
               quantity: 1,
            })
         })

         const deliveryFee = 50; 

         line_items.push({
            price_data: {
               currency: "nok",
               product_data: {
                  name: "Delivery Fee",
               },
               unit_amount: deliveryFee * 100, 
            },
            quantity: 1,
         });

         try {
            const stripeSession = await stripe.checkout.sessions.create({
               success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
               cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
               payment_method_types: ['card', 'klarna'],
               mode: 'payment',
               metadata: {
                  userId: user.id,
                  orderId: order.id,
                  leveringsNavn: leveringsinfo.navn,
                  leveringsAdresse: leveringsinfo.adresse,
                  leveringsPostnummer: leveringsinfo.postnummer,
                  leveringsBy: leveringsinfo.by,
                  leveringsTelefonnummer: leveringsinfo.telefonnummer,
                  leveringsLand: leveringsinfo.land,
               },
               line_items,
            })

            console.log('Stripe Session:', stripeSession)

            return { url: stripeSession.url }
         } catch (err) {
            console.error(err);
            return { url: null }
         }
      }),
   pollOrderStatus: privateProcedure
      .input(z.object({ orderId: z.string() }))
      .query(async ({ input }) => {
         const { orderId } = input

         const payload = await getPayloadClient()

         const { docs: orders } = await payload.find({
            collection: 'orders',
            where: {
               id: {
                  equals: orderId,
               },
            },
         })

         if (!orders.length) {
            throw new TRPCError({ code: 'NOT_FOUND' })
         }

         const [order] = orders

         // If the order is paid, mark all products in the order as sold
         if (order._isPaid) {
            for (const productId of order.products) {
               // Fetch the existing product
               const { docs: products } = await payload.find({
                  collection: 'products',
                  where: {
                     id: {
                        equals: productId,
                     },
                  },
               })

               // Use a type assertion to tell TypeScript that productToUpdate includes the isSold field
               const productToUpdate = products[0] as Product & { isSold: boolean }

               // Update the isSold field
               productToUpdate.isSold = true

               // Update the product
               await payload.update({
                  collection: 'products',
                  data: productToUpdate,
                  where: {
                     id: {
                        equals: productId,
                     },
                  },
               })
            } // Closing brace for the for loop
         } // Closing brace for the if statement

         return { isPaid: order._isPaid }
         })
         })