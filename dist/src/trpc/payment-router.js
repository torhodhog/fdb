"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const get_payload_1 = require("../get-payload");
const stripe_1 = require("../lib/stripe");
const trpc_1 = require("./trpc");
// Kartlegging av land til valuta
const countryToCurrencyMap = {
    NO: "nok",
    SE: "sek",
    DK: "dkk",
    US: "usd",
    EU: "eur",
    // For å godkjenne flere land og deres valutaer.
};
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({
        productIds: zod_1.z.array(zod_1.z.string()),
        leveringsinfo: zod_1.z.object({
            navn: zod_1.z.string(),
            adresse: zod_1.z.string(),
            postnummer: zod_1.z.string(),
            by: zod_1.z.string(),
            telefonnummer: zod_1.z.string().max(20),
            land: zod_1.z.string(),
        }),
        deliveryMethod: zod_1.z.string(),
    }))
        .mutation(async ({ ctx, input }) => {
        console.log("Create Session called with input:", input);
        const { user } = ctx;
        if (!user) {
            console.error("User context is missing");
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        }
        const { productIds, leveringsinfo, deliveryMethod } = input;
        if (productIds.length === 0) {
            console.error("No products provided");
            throw new server_1.TRPCError({ code: "BAD_REQUEST" });
        }
        const payload = await (0, get_payload_1.getPayloadClient)();
        console.log("Payload client instantiated");
        const result = await payload.find({
            collection: "products",
            where: { id: { in: productIds } },
        });
        const products = result.docs;
        console.log("Products fetched:", products.map((p) => p.name));
        const filteredProducts = products.filter((prod) => Boolean(prod.priceId));
        console.log("Filtered products (with priceId):", filteredProducts.map((p) => p.name));
        const order = await payload.create({
            collection: "orders",
            data: {
                products: filteredProducts.map((prod) => prod.id.toString()),
                user: user.id,
                deliveryMethod, // Lagre leveringsmetoden i ordren
            },
        });
        console.log("Order created with ID:", order.id, "and delivery method:", deliveryMethod);
        // Bestem valuta basert på kundens land
        const currency = countryToCurrencyMap[leveringsinfo.land.toUpperCase()] || "nok"; // Standard til NOK hvis landet ikke er i kartet
        const line_items = filteredProducts.map((product) => ({
            price_data: {
                currency: currency,
                product_data: { name: product.name },
                unit_amount: (product.salePrice || product.price) * 100, // Husk at du kanskje må konvertere til riktig valuta
            },
            quantity: 1,
        }));
        // Beregn totalpris
        const totalPrice = filteredProducts.reduce((sum, product) => {
            return sum + (product.salePrice || product.price);
        }, 0);
        console.log("Total price of products:", totalPrice);
        console.log("Delivery method:", deliveryMethod);
        // Legg til leveringsavgift hvis aktuelt
        let deliveryFee = 0;
        if (deliveryMethod === "delivery" && totalPrice < 1500) {
            deliveryFee = 74 * 100; // Øre
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: { name: "Delivery Fee" },
                    unit_amount: deliveryFee,
                },
                quantity: 1,
            });
            console.log("Delivery fee added:", deliveryFee);
        }
        else {
            console.log("No delivery fee added. Delivery method:", deliveryMethod, "Total price:", totalPrice);
        }
        console.log("Final line items prepared for Stripe Checkout:", line_items);
        try {
            const customer = await stripe_1.stripe.customers.create({
                name: leveringsinfo.navn,
                phone: leveringsinfo.telefonnummer.substring(0, 20),
                address: {
                    line1: leveringsinfo.adresse,
                    city: leveringsinfo.by,
                    postal_code: leveringsinfo.postnummer,
                    country: leveringsinfo.land,
                },
            });
            console.log("Stripe customer created with ID:", customer.id);
            const stripeSession = await stripe_1.stripe.checkout.sessions.create({
                success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                payment_method_types: ["card", "klarna"],
                mode: "payment",
                shipping_address_collection: {
                    allowed_countries: [
                        "US", "CA", "GB", "DE", "FR", "IT", "ES", "NL", "FI", "IS", "CH", "NO", "SE", "DK",
                    ],
                },
                line_items,
                customer: customer.id,
                payment_intent_data: {
                    metadata: {
                        userId: user.id,
                        orderId: order.id,
                        deliveryMethod: order.deliveryMethod,
                    },
                },
                allow_promotion_codes: true,
            });
            console.log("Stripe Session created:", stripeSession.id);
            return { url: stripeSession.url };
        }
        catch (err) {
            console.error("Failed to create Stripe session:", err.message);
            throw new server_1.TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
        }
    }),
    pollOrderStatus: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(async ({ input }) => {
        const { orderId } = input;
        console.log("Polling status for order:", orderId);
        const payload = await (0, get_payload_1.getPayloadClient)();
        const { docs: orders } = await payload.find({
            collection: "orders",
            where: { id: { equals: orderId } },
        });
        if (!orders.length) {
            console.error("Order not found:", orderId);
            throw new server_1.TRPCError({ code: "NOT_FOUND" });
        }
        const [order] = orders;
        return { isPaid: order._isPaid };
    }),
});
