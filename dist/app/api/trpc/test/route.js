"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
async function GET(req) {
    return server_1.NextResponse.json({ message: 'TRPC test endpoint' });
}
