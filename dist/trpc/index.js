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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var zod_1 = require("zod");
var get_payload_1 = require("../get-payload");
var query_validator_1 = require("../lib/validators/query-validator");
var auth_router_1 = require("./auth-router");
var payment_router_1 = require("./payment-router");
var trpc_1 = require("./trpc");
var product_router_1 = require("./routers/product-router");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    payment: payment_router_1.paymentRouter,
    product: product_router_1.productRouter,
    getInfiniteProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(1000).default(20),
        cursor: zod_1.z.number().nullish(), // Cursor for pagination
        query: query_validator_1.QueryValidator.extend({
            sortBy: zod_1.z.string().optional(),
            sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
            names: zod_1.z.array(zod_1.z.string()).optional(), // Add names to query schema
        }),
    }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var cursor, query, _c, sortBy, _d, sortOrder, limit, searchTerm, liga_system, names, queryOpts, payload, page, parsedQueryOpts, sortDirection, sortString, _e, items, totalDocs, error_1;
        var input = _b.input;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    console.log("Input received:", input); // Log the input
                    cursor = input.cursor, query = input.query;
                    _c = query.sortBy, sortBy = _c === void 0 ? "createdAt" : _c, _d = query.sortOrder, sortOrder = _d === void 0 ? "desc" : _d, limit = query.limit, searchTerm = query.searchTerm, liga_system = query.liga_system, names = query.names, queryOpts = __rest(query, ["sortBy", "sortOrder", "limit", "searchTerm", "liga_system", "names"]);
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _f.sent();
                    page = cursor !== null && cursor !== void 0 ? cursor : 1;
                    parsedQueryOpts = {};
                    Object.entries(queryOpts).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        if (key === "onSale") {
                            parsedQueryOpts[key] = { equals: value === "true" || value === true };
                        }
                        else {
                            parsedQueryOpts[key] = { equals: value };
                        }
                    });
                    if (searchTerm) {
                        parsedQueryOpts.name = { $regex: new RegExp(searchTerm, "i") };
                    }
                    if (liga_system) {
                        parsedQueryOpts.liga_system = { equals: liga_system };
                    }
                    if (names) {
                        parsedQueryOpts.name = { in: names }; // Ensure names are handled correctly
                    }
                    sortDirection = sortOrder === "desc" ? "-" : "+";
                    sortString = "".concat(sortDirection).concat(sortBy);
                    console.log("Parsed query options:", parsedQueryOpts); // Log parsed query options
                    console.log("Sort string:", sortString); // Log sort string
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, payload.find({
                            collection: "products",
                            where: __assign({ approvedForSale: {
                                    equals: "approved",
                                } }, parsedQueryOpts),
                            sort: sortString,
                            depth: 1,
                            limit: limit,
                            page: page,
                        })];
                case 3:
                    _e = _f.sent(), items = _e.docs, totalDocs = _e.totalDocs;
                    console.log("Fetched items: ".concat(items.length), items); // Log the fetched items
                    console.log("Total documents:", totalDocs); // Log the total documents
                    return [2 /*return*/, {
                            items: items,
                            totalDocs: totalDocs,
                        }];
                case 4:
                    error_1 = _f.sent();
                    console.error("Error fetching products:", error_1); // Log any errors
                    throw new Error("Error fetching products");
                case 5: return [2 /*return*/];
            }
        });
    }); }),
});
