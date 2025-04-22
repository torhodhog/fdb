"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProduct = void 0;
const get_payload_1 = require("@/get-payload");
const navigation_1 = require("next/navigation");
const fetchProduct = async (productId) => {
    const payload = await (0, get_payload_1.getPayloadClient)();
    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId,
            },
            approvedForSale: {
                equals: "approved",
            },
        },
    });
    const [product] = products;
    if (!product)
        return (0, navigation_1.notFound)();
    return product;
};
exports.fetchProduct = fetchProduct;
