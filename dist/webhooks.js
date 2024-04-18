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
var stripeWebhookHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var webhookRequest, body, signature, event_1;
    return __generator(this, function (_a) {
        webhookRequest = req;
        body = webhookRequest.rawBody;
        signature = req.headers["stripe-signature"] || "";
        try {
            event_1 = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
            console.log("Stripe event constructed successfully:", event_1.id);
            if (event_1.type === "checkout.session.completed") {
                console.log("Handling checkout.session.completed event");
                handleCheckoutSessionCompleted(event_1, res);
                return [2 /*return*/];
            }
            else {
                console.log("Received non-handled event type:", event_1.type);
            }
        }
        catch (err) {
            console.error("Error processing webhook event:", err);
            return [2 /*return*/, res.status(400).send("Webhook Error: ".concat(err.message))];
        }
        return [2 /*return*/, res.status(200).send("Event received, no action required.")];
    });
}); };
exports.stripeWebhookHandler = stripeWebhookHandler;
function handleCheckoutSessionCompleted(event, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, payload, orders, order, retries, updateResult, error_1, error_2;
        var _this = this;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    session = event.data.object;
                    if (!((_a = session.metadata) === null || _a === void 0 ? void 0 : _a.orderId)) {
                        console.error("Missing orderId in session metadata", session.id);
                        return [2 /*return*/, res.status(400).send("Webhook Error: Missing orderId in metadata")];
                    }
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 13, , 14]);
                    return [4 /*yield*/, payload.find({
                            collection: "orders",
                            where: { id: { equals: session.metadata.orderId } },
                            depth: 2,
                        })];
                case 3:
                    orders = (_b.sent()).docs;
                    if (!orders || orders.length === 0) {
                        console.error("No order found with ID:", session.metadata.orderId);
                        return [2 /*return*/, res.status(404).send("Order not found")];
                    }
                    order = orders[0];
                    if (!order) {
                        console.error("No order found with ID:", session.metadata.orderId);
                        return [2 /*return*/, res.status(404).send("Order not found")];
                    }
                    retries = 3;
                    _b.label = 4;
                case 4:
                    if (!(retries > 0)) return [3 /*break*/, 12];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 10, , 11]);
                    // Add a delay before each update attempt
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 6:
                    // Add a delay before each update attempt
                    _b.sent();
                    return [4 /*yield*/, payload.update({
                            collection: "orders",
                            id: order.id,
                            data: { _isPaid: true },
                        })];
                case 7:
                    updateResult = _b.sent();
                    console.log("_isPaid status updated for order ".concat(order.id, ":"), updateResult);
                    if (!(order.products && order.products.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Promise.all(order.products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(typeof product === 'object' && product.id)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, payload.update({
                                                collection: "products",
                                                id: product.id,
                                                data: { isSold: true },
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 12]; // Exit the loop if successful
                case 10:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error && 'code' in error_1 && error_1.code === 112) { // WriteConflict error code
                        console.error("Write conflict error, retrying...", error_1);
                        retries--;
                        return [3 /*break*/, 4];
                    }
                    console.error("Error updating order:", error_1);
                    return [2 /*return*/, res.status(500).send("Internal server error during webhook processing.")];
                case 11: return [3 /*break*/, 4];
                case 12: return [2 /*return*/, res.status(200).send("Checkout session completed successfully processed.")];
                case 13:
                    error_2 = _b.sent();
                    console.error("Error processing checkout.session.completed event:", error_2);
                    return [2 /*return*/, res.status(500).send("Internal server error during webhook processing.")];
                case 14: return [2 /*return*/];
            }
        });
    });
}
