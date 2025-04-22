"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
// app/api/favorites/route.ts
const server_1 = require("next/server");
const headers_1 = require("next/headers");
const get_payload_1 = require("../../../get-payload");
// GET /api/favorites
async function GET(req) {
    try {
        const payload = await (0, get_payload_1.getPayloadClient)();
        const nextCookies = (0, headers_1.cookies)();
        const { user } = await payload.getServerSideUser(nextCookies);
        if (!user) {
            return server_1.NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
        }
        const { docs: favorites } = await payload.find({
            collection: "favorites",
            where: {
                user: {
                    equals: user.id,
                },
            },
        });
        return server_1.NextResponse.json(favorites);
    }
    catch (error) {
        console.error("Error fetching favorites:", error);
        return server_1.NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
// POST /api/favorites
async function POST(req) {
    try {
        const payload = await (0, get_payload_1.getPayloadClient)();
        const nextCookies = (0, headers_1.cookies)();
        const { user } = await payload.getServerSideUser(nextCookies);
        if (!user) {
            return server_1.NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
        }
        const body = await req.json();
        const { productId } = body;
        if (!productId) {
            return server_1.NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }
        console.log("Received productId:", productId);
        console.log("Authenticated user:", user);
        // Fetch the product to ensure it exists
        const product = await payload.findByID({
            collection: "products",
            id: productId,
        });
        if (!product) {
            console.error("Product not found for ID:", productId);
            return server_1.NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        console.log("Product exists:", product);
        console.log("Creating favorite with:", { user: user.id, product: productId });
        console.log("user.id:", user.id, "productId:", productId);
        try {
            const newFavorite = await payload.create({
                collection: "favorites",
                data: {
                    user: user.id, // Use authenticated user's ID
                    product: productId, // Ensure this matches the product ID in the products collection
                },
            });
            console.log("Successfully created favorite:", newFavorite);
            return server_1.NextResponse.json(newFavorite);
        }
        catch (error) {
            console.error("Error details:", error);
            throw error;
        }
    }
    catch (error) {
        console.error("Error creating favorite:", error);
        return server_1.NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
