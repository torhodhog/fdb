"use strict";
// app/api/send-receipt/route.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const ReceiptEmail_1 = require("@/components/emails/ReceiptEmail");
const render_1 = require("@react-email/render");
const resend_1 = require("resend");
const server_1 = require("next/server");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function POST(req) {
    const body = await req.json();
    const { email, date, orderId, products, deliveryFee } = body;
    try {
        const emailHtml = await (0, render_1.render)((0, ReceiptEmail_1.ReceiptEmail)({ email, date: new Date(date), orderId, products, deliveryFee }), { pretty: true });
        console.log("Sender kvittering til:", email);
        const data = await resend.emails.send({
            from: "Fotballdraktbutikken AS <fdb@fotballdraktbutikken.com>", // ← OBS! Må være verifisert i Resend
            to: email,
            subject: "Kvittering fra Fotballdraktbutikken",
            html: emailHtml,
        });
        return server_1.NextResponse.json({ status: "OK", data });
    }
    catch (error) {
        console.error("Feil ved sending av kvittering:", error);
        return server_1.NextResponse.json({ error }, { status: 500 });
    }
}
