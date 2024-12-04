import { z } from "zod";

// Registrerings-validering (med adresse, land, postnummer og telefon)
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passordet må være minst 8 tegn langt" }),
  phone: z.string().optional().refine(phone => {
    if (!phone) return true; // Tillat undefined eller tomme telefonnumre

    // Regex for å godta internasjonale telefonnumre
    const phoneRegex = /^\+?[0-9]{1,15}$/;
    return phoneRegex.test(phone);
  }, {
    message: "Telefonnummeret må være gyldig og inkludere landskode (f.eks. +39 for Italia)",
  }),
  address: z.string().min(1, { message: "Adresse er påkrevd" }),
  country: z.string().min(1, { message: "Land er påkrevd" }),
  postalCode: z.string().min(1, { message: "Postnummer er påkrevd" }),
});

// Påloggings-validering (kun e-post og passord)
export const SignInCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passordet må være minst 8 tegn langt" }),
  phone: z.string().optional().refine(phone => {
    if (!phone) return true; // Tillat undefined eller tomme telefonnumre

    // Regex for å godta internasjonale telefonnumre
    const phoneRegex = /^\+?[0-9]{1,15}$/;
    return phoneRegex.test(phone);
  }, {
    message: "Telefonnummeret må være gyldig og inkludere landskode (f.eks. +39 for Italia)",
  }),
});


// Infer typer fra validatorene
export type TSignInCredentialsValidator = z.infer<typeof SignInCredentialsValidator>;
export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;
