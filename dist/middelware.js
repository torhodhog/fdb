"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const server_1 = require("next/server");
const payload_utils_1 = require("./lib/payload-utils");
async function middleware(req) {
    const { nextUrl, cookies } = req;
    const { user } = await (0, payload_utils_1.getServerSideUser)(cookies);
    if (user &&
        ['/sign-in', '/sign-up'].includes(nextUrl.pathname)) {
        return server_1.NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
    }
    return server_1.NextResponse.next();
}
