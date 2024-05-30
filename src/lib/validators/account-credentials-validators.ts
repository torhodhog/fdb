import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passordet må være minst 8 tegn langt" }),
  phone: z.string().refine(phone => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
  }, {
    message: "Telefonnummeret er ikke gyldig",
  }),
});

export const SignInCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passordet må være minst 8 tegn langt" }),
  phone: z.string().optional(),
});

export type TSignInCredentialsValidator = z.infer<
  typeof SignInCredentialsValidator
>;

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;