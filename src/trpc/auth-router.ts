// Denne filen håndterer alt som har med brukerautentisering å gjøre.
// Den bruker trpc for å lage tre funksjoner:
// 1. createPayloadUser – oppretter ny bruker i Payload CMS hvis e-posten ikke finnes fra før.
// 2. verifyEmail – sjekker om verifikasjonstoken fra e-post er gyldig.
// 3. signIn – logger inn brukeren ved å sende e-post og passord til Payload.
// Alle funksjonene snakker med databasen via getPayloadClient().



import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getPayloadClient } from "../get-payload";
import { getServerSideUser } from "../lib/payload-utils";
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

  getMe: publicProcedure.query(async ({ ctx }) => {
    try {
      // Handle both Next.js App Router Request and regular requests
      let cookieHeader = '';
      
      if (ctx.req) {
        // Try different ways to get cookies based on request type
        cookieHeader = (ctx.req as any).headers?.get?.('cookie') || 
                      (ctx.req as any).headers?.cookie || 
                      (ctx.req as any).cookie || '';
      }
      
      // If no cookies at all, return early
      if (!cookieHeader) {
        return { user: null };
      }
      
      // Create a simple cookie parser
      const cookies = new Map();
      cookieHeader.split(';').forEach((cookie: string) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          try {
            cookies.set(name, decodeURIComponent(value));
          } catch {
            cookies.set(name, value); // Fallback if decoding fails
          }
        }
      });

      // Create a cookie object compatible with getServerSideUser
      const cookieObj = {
        get: (name: string) => {
          const value = cookies.get(name);
          return value ? { value } : undefined;
        }
      };

      const { user } = await getServerSideUser(cookieObj as any);
      return { user };
    } catch (error) {
      // No authenticated user or error - this is expected behavior
      return { user: null };
    }
  }),
});