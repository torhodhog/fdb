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
exports.stripeWebhookHandler = void 0;
var stripe_1 = require("./lib/stripe");
var get_payload_1 = require("./get-payload");
var resend_1 = require("resend");
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
var stripeWebhookHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webhookRequest, body, signature, event, session, payload, orders, order, _i, _a, product, productId, updatedProduct;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                webhookRequest = req;
                body = webhookRequest.rawBody;
                signature = req.headers["stripe-signature"] || "";
                try {
                    event = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
                    console.log("Received Stripe event:", event); // Log the event
                }
                catch (err) {
                    return [2 /*return*/, res
                            .status(400)
                            .send("Webhook Error: ".concat(err instanceof Error ? err.message : "Unknown Error"))];
                }
                session = event.data.object;
                if (!((_b = session === null || session === void 0 ? void 0 : session.metadata) === null || _b === void 0 ? void 0 : _b.userId) || !((_c = session === null || session === void 0 ? void 0 : session.metadata) === null || _c === void 0 ? void 0 : _c.orderId)) {
                    return [2 /*return*/, res.status(400).send("Webhook Error: No user present in metadata")];
                }
                if (!(event.type === "checkout.session.completed")) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
            case 1:
                payload = _d.sent();
                return [4 /*yield*/, payload.find({
                        collection: "orders",
                        where: {
                            id: {
                                equals: session.metadata.orderId,
                            },
                        },
                        depth: 2,
                    })];
            case 2:
                orders = (_d.sent()).docs;
                order = orders[0];
                if (!order) {
                    console.error('Order not found');
                    return [2 /*return*/, res.status(404).json({ error: "No such order exists." })];
                }
                _i = 0, _a = order.products;
                _d.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                product = _a[_i];
                productId = typeof product === "object" ? product.id : product;
                return [4 /*yield*/, payload.update({
                        collection: "products",
                        id: productId,
                        data: { isSold: true },
                    })];
            case 4:
                updatedProduct = _d.sent();
                console.log("Updated product as sold:", updatedProduct);
                _d.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.status(200).send('Order processed and products updated as sold.');
                _d.label = 7;
            case 7: return [2 /*return*/, res.status(200).send()];
        }
    });
}); };
exports.stripeWebhookHandler = stripeWebhookHandler;
