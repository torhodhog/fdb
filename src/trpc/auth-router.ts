import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator, SignInCredentialsValidator } from "../lib/validators/account-credentials-validators";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password, phone, address, country, postalCode } = input;
      const payload = await getPayloadClient();

      // Sjkk om e-posten allerede eksisterer
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });


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

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(SignInCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

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
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});