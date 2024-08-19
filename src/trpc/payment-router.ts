import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import { privateProcedure, router } from "./trpc";

interface Product {
  id: string;
  name: string;
  priceId?: string;
  price?: number;
  salePrice?: number;
}

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
          telefonnummer: z.string().max(20),
          land: z.string(),
        }),
        deliveryMethod: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Create Session called with input:", input);
      const { user } = ctx;

      if (!user) {
        console.error("User context is missing");
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { productIds, leveringsinfo, deliveryMethod } = input;
      if (productIds.length === 0) {
        console.error("No products provided");
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();
      console.log("Payload client instantiated");

      const result = await payload.find({
        collection: "products",
        where: { id: { in: productIds } },
      });

      const products = (result as unknown as { docs: Product[] }).docs; // Convert to unknown first, then to Product[]

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
          products: filteredProducts.map((prod) => prod.id.toString()), // Explicitly cast prod.id to string
          user: user.id,
        },
      });

      console.log("Order created with ID:", order.id);

      const line_items = filteredProducts.map((product) => ({
        price_data: {
          currency: "nok",
          product_data: { name: product.name as string }, // Type assertion to string
          unit_amount: ((product.salePrice as number) || (product.price as number)) * 100, // Type assertion to number
        },
        quantity: 1,
      }));

      // Calculate total price of products
      const totalPrice = filteredProducts.reduce((sum, product) => {
        return sum + ((product.salePrice as number) || (product.price as number)); // Type assertion to number
      }, 0);

      console.log("Total price of products:", totalPrice);
      console.log("Delivery method:", deliveryMethod);

      // Check if deliveryMethod is "delivery" and total price is less than 1500 NOK
      let deliveryFee = 0;
      if (deliveryMethod === "delivery" && totalPrice < 1500) {
        deliveryFee = 74 * 100; // Multiply by 100 to convert to øre
        line_items.push({
          price_data: {
            currency: "nok",
            product_data: { name: "Delivery Fee" },
            unit_amount: deliveryFee,
          },
          quantity: 1,
        });
        console.log("Delivery fee added:", deliveryFee);
      } else {
        console.log("No delivery fee added. Delivery method:", deliveryMethod, "Total price:", totalPrice);
      }

      console.log("Final line items prepared for Stripe Checkout:", line_items);

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
          customer: customer.id,
          allow_promotion_codes: true, // Enable promotion codes
        });

        console.log("Stripe Session created:", stripeSession.id);
        return { url: stripeSession.url };
      } catch (err) {
        console.error("Failed to create Stripe session:", (err as Error).message);
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