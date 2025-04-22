"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const get_payload_1 = require("@/get-payload");
async function GET() {
    const payload = await (0, get_payload_1.getPayloadClient)();
    // Fetch alle favorites
    const { docs: favorites } = await payload.find({
        collection: "favorites",
        limit: 1000, // juster om nødvendig
    });
    // Tell hvor mange ganger hvert produkt er favorisert
    const counts = {};
    for (const fav of favorites) {
        const id = typeof fav.product === "string" ? fav.product : fav.product.id;
        counts[id] = (counts[id] || 0) + 1;
    }
    // Sortér og hent top 3
    const topProductIds = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id]) => id);
    // Hent produktdata for de 3
    const { docs: products } = await payload.find({
        collection: "products",
        where: {
            id: { in: topProductIds },
        },
        limit: 3,
    });
    // Legg på antall favoriseringer
    const enriched = products.map((p) => ({
        ...p,
        favorites: counts[p.id] || 0,
    }));
    return new Response(JSON.stringify(enriched), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
