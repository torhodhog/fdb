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

    const { docs: orders } = await payload.find({
      collection: "orders",
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
      depth: 2,
    });

    const [order] = orders;

    if (!order) {
      console.error("Order not found");
      return res.status(404).json({ error: "No such order exists." });
    }

    // Mark all products in the order as sold
    for (const product of order.products) {
      const productId = typeof product === "object" ? product.id : product;

      // Update 'isSold' to 'true'
      try {
        const updatedProduct = await payload.update({
          collection: "products",
          id: productId,
          data: { isSold: true },
        });
        console.log("Updated product as sold:", updatedProduct);
      } catch (error) {
        console.error("Error updating product as sold:", error);
      }
    }

    res.status(200).send("Order processed and products updated as sold.");
  }

  return res.status(200).send();
};
