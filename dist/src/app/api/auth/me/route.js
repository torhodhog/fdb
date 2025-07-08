"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
// Emergency fallback auth endpoint that doesn't use tRPC
const payload_utils_1 = require("@/lib/payload-utils");
const headers_1 = require("next/headers");
async function GET() {
    try {
        const cookieStore = (0, headers_1.cookies)();
        // Create a cookie object compatible with getServerSideUser
        const cookieObj = {
            get: (name) => {
                const cookie = cookieStore.get(name);
                return cookie ? { value: cookie.value } : undefined;
            }
        };
        const { user } = await (0, payload_utils_1.getServerSideUser)(cookieObj);
        return Response.json({ user }, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    }
    catch (error) {
        return Response.json({ user: null }, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    }
}
