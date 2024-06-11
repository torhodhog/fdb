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
exports.productRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("../trpc");
var get_payload_1 = require("../../get-payload");
exports.productRouter = (0, trpc_1.router)({
    searchProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        searchTerm: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        size: zod_1.z.string().optional(),
        sort: zod_1.z.enum(['asc', 'desc']).optional(),
        page: zod_1.z.number().default(1),
        limit: zod_1.z.number().default(1000), // Set the default limit to a large number
        onSale: zod_1.z.boolean().optional(),
    }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var searchTerm, category, size, _c, sort, page, limit, onSale, payload, query, sortOrder, _d, products, totalItems, error_1;
        var input = _b.input;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    searchTerm = input.searchTerm, category = input.category, size = input.size, _c = input.sort, sort = _c === void 0 ? 'desc' : _c, page = input.page, limit = input.limit, onSale = input.onSale;
                    console.log("Input received by server:", input);
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _e.sent();
                    query = {};
                    if (searchTerm) {
                        query.name = { $regex: searchTerm, $options: 'i' };
                    }
                    if (category) {
                        query.category = category;
                    }
                    if (size) {
                        query.size = size;
                    }
                    if (onSale !== undefined) {
                        query.onSale = onSale;
                    }
                    console.log("Query constructed by server:", query);
                    sortOrder = sort === 'asc' ? '+' : '-';
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, payload.find({
                            collection: 'products',
                            where: __assign({}, query),
                            sort: "".concat(sortOrder, "createdAt"),
                            limit: limit,
                            page: page,
                        })];
                case 3:
                    _d = _e.sent(), products = _d.docs, totalItems = _d.totalDocs;
                    console.log("Products fetched by server:", products);
                    return [2 /*return*/, {
                            products: products,
                            totalItems: totalItems,
                            currentPage: page,
                            totalPages: Math.ceil(totalItems / limit),
                        }];
                case 4:
                    error_1 = _e.sent();
                    console.error("Error fetching products:", error_1);
                    throw new Error("Error fetching products");
                case 5: return [2 /*return*/];
            }
        });
    }); }),
});
