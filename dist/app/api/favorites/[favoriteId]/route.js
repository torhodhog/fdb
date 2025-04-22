"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = DELETE;
const server_1 = require("next/server");
const headers_1 = require("next/headers");
const get_payload_1 = require("../../../../get-payload");
async function DELETE(req, { params }) {
    const payload = await (0, get_payload_1.getPayloadClient)();
    const { user } = await payload.getServerSideUser((0, headers_1.cookies)());
    if (!user) {
        return server_1.NextResponse.json({ error: "Ikke logget inn" }, { status: 401 });
    }
    const { favoriteId } = params;
    if (!favoriteId) {
        return server_1.NextResponse.json({ error: "ID kreves" }, { status: 400 });
    }
    const favorite = await payload.find({
        collection: "favorites",
        where: {
            product: {
                equals: favoriteId,
            },
        },
    });
    if (!favorite.docs.length) {
        return server_1.NextResponse.json({ error: "Favoritt ikke funnet" }, { status: 404 });
    }
    await payload.delete({
        collection: "favorites",
        id: favorite.docs[0].id,
    });
    return server_1.NextResponse.json({ success: true });
}
