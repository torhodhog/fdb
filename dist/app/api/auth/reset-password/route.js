"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
async function POST(req) {
    let body;
    try {
        body = await req.json();
    }
    catch (error) {
        return server_1.NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
    }
    const { token, password } = body;
    if (!token || !password) {
        return server_1.NextResponse.json({ error: "Token og passord er påkrevd." }, { status: 400 });
    }
    try {
        const payloadRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });
        if (!payloadRes.ok) {
            const errorDetails = await payloadRes.json();
            return server_1.NextResponse.json({ error: errorDetails.message || "Feil ved oppdatering av passord." }, { status: payloadRes.status });
        }
        return server_1.NextResponse.json({ message: "Passord oppdatert." });
    }
    catch (error) {
        console.error("Serverfeil:", error);
        return server_1.NextResponse.json({ error: "Intern serverfeil." }, { status: 500 });
    }
}
