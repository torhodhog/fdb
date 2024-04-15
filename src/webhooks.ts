import express from "express";

import { stripe } from "./lib/stripe";
import { WebhookRequest } from "./server";

import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";
import { Product } from "./payload-types";
import { Resend } from "resend";
import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    console.log("Received Stripe event:", event); // Log the event
  } catch (err) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return res.status(400).send(`Webhook Error: No user present in metadata`);
  }
  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    if (!user) return res.status(404).json({ error: "No such user exists." });

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    if (!order) return res.status(404).json({ error: "No such order exists." });

    // Mark all products in the order as sold
    for (const product of order.products) {
      const productId = typeof product === "object" ? product.id : product;

      // Fetch the existing product
      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            equals: productId,
          },
        },
      });

      // Use a type assertion to tell TypeScript that productToUpdate includes the isSold field
      const productToUpdate = products[0] as Product & { isSold: boolean };

      // Update the isSold field
      productToUpdate.isSold = true;

      // Update the product
      await payload.update({
        collection: "products",
        data: productToUpdate,
        where: {
          id: {
            equals: productId,
          },
        },
      });

      // send receipt
      try {
        const data = await resend.emails.send({
          from: "Fotballdraktbutikken <fdb@fotballdraktbutikken.com>",
          to: [user.email],
          subject: "Takk for din bestilling! Dette er din kvittering.",
          html: ReceiptEmailHtml({
            date: new Date(),
            email: user.email,
            orderId: session.metadata.orderId,
            products: order.products
              .filter(
                (product): product is Product => typeof product !== "string"
              )
              .map((product: Product) => {
                product.price = product.salePrice || product.price;
                return product;
              }),
          }),
        });
        res.status(200).json({ data });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }

  return res.status(200).send();
};
