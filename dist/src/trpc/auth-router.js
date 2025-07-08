"use strict";
// Denne filen håndterer alt som har med brukerautentisering å gjøre.
// Den bruker trpc for å lage tre funksjoner:
// 1. createPayloadUser – oppretter ny bruker i Payload CMS hvis e-posten ikke finnes fra før.
// 2. verifyEmail – sjekker om verifikasjonstoken fra e-post er gyldig.
// 3. signIn – logger inn brukeren ved å sende e-post og passord til Payload.
// Alle funksjonene snakker med databasen via getPayloadClient().
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const get_payload_1 = require("../get-payload");
const payload_utils_1 = require("../lib/payload-utils");
const account_credentials_validators_1 = require("../lib/validators/account-credentials-validators");
const trpc_1 = require("./trpc");
exports.authRouter = (0, trpc_1.router)({
    createPayloadUser: trpc_1.publicProcedure
        .input(account_credentials_validators_1.AuthCredentialsValidator)
        .mutation(async ({ input }) => {
        const { email, password, phone, address, country, postalCode } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        // Sjkk om e-posten allerede eksisterer
        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
            },
        });
        if (users.length !== 0)
            throw new server_1.TRPCError({ code: "CONFLICT" });
        // Opprett ny bruker i Payload med informasjonen fra input for å holde styr på sending av pakker
        await payload.create({
            collection: "users",
            data: {
                email,
                password,
                phone: phone || "",
                address,
                country,
                postalCode,
                role: "user",
            },
        });
        return { success: true, sentToEmail: email };
    }),
    // Send e-post for å bekrefte kontoen 
    verifyEmail: trpc_1.publicProcedure
        .input(zod_1.z.object({ token: zod_1.z.string() }))
        .query(async ({ input }) => {
        const { token } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        const isVerified = await payload.verifyEmail({
            collection: "users",
            token,
        });
        if (!isVerified)
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        return { success: true };
    }),
    signIn: trpc_1.publicProcedure
        .input(account_credentials_validators_1.SignInCredentialsValidator)
        .mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        const { res } = ctx;
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            await payload.login({
                collection: "users",
                data: {
                    email,
                    password,
                },
                res,
            });
            return { success: true };
        }
        catch (err) {
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        }
    }),
    getMe: trpc_1.publicProcedure.query(async ({ ctx }) => {
        try {
            // Handle both Next.js App Router Request and regular requests
            let cookieHeader = '';
            if (ctx.req) {
                // Try different ways to get cookies based on request type
                cookieHeader = ctx.req.headers?.get?.('cookie') ||
                    ctx.req.headers?.cookie ||
                    ctx.req.cookie || '';
            }
            // If no cookies at all, return early
            if (!cookieHeader) {
                return { user: null };
            }
            // Create a simple cookie parser
            const cookies = new Map();
            cookieHeader.split(';').forEach((cookie) => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    try {
                        cookies.set(name, decodeURIComponent(value));
                    }
                    catch {
                        cookies.set(name, value); // Fallback if decoding fails
                    }
                }
            });
            // Create a cookie object compatible with getServerSideUser
            const cookieObj = {
                get: (name) => {
                    const value = cookies.get(name);
                    return value ? { value } : undefined;
                }
            };
            const { user } = await (0, payload_utils_1.getServerSideUser)(cookieObj);
            return { user };
        }
        catch (error) {
            // No authenticated user or error - this is expected behavior
            return { user: null };
        }
    }),
});
