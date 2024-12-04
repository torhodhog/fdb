"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInCredentialsValidator = exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().optional().refine(function (phone) {
        if (!phone)
            return true; // Tillat undefined eller tomme telefonnumre
        // Regex for å godta internasjonale telefonnumre
        var phoneRegex = /^\+?[0-9]{1,15}$/;
        return phoneRegex.test(phone);
    }, {
        message: "Telefonnummeret må være gyldig og inkludere landskode (f.eks. +39 for Italia)",
    }),
    address: zod_1.z.string().min(1, { message: "Adresse er påkrevd" }),
    country: zod_1.z.string().min(1, { message: "Land er påkrevd" }),
    postalCode: zod_1.z.string().min(1, { message: "Postnummer er påkrevd" }),
});
exports.SignInCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().optional(),
});
