import express from "express";
// import { PayloadRequest } from "payload";
import payload from "payload";
import { Resend } from "resend";

import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail";
import { stripe } from "./lib/stripe";
import { Product } from "./payload-types";
import { WebhookRequest } from "./server";
import { paymentRouter } from "./trpc/payment-router";

import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";

interface CustomPayload {
  find: (args: any) => Promise<{ docs: any[] }>;
  update: (args: any) => Promise<any>;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const body = req.body as Buffer;
  const signature = req.headers["stripe-signature"] || "";

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log("✅ Stripe event constructed:", event.id);

    const payload = await getPayloadClient();

    if (event.type === "checkout.session.completed") {
      console.log("👉 Handling checkout.session.completed");
      await handleCheckoutSessionCompleted(event, res, req, payload as CustomPayload);
      return;
    } else {
      console.log("ℹ️ Received unhandled event type:", event.type);
    }
  } catch (err) {
    console.error("❌ Error verifying Stripe signature or constructing event:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  return res.status(200).send("Event received, no action required.");
};

async function handleCheckoutSessionCompleted(
  event: Stripe.Event,
  res: express.Response,
  req: express.Request,
  payload: CustomPayload
) {
  const session = event.data.object as Stripe.Checkout.Session;
  console.log("🧾 Session metadata:", session.metadata);

  if (!session.metadata?.orderId) {
    console.error("❌ Missing orderId in session metadata", session.id);
    return res.status(400).send("Webhook Error: Missing orderId in metadata");
  }

  try {
    const { docs: orders } = await payload.find({
      collection: "orders",
      where: { id: { equals: session.metadata.orderId } },
    });

    if (!orders.length) {
      console.error("❌ No order found with ID:", session.metadata.orderId);
      return res.status(404).send("Order not found");
    }

    const order = orders[0];
    console.log("✅ Order found:", order.id);
    console.log("🧾 order.products før casting:", order.products);

    const productIds = (order.products as any[])
      .map((p) => (typeof p === "string" ? p : p?.id))
      .filter((id): id is string => typeof id === "string");

    const { docs: productDocs } = await payload.find({
      collection: "products",
      where: { id: { in: productIds } },
      limit: 100,
    });

    console.log("✅ Products loaded:", productDocs.map((p) => p.name));

    if (session.metadata?.userId) {
      await payload.update({
        collection: "orders",
        id: order.id,
        data: { _isPaid: true, user: session.metadata.userId },
      });

      console.log("✅ Order marked as paid for user:", session.metadata.userId);

      for (const product of productDocs) {
        await payload.update({
          collection: "products",
          id: product.id,
          data: { isSold: true },
        });
      }

      console.log("✅ Products marked as sold");

      try {
        const user = await payload
          .find({
            collection: "users",
            where: { id: { equals: session.metadata.userId } },
          })
          .then((result) => result.docs[0]);

        if (!user || !user.email) {
          console.error("❌ User not found or missing email:", session.metadata.userId);
          return res.status(404).send("User not found or missing email");
        }

        console.log("📧 Sending email to:", user.email);

        const html = await ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: productDocs,
          deliveryFee: (order as any).deliveryFee,
        });

        const data = await resend.emails.send({
          from: "Fotballdraktbutikken AS <fdb@fotballdraktbutikken.com>",
          to: [user.email],
          subject: "Takk for din bestilling. Her er din kvittering.",
          html,
        });

        console.log("✅ Receipt email sent:", data);
        return res.status(200).json({ data });
      } catch (err) {
        console.error("❌ Failed sending receipt:", err);
        return res.status(500).json({ error: "Failed to send receipt email" });
      }
    } else {
      console.error("❌ Missing userId in session metadata", session.id);
      return res.status(400).send("Webhook Error: Missing userId in metadata");
    }
  } catch (error) {
    console.error("💥 Webhook feilet inne i handleCheckoutSessionCompleted:", error);
    return res.status(500).send("Internal server error during webhook processing.");
  }
}
