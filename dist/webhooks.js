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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var resend_1 = require("resend");
var ReceiptEmail_1 = require("./components/emails/ReceiptEmail");
var stripe_1 = require("./lib/stripe");
var get_payload_1 = require("./get-payload");
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
var stripeWebhookHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webhookRequest, body, signature, event_1, payload_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                webhookRequest = req;
                body = webhookRequest.rawBody;
                signature = req.headers["stripe-signature"] || "";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                event_1 = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
                console.log("Stripe event constructed successfully:", event_1.id);
                return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
            case 2:
                payload_1 = _a.sent();
                if (!(event_1.type === "checkout.session.completed")) return [3 /*break*/, 4];
                console.log("Handling checkout.session.completed event");
                return [4 /*yield*/, handleCheckoutSessionCompleted(event_1, res, req, payload_1)];
            case 3:
                _a.sent(); // Cast til CustomPayload
                return [2 /*return*/];
            case 4:
                console.log("Received non-handled event type:", event_1.type);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.error("Error processing webhook event:", err_1);
                return [2 /*return*/, res.status(400).send("Webhook Error: ".concat(err_1.message))];
            case 7: return [2 /*return*/, res.status(200).send("Event received, no action required.")];
        }
    });
}); };
exports.stripeWebhookHandler = stripeWebhookHandler;
function handleCheckoutSessionCompleted(event, res, req, payload // Bruker den tilpassede typen
) {
    return __awaiter(this, void 0, void 0, function () {
        var session, orders, order, _i, _a, product, productId, users, user, data, _b, _c, error_1, error_2;
        var _d;
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    session = event.data.object;
                    if (!((_e = session.metadata) === null || _e === void 0 ? void 0 : _e.orderId)) {
                        console.error("Missing orderId in session metadata", session.id);
                        return [2 /*return*/, res.status(400).send("Webhook Error: Missing orderId in metadata")];
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 15, , 16]);
                    return [4 /*yield*/, payload.find({
                            collection: "orders",
                            where: { id: { equals: session.metadata.orderId } },
                        })];
                case 2:
                    orders = (_g.sent()).docs;
                    if (!orders || orders.length === 0) {
                        console.error("No order found with ID:", session.metadata.orderId);
                        return [2 /*return*/, res.status(404).send("Order not found")];
                    }
                    order = orders[0];
                    if (!((_f = session.metadata) === null || _f === void 0 ? void 0 : _f.userId)) return [3 /*break*/, 13];
                    return [4 /*yield*/, payload.update({
                            collection: "orders",
                            id: order.id,
                            data: { _isPaid: true, user: session.metadata.userId },
                        })];
                case 3:
                    _g.sent();
                    _i = 0, _a = order.products;
                    _g.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    product = _a[_i];
                    productId = typeof product === "string" ? product : product.id;
                    return [4 /*yield*/, payload.update({
                            collection: "products",
                            id: productId,
                            data: { isSold: true },
                        })];
                case 5:
                    _g.sent();
                    _g.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    _g.trys.push([7, 11, , 12]);
                    return [4 /*yield*/, payload.find({
                            collection: "users",
                            where: { id: { equals: session.metadata.userId } },
                        })];
                case 8:
                    users = (_g.sent()).docs;
                    if (!users || users.length === 0) {
                        console.error("No user found with ID:", session.metadata.userId);
                        return [2 /*return*/, res.status(404).send("User not found")];
                    }
                    user = users[0];
                    _c = (_b = resend.emails).send;
                    _d = {
                        from: "Fotballdraktbutikken AS <fdb@fotballdraktbutikken.com>",
                        to: [user.email],
                        subject: "Takk for din bestilling. Her er din kvittering."
                    };
                    return [4 /*yield*/, (0, ReceiptEmail_1.ReceiptEmailHtml)({
                            date: new Date(),
                            email: user.email,
                            orderId: session.metadata.orderId,
                            products: order.products,
                            deliveryFee: order.deliveryFee,
                        })];
                case 9: return [4 /*yield*/, _c.apply(_b, [(_d.html = _g.sent(),
                            _d)])];
                case 10:
                    data = _g.sent();
                    console.log("Receipt email sent successfully:", data);
                    return [2 /*return*/, res.status(200).json({ data: data })];
                case 11:
                    error_1 = _g.sent();
                    console.error("Error sending receipt email:", error_1);
                    return [2 /*return*/, res.status(500).json({ error: "Failed to send receipt email" })];
                case 12: return [3 /*break*/, 14];
                case 13:
                    console.error("Missing userId in session metadata", session.id);
                    return [2 /*return*/, res.status(400).send("Webhook Error: Missing userId in metadata")];
                case 14: return [3 /*break*/, 16];
                case 15:
                    error_2 = _g.sent();
                    console.error("Error processing checkout.session.completed event:", error_2);
                    return [2 /*return*/, res
                            .status(500)
                            .send("Internal server error during webhook processing.")];
                case 16: return [2 /*return*/];
            }
        });
    });
}
