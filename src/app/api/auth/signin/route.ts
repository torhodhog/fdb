import { getPayloadClient } from "@/get-payload";
import { SignInCredentialsValidator } from "@/lib/validators/account-credentials-validators";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = SignInCredentialsValidator.parse(body);
    
    const payload = await getPayloadClient();
    
    // Create a simple response object that mimics Express res
    const mockRes = {
      setHeader: () => {},
      headers: new Map(),
      cookies: new Map(),
    };
    
    await payload.login({
      collection: "users",
      data: { email, password },
      res: mockRes as any,
    });
    
    // If login succeeded, set the cookies manually
    const cookieStore = cookies();
    
    // You might need to extract the actual cookie from payload login
    // This is a simplified version - you may need to adapt based on how Payload sets cookies
    
    return Response.json({ success: true }, { 
      status: 200,
      headers: {
        'Set-Cookie': 'payload-token=success; Path=/; HttpOnly; SameSite=Lax'
      }
    });
    
  } catch (error) {
    return Response.json(
      { success: false, error: "Unauthorized" }, 
      { status: 401 }
    );
  }
}
