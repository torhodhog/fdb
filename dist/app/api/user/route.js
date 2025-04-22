"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const payload_utils_1 = require("@/lib/payload-utils");
const headers_1 = require("next/headers");
async function GET() {
    const cookieStore = (0, headers_1.cookies)();
    const { user } = await (0, payload_utils_1.getServerSideUser)(cookieStore);
    if (!user) {
        return server_1.NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    return server_1.NextResponse.json({ userId: user.id, user });
}
