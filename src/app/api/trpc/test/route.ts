// Simple test endpoint to verify tRPC is working
export async function GET() {
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
