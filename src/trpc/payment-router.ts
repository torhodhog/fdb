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
          telefonnummer: z.string(),
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

      console.log("Products fetched:", products.map(p => p.name));

      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));
      console.log("Filtered products (with priceId):", filteredProducts.map(p => p.name));

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
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

      const deliveryFee = 87;
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
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card", "klarna"],
          mode: "payment",
          shipping_address_collection: { allowed_countries: ["NO"] },
          line_items,
          metadata: { userId: user.id, orderId: order.id },
        });

        console.log("Stripe Session created:", stripeSession.id);
        return { url: stripeSession.url };
      } catch (err) {
        console.error("Failed to create Stripe session:", err);
        return { url: null };
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
    console.log("Order found:", order.id, "Paid status:", order._isPaid);

    if (order._isPaid) {
  console.log("Order is paid, marking products as sold...");
  for (const productId of order.products) {
    const { docs: products } = await payload.find({
      collection: "products",
      where: { id: { equals: productId } },
    });

    if (!products.length) {
      console.error("Product not found during update:", productId);
      continue;
    }

    const productToUpdate = products[0];
    if (productToUpdate) {
      await payload.update({
        collection: "products",
        data: { isSold: true },
        where: { id: { equals: productId } },
      });

      console.log(`Product ${productId} marked as sold.`);
    } else {
      console.error("Product not found during update:", productId);
    }
  }
}

    return { isPaid: order._isPaid };
  }),
});
