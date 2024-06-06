import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import { privateProcedure, router } from "./trpc";

import type Stripe from "stripe";
import { Product } from "../payload-types";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
        leveringsinfo: z.object({
          navn: z.string(),
          adresse: z.string(),
          postnummer: z.string(),
          by: z.string(),
          telefonnummer: z.string().max(20), // Ensure maximum length
          land: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Create Session called with input:", input);
      const { user } = ctx;

      if (!user) {
        console.error("User context is missing");
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      let { productIds, leveringsinfo } = input;
      if (productIds.length === 0) {
        console.error("No products provided");
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();
      console.log("Payload client instantiated");

      const { docs: products } = await payload.find({
        collection: "products",
        where: { id: { in: productIds } },
      });

      console.log(
        "Products fetched:",
        products.map((p) => p.name)
      );

      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));
      console.log(
        "Filtered products (with priceId):",
        filteredProducts.map((p) => p.name)
      );

      const order = await payload.create({
        collection: "orders",
        data: {
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      });

      console.log("Order created with ID:", order.id);

      const line_items = filteredProducts.map((product) => ({
        price_data: {
          currency: "nok",
          product_data: { name: product.name },
          unit_amount: (product.salePrice || product.price) * 100,
        },
        quantity: 1,
      }));

      const deliveryFee = 0;
      line_items.push({
        price_data: {
          currency: "nok",
          product_data: { name: "Delivery Fee" },
          unit_amount: deliveryFee * 100,
        },
        quantity: 1,
      });

      console.log("Line items prepared for Stripe Checkout");

      try {
        const customer = await stripe.customers.create({
          name: leveringsinfo.navn,
          phone: leveringsinfo.telefonnummer.substring(0, 20), // Truncate phone number
          address: {
            line1: leveringsinfo.adresse,
            city: leveringsinfo.by,
            postal_code: leveringsinfo.postnummer,
            country: leveringsinfo.land,
          },
        });

        console.log("Stripe customer created with ID:", customer.id);

        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card", "klarna"],
          mode: "payment",
          shipping_address_collection: { allowed_countries: ["NO"] },
          line_items,
          metadata: { userId: user.id, orderId: order.id },
          customer: customer.id, // Refer to the customer by ID
          phone_number_collection: {
            enabled: true,
          },
        });

        console.log("Stripe Session created:", stripeSession.id);
        return { url: stripeSession.url };
      } catch (err) {
        console.error("Failed to create Stripe session:", (err as Error).message); // Improved error logging
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: (err as Error).message });
      }
    }),

  pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;
      console.log("Polling status for order:", orderId);

      const payload = await getPayloadClient();
      const { docs: orders } = await payload.find({
        collection: "orders",
        where: { id: { equals: orderId } },
      });

      if (!orders.length) {
        console.error("Order not found:", orderId);
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
