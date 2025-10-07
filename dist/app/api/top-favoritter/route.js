"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidate = exports.dynamic = void 0;
exports.GET = GET;
exports.dynamic = "force-dynamic";
exports.revalidate = 600; // Hente inn oppdatert versjon hvert 10 minutt. 
async function GET() {
    // Lazy-import først for sikkerhets skyld
    const { getPayloadClient } = await Promise.resolve().then(() => __importStar(require("@/get-payload")));
    const payload = await getPayloadClient();
    // Hente inn alle favoritter som er lagret i databasen, uavhengig av bruker
    const { docs: favorites } = await payload.find({
        collection: "favorites",
        limit: 1000,
    });
    const counts = {};
    for (const fav of favorites) {
        const id = typeof fav.product === "string" ? fav.product : fav.product.id;
        counts[id] = (counts[id] || 0) + 1;
    }
    const topProductIds = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id]) => id);
    const { docs: products } = await payload.find({
        collection: "products",
        where: {
            id: { in: topProductIds },
        },
        limit: 10,
        depth: 0,
    });
    const productsSorted = topProductIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
    const enriched = productsSorted.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        favorites: counts[p.id] || 0,
    }));
    return new Response(JSON.stringify(enriched), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
