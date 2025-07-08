// Emergency fallback auth endpoint that doesn't use tRPC
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    
    // Create a cookie object compatible with getServerSideUser
    const cookieObj = {
      get: (name: string) => {
        const cookie = cookieStore.get(name);
        return cookie ? { value: cookie.value } : undefined;
      }
    };

    const { user } = await getServerSideUser(cookieObj as any);
    
    return Response.json({ user }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return Response.json({ user: null }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache', 
        'Expires': '0'
      }
    });
  }
}
