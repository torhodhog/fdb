import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload from 'payload';
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Definer en generisk type for cached objektet
let cached: { client: any | null, promise: Promise<any> | null } = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<any> => {
  if (!process.env.PAYLOAD_SECRET) {
    console.error("PAYLOAD_SECRET is missing");
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    console.log("Returning cached Payload client");
    return cached.client;
  }

  // Initialiserer Payload med de gitte opsjonene og konfigurasjoner
  cached.promise = payload.init({
    email: {
      transport: transporter,
      fromAddress: "fdb@fotballdraktbutikken.com",
      fromName: "Fotballdraktbutikken AS",
    },
    secret: process.env.PAYLOAD_SECRET,
    ...(initOptions || {}),
  });

  try {
    cached.client = await cached.promise; // Bruker any type midlertidig
    console.log("Payload client initialized successfully");
  } catch (e: unknown) {
    cached.promise = null;
    console.error("Failed to initialize Payload client", e);
    throw e;
  }

  return cached.client;
};
