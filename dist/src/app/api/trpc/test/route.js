"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
// Simple test endpoint to verify tRPC is working
async function GET() {
    return Response.json({
        message: "tRPC API is working",
        timestamp: new Date().toISOString(),
        availableRoutes: [
            "/api/trpc/auth.getMe",
            "/api/trpc/auth.signIn",
            "/api/trpc/auth.createPayloadUser"
        ]
    });
}
