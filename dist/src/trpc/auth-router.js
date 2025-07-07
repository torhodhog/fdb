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
const account_credentials_validators_1 = require("../lib/validators/account-credentials-validators");
const trpc_1 = require("./trpc");
exports.authRouter = (0, trpc_1.router)({
    getMe: trpc_1.publicProcedure.query(() => {
        return { user: null };
    }),
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
});
