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
// Konfigurerer miljøvariabler fra .env-filen
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
// Setter opp nodemailer for e-postkonfigurasjon
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    },
});
// Oppretter en global cache for Payload-instansen
let cached = global.payload;
if (!cached) {
    // Initialiserer cache hvis den ikke finnes
    cached = global.payload = {
        client: null,
        promise: null,
    };
}
// Funksjonen som initialiserer eller returnerer en eksisterende Payload-klient
const getPayloadClient = async ({ initOptions } = {}) => {
    if (!process.env.PAYLOAD_SECRET) {
        console.error("PAYLOAD_SECRET is missing");
        throw new Error("PAYLOAD_SECRET is missing");
    }
    // Hvis Payload allerede er initialisert, returnerer den cachede klienten
    if (cached.client) {
        console.log("Returning cached Payload client");
        return cached.client;
    }
    // Hvis Payload ikke er initialisert, konfigurerer og initialiserer Payload
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
        // Fullfør initialiseringen av Payload og lagre instansen i cache
        cached.client = await cached.promise;
        console.log("Payload client initialized successfully via get-payload.ts");
    }
    catch (e) {
        // Nullstiller promise hvis initialisering feiler, og logger feilen
        cached.promise = null;
        console.error("Failed to initialize Payload client", e);
        throw e;
    }
    return cached.client;
};
exports.getPayloadClient = getPayloadClient;
