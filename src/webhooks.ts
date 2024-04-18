import express from "express";
import { stripe } from "./lib/stripe";
import { WebhookRequest } from "./server";

import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log("Stripe event constructed successfully:", event.id);

    if (event.type === "checkout.session.completed") {
      console.log("Handling checkout.session.completed event");
      handleCheckoutSessionCompleted(event, res);
      return;
    } else {
      console.log("Received non-handled event type:", event.type);
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  return res.status(200).send("Event received, no action required.");
};


async function handleCheckoutSessionCompleted(event: Stripe.Event, res: express.Response) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.metadata?.orderId) {
    console.error("Missing orderId in session metadata", session.id);
    return res.status(400).send("Webhook Error: Missing orderId in metadata");
  }

  const payload = await getPayloadClient();
  try {
    const { docs: orders } = await payload.find({
      collection: "orders",
      where: { id: { equals: session.metadata.orderId } },
      depth: 2,
    });

    if (!orders || orders.length === 0) {
      console.error("No order found with ID:", session.metadata.orderId);
      return res.status(404).send("Order not found");
    }

    const order = orders[0];
    if (!order) {
      console.error("No order found with ID:", session.metadata.orderId);
      return res.status(404).send("Order not found");
    }

    let retries = 3;
    while (retries > 0) {
      try {
        // Add a delay before each update attempt
        await new Promise(resolve => setTimeout(resolve, 1000));

        const updateResult = await payload.update({
          collection: "orders",
          id: order.id,
          data: { _isPaid: true },
        });
        console.log(`_isPaid status updated for order ${order.id}:`, updateResult);

        // After updating order as paid, mark products as sold
        if (order.products && order.products.length > 0) {
          await Promise.all(order.products.map(async (product) => {
            if (typeof product === 'object' && product.id) {
              await payload.update({
                collection: "products",
                id: product.id,
                data: { isSold: true },
              });
            }
          }));
        }

        break;  // Exit the loop if successful
      } catch (error) {
        if (error instanceof Error && 'code' in error && (error as any).code === 112) { // WriteConflict error code
          console.error("Write conflict error, retrying...", error);
          retries--;
          continue;
        }
        console.error("Error updating order:", error);
        return res.status(500).send("Internal server error during webhook processing.");
      }
    }

    return res.status(200).send("Checkout session completed successfully processed.");
  } catch (error) {
    console.error("Error processing checkout.session.completed event:", error);
    return res.status(500).send("Internal server error during webhook processing.");
  }
}
