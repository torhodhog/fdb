"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const get_payload_1 = require("../get-payload");
const account_credentials_validators_1 = require("../lib/validators/account-credentials-validators");
const trpc_1 = require("./trpc");
exports.authRouter = (0, trpc_1.router)({
    createPayloadUser: trpc_1.publicProcedure
        .input(account_credentials_validators_1.AuthCredentialsValidator)
        .mutation(async ({ input }) => {
        const { email, password, phone, address, country, postalCode } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        // check if user already exists
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
