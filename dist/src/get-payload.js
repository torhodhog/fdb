"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadClient = void 0;
// get-payload.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const payload_1 = __importDefault(require("payload"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    },
});
let cached = global.payload;
if (!cached) {
    cached = global.payload = {
        client: null,
        promise: null,
    };
}
const getPayloadClient = async ({ initOptions } = {}) => {
    // 🚫 Unngå init under statisk Next.js build
    if (process.env.NEXT_BUILD === "true") {
        console.warn("Skipping Payload init during static build");
        return {};
    }
    if (!process.env.PAYLOAD_SECRET) {
        console.error("PAYLOAD_SECRET is missing");
        throw new Error("PAYLOAD_SECRET is missing");
    }
    if (cached.client) {
        console.log("Returning cached Payload client");
        return cached.client;
    }
    if (!cached.promise) {
        cached.promise = payload_1.default.init({
            email: {
                transport: transporter,
                fromAddress: "fdb@fotballdraktbutikken.com",
                fromName: "Fotballdraktbutikken AS",
            },
            secret: process.env.PAYLOAD_SECRET,
            ...(initOptions || {}),
        });
    }
    try {
        cached.client = await cached.promise;
        console.log("✅ Payload client initialized successfully via get-payload.ts");
    }
    catch (e) {
        cached.promise = null;
        console.error("❌ Failed to initialize Payload client", e);
        throw e;
    }
    return cached.client;
};
exports.getPayloadClient = getPayloadClient;
