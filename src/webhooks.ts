import express from "express";
import { Payload } from "payload";
import { Resend } from "resend";

import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail";
import { stripe } from "./lib/stripe";
import { Product } from "./payload-types";
import { WebhookRequest } from "./server";
import { paymentRouter } from "./trpc/payment-router";

import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const payload = await getPayloadClient(); // Await here ensures payload is initialized and ready

    if (event.type === "checkout.session.completed") {
      console.log("Handling checkout.session.completed event");
      await handleCheckoutSessionCompleted(event, res, req, payload); // Correctly pass the initialized payload
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

async function handleCheckoutSessionCompleted(
  event: Stripe.Event,
  res: express.Response,
  req: express.Request,
  payload: Payload
) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.metadata?.orderId) {
    console.error("Missing orderId in session metadata", session.id);
    return res.status(400).send("Webhook Error: Missing orderId in metadata");
  }

  try {
    const { docs: orders } = await payload.find({
      collection: "orders",
      where: { id: { equals: session.metadata.orderId } },
    });

    if (!orders || orders.length === 0) {
      console.error("No order found with ID:", session.metadata.orderId);
      return res.status(404).send("Order not found");
    }

    const order = orders[0];

    // Check if userId exists in metadata
    if (session.metadata?.userId) {
      await payload.update({
        collection: "orders",
        id: order.id,
        data: { _isPaid: true, user: session.metadata.userId },
      });

      for (const product of order.products) {
        const productId = typeof product === "string" ? product : product.id;
        await payload.update({
          collection: "products",
          id: productId,
          data: { isSold: true },
        });
      }

      // Send receipt
      try {
        const { docs: users } = await payload.find({
          collection: "users",
          where: { id: { equals: session.metadata.userId } },
        });

        if (!users || users.length === 0) {
          console.error("No user found with ID:", session.metadata.userId);
          return res.status(404).send("User not found");
        }

        const user = users[0];

        const data = await resend.emails.send({
          from: "Fotballdraktbutikken AS <fdb@fotballdraktbutikken.com>",
          to: [user.email],
          subject: "Takk for din bestilling. Her er din kvittering..",
          html: ReceiptEmailHtml({
            date: new Date(),
            email: user.email,
            orderId: session.metadata.orderId,
            products: order.products as Product[],
            deliveryFee: (order as any).deliveryFee,
          }),
        });
        res.status(200).json({ data });
      } catch (error) {
        res.status(500).json({ error });
      }

      return res
        .status(200)
        .send("Checkout session completed successfully processed.");
    } else {
      console.error("Missing userId in session metadata", session.id);
      return res.status(400).send("Webhook Error: Missing userId in metadata");
    }
  } catch (error) {
    console.error("Error processing checkout.session.completed event:", error);
    return res
      .status(500)
      .send("Internal server error during webhook processing.");
  }
}
