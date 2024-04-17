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

    // Log the full details of the Stripe event right after verifying it
    console.log("Received Stripe event:", JSON.stringify(event, null, 2)); // Provides a detailed printout of the event data

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
  console.log("Webhook event type:", event.type);

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

    // Update payment status if not already paid
    if (!order._isPaid) {
        console.log("Attempting to update order payment status for order ID:", order.id);
        const updateResult = await payload.update({
            collection: "orders",
            id: order.id,
            data: { _isPaid: true },
        });
        console.log("Order payment status update result:", updateResult);
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
