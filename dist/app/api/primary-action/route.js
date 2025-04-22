"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
// File: app/api/primary-action/route.ts
const server_1 = require("next/server");
const PrimaryActionEmail_1 = require("@/components/emails/PrimaryActionEmail");
const components_1 = require("@react-email/components");
const resend_1 = require("resend");
const react_1 = __importDefault(require("react"));
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function POST(req) {
    try {
        const body = await req.json();
        const { email, actionLabel, buttonText, href } = body;
        if (!email || !actionLabel || !buttonText || !href) {
            return server_1.NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const html = await (0, components_1.render)(react_1.default.createElement(PrimaryActionEmail_1.EmailTemplate, {
            actionLabel: actionLabel,
            buttonText: buttonText,
            href: href,
        }));
        await resend.emails.send({
            from: "fdb@fotballdraktbutikken.com",
            to: email,
            subject: actionLabel,
            html,
        });
        return server_1.NextResponse.json({ success: true });
    }
    catch (error) {
        console.error("Error sending email:", error);
        return server_1.NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
