"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInCredentialsValidator = exports.AuthCredentialsValidator = void 0;
const zod_1 = require("zod");
// Registrerings-validering (med adresse, land, postnummer og telefon)
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().optional().refine(phone => {
        if (!phone)
            return true; // Tillat undefined eller tomme telefonnumre
        // Regex for å godta internasjonale telefonnumre
        const phoneRegex = /^\+?[0-9]{1,15}$/;
        return phoneRegex.test(phone);
    }, {
        message: "Telefonnummeret må være gyldig og inkludere landskode (f.eks. +39 for Italia)",
    }),
    address: zod_1.z.string().min(1, { message: "Adresse er påkrevd" }),
    country: zod_1.z.string().min(1, { message: "Land er påkrevd" }),
    postalCode: zod_1.z.string().min(1, { message: "Postnummer er påkrevd" }),
});
// Påloggings-validering (kun e-post og passord)
exports.SignInCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().optional().refine(phone => {
        if (!phone)
            return true; // Tillat undefined eller tomme telefonnumre
        // Regex for å godta internasjonale telefonnumre
        const phoneRegex = /^\+?[0-9]{1,15}$/;
        return phoneRegex.test(phone);
    }, {
        message: "Telefonnummeret må være gyldig og inkludere landskode (f.eks. +39 for Italia)",
    }),
});
