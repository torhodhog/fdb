// get-payload.ts
import dotenv from "dotenv";
import path from "path";

import type { InitOptions } from "payload/config";
import payload from "payload";
import nodemailer from "nodemailer";

// Konfigurerer miljøvariabler fra .env-filen
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Setter opp nodemailer for e-postkonfigurasjon
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Oppretter en global cache for Payload-instansen
let cached: { client: any | null; promise: Promise<any> | null } = (global as any).payload;

if (!cached) {
  // Initialiserer cache hvis den ikke finnes
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

// Definerer typer for initieringsargumenter
interface Args {
  initOptions?: Partial<InitOptions>;
  seed?: boolean; // Valgfri parameter for seeding (hvis aktuelt)
}

// Funksjonen som initialiserer eller returnerer en eksisterende Payload-klient
export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<any> => {
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
    cached.promise = (payload as any).init({
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
  } catch (e: unknown) {
    // Nullstiller promise hvis initialisering feiler, og logger feilen
    cached.promise = null;
    console.error("Failed to initialize Payload client", e);
    throw e;
  }

  return cached.client;
};
