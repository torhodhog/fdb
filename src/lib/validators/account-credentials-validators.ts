import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passordet må være minst 8 tegn langt" }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
