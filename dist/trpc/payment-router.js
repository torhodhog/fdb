"use strict";
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
exports.paymentRouter = void 0;
var server_1 = require("@trpc/server");
var zod_1 = require("zod");
var get_payload_1 = require("../get-payload");
var stripe_1 = require("../lib/stripe");
var trpc_1 = require("./trpc");
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({
        productIds: zod_1.z.array(zod_1.z.string()),
        leveringsinfo: zod_1.z.object({
            navn: zod_1.z.string(),
            adresse: zod_1.z.string(),
            postnummer: zod_1.z.string(),
            by: zod_1.z.string(),
            telefonnummer: zod_1.z.string().max(20),
            land: zod_1.z.string(),
        }),
        deliveryMethod: zod_1.z.string(),
    }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user, productIds, leveringsinfo, deliveryMethod, payload, result, products, filteredProducts, order, line_items, totalPrice, deliveryFee, customer, stripeSession, err_1;
        var ctx = _b.ctx, input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Create Session called with input:", input);
                    user = ctx.user;
                    if (!user) {
                        console.error("User context is missing");
                        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
                    }
                    productIds = input.productIds, leveringsinfo = input.leveringsinfo, deliveryMethod = input.deliveryMethod;
                    if (productIds.length === 0) {
                        console.error("No products provided");
                        throw new server_1.TRPCError({ code: "BAD_REQUEST" });
                    }
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    console.log("Payload client instantiated");
                    return [4 /*yield*/, payload.find({
                            collection: "products",
                            where: { id: { in: productIds } },
                        })];
                case 2:
                    result = _c.sent();
                    products = result.docs;
                    console.log("Products fetched:", products.map(function (p) { return p.name; }));
                    filteredProducts = products.filter(function (prod) { return Boolean(prod.priceId); });
                    console.log("Filtered products (with priceId):", filteredProducts.map(function (p) { return p.name; }));
                    return [4 /*yield*/, payload.create({
                            collection: "orders",
                            data: {
                                products: filteredProducts.map(function (prod) { return prod.id.toString(); }), // Explicitly cast prod.id to string
                                user: user.id,
                            },
                        })];
                case 3:
                    order = _c.sent();
                    console.log("Order created with ID:", order.id);
                    line_items = filteredProducts.map(function (product) { return ({
                        price_data: {
                            currency: "nok",
                            product_data: { name: product.name }, // Type assertion to string
                            unit_amount: (product.salePrice || product.price) * 100, // Type assertion to number
                        },
                        quantity: 1,
                    }); });
                    totalPrice = filteredProducts.reduce(function (sum, product) {
                        return sum + (product.salePrice || product.price); // Type assertion to number
                    }, 0);
                    console.log("Total price of products:", totalPrice);
                    console.log("Delivery method:", deliveryMethod);
                    deliveryFee = 0;
                    if (deliveryMethod === "delivery" && totalPrice < 1500) {
                        deliveryFee = 74 * 100; // Multiply by 100 to convert to øre
                        line_items.push({
                            price_data: {
                                currency: "nok",
                                product_data: { name: "Delivery Fee" },
                                unit_amount: deliveryFee,
                            },
                            quantity: 1,
                        });
                        console.log("Delivery fee added:", deliveryFee);
                    }
                    else {
                        console.log("No delivery fee added. Delivery method:", deliveryMethod, "Total price:", totalPrice);
                    }
                    console.log("Final line items prepared for Stripe Checkout:", line_items);
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, stripe_1.stripe.customers.create({
                            name: leveringsinfo.navn,
                            phone: leveringsinfo.telefonnummer.substring(0, 20), // Truncate phone number
                            address: {
                                line1: leveringsinfo.adresse,
                                city: leveringsinfo.by,
                                postal_code: leveringsinfo.postnummer,
                                country: leveringsinfo.land,
                            },
                        })];
                case 5:
                    customer = _c.sent();
                    console.log("Stripe customer created with ID:", customer.id);
                    return [4 /*yield*/, stripe_1.stripe.checkout.sessions.create({
                            success_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/thank-you?orderId=").concat(order.id),
                            cancel_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/cart"),
                            payment_method_types: ["card", "klarna"],
                            mode: "payment",
                            shipping_address_collection: { allowed_countries: ["NO"] },
                            line_items: line_items,
                            metadata: { userId: user.id, orderId: order.id },
                            customer: customer.id,
                            allow_promotion_codes: true, // Enable promotion codes
                        })];
                case 6:
                    stripeSession = _c.sent();
                    console.log("Stripe Session created:", stripeSession.id);
                    return [2 /*return*/, { url: stripeSession.url }];
                case 7:
                    err_1 = _c.sent();
                    console.error("Failed to create Stripe session:", err_1.message);
                    throw new server_1.TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err_1.message });
                case 8: return [2 /*return*/];
            }
        });
    }); }),
    pollOrderStatus: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var orderId, payload, orders, order;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderId = input.orderId;
                    console.log("Polling status for order:", orderId);
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "orders",
                            where: { id: { equals: orderId } },
                        })];
                case 2:
                    orders = (_c.sent()).docs;
                    if (!orders.length) {
                        console.error("Order not found:", orderId);
                        throw new server_1.TRPCError({ code: "NOT_FOUND" });
                    }
                    order = orders[0];
                    return [2 /*return*/, { isPaid: order._isPaid }];
            }
        });
    }); }),
});
