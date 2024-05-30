"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInCredentialsValidator = exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().refine(function (phone) {
        var phoneRegex = /^\d{8}$/;
        return phoneRegex.test(phone);
    }, {
        message: "Telefonnummeret er ikke gyldig",
    }),
});
exports.SignInCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Passordet må være minst 8 tegn langt" }),
    phone: zod_1.z.string().optional(),
});
