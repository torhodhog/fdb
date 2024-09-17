"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var config_1 = require("../../config");
var stripe_1 = require("../../lib/stripe");
var isAdmin = function (_a) {
    var _user = _a.req.user;
    var user = _user;
    if (!user)
        return false;
    return user.role === "admin";
};
var markAsSold = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var stripeProduct;
    var req = _b.req, doc = _b.doc;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // Sjekk om produktet er solgt
                if (doc.isSold) {
                    return [2 /*return*/];
                }
                // Sjekk om stripeId er definert
                if (!doc.stripeId) {
                    console.error('stripeId is undefined');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, stripe_1.stripe.products.retrieve(doc.stripeId)];
            case 1:
                stripeProduct = _c.sent();
                if (!(stripeProduct.metadata && stripeProduct.metadata.sold === 'true')) return [3 /*break*/, 3];
                // Oppdater produktet i databasen
                return [4 /*yield*/, req.payload.update({
                        collection: 'products',
                        id: doc.id,
                        data: {
                            isSold: true,
                        },
                    })];
            case 2:
                // Oppdater produktet i databasen
                _c.sent();
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        afterChange: [markAsSold],
        beforeChange: [
            function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var user, data, createdProduct, price, updated, data, updatedProduct, newPrice, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Anonymous function in beforeChange hooks called');
                            user = args.req.user;
                            if (!user) {
                                console.error('req.user is undefined');
                                return [2 /*return*/, args.data];
                            }
                            if (!(args.operation === "create")) return [3 /*break*/, 3];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.create({
                                    name: data.name,
                                })];
                        case 1:
                            createdProduct = _a.sent();
                            console.log('Created product:', createdProduct);
                            return [4 /*yield*/, stripe_1.stripe.prices.create({
                                    currency: "nok",
                                    unit_amount: Math.round(data.price * 100), // Convert price to øre
                                    product: createdProduct.id,
                                })];
                        case 2:
                            price = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: createdProduct.id, priceId: price.id, user: user.id });
                            return [2 /*return*/, updated];
                        case 3:
                            if (!(args.operation === "update")) return [3 /*break*/, 6];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.update(data.stripeId, {
                                    name: data.name,
                                })];
                        case 4:
                            updatedProduct = _a.sent();
                            return [4 /*yield*/, stripe_1.stripe.prices.create({
                                    currency: "nok",
                                    unit_amount: Math.round(data.price * 100), // Convert price to øre
                                    product: updatedProduct.id,
                                })];
                        case 5:
                            newPrice = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: updatedProduct.id, priceId: newPrice.id, user: user.id });
                            return [2 /*return*/, updated];
                        case 6: return [2 /*return*/];
                    }
                });
            }); },
        ],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "isSold",
            label: "Sold",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "description",
            type: "textarea",
            label: "Product details",
        },
        {
            name: "price",
            label: "Price in NOK",
            min: 0,
            max: 10000,
            type: "number",
            required: true,
        },
        {
            name: "onSale",
            label: "On Sale",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "salePrice",
            label: "Sale Price in NOK",
            min: 0,
            max: 10000,
            type: "number",
            admin: {
                condition: function (data) { return data.onSale; },
            },
        },
        {
            name: "product_files",
            type: "array",
            fields: [
                {
                    name: "file",
                    type: "upload",
                    relationTo: "media",
                },
            ],
        },
        {
            name: "size",
            label: "Størrelse",
            type: "select",
            options: [
                { label: "XS", value: "XS" },
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
                { label: "XL", value: "XL" },
                { label: "XXL", value: "XXL" },
                // Add more sizes as needed
            ],
            required: true,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
        {
            name: "liga_system",
            label: "Liga System",
            type: "text",
        },
        {
            name: "nasjon",
            label: "Nasjon",
            type: "text",
        },
        {
            name: "tilstand",
            label: "Tilstand",
            type: "select",
            options: [
                { label: "10 - Utmerket", value: "10" },
                { label: "9 - Bra", value: "9" },
                { label: "8 - Små feil", value: "8" },
                { label: "7 - Synlige feil/skader", value: "7" },
                { label: "6 - Bør repareres", value: "6" },
                { label: "5 - Reparasjon kreves", value: "5" },
                // Legg til flere tilstandsnivåer etter behov
            ],
        },
        {
            name: "trykk",
            label: "Trykk",
            type: "select", // Du manglet også 'type'-feltet her
            options: [
                { label: "Ja", value: "Ja" },
                { label: "Nei", value: "Nei" },
            ],
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: config_1.PRODUCT_CATEGORIES.map(function (category) { return ({
                label: category.label,
                value: category.value,
            }); }),
            required: true,
        },
        {
            name: "finalSale",
            label: "Final Sale",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "productCode",
            label: "Product Code",
            type: "text",
            required: true,
        },
        {
            name: "exclusive",
            label: "Exclusive",
            type: "checkbox",
            required: false,
        },
    ],
};
