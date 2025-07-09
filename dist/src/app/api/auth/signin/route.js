"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const get_payload_1 = require("@/get-payload");
const account_credentials_validators_1 = require("@/lib/validators/account-credentials-validators");
const headers_1 = require("next/headers");
async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = account_credentials_validators_1.SignInCredentialsValidator.parse(body);
        const payload = await (0, get_payload_1.getPayloadClient)();
        // Create a simple response object that mimics Express res
        const mockRes = {
            setHeader: () => { },
            headers: new Map(),
            cookies: new Map(),
        };
        await payload.login({
            collection: "users",
            data: { email, password },
            res: mockRes,
        });
        // If login succeeded, set the cookies manually
        const cookieStore = (0, headers_1.cookies)();
        // You might need to extract the actual cookie from payload login
        // This is a simplified version - you may need to adapt based on how Payload sets cookies
        return Response.json({ success: true }, {
            status: 200,
            headers: {
                'Set-Cookie': 'payload-token=success; Path=/; HttpOnly; SameSite=Lax'
            }
        });
    }
    catch (error) {
        return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
}
