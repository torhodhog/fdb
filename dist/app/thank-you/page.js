"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Paymentstatus_1 = __importDefault(require("@/components/Paymentstatus"));
const config_1 = require("@/config");
const get_payload_1 = require("@/get-payload");
const payload_utils_1 = require("@/lib/payload-utils");
const utils_1 = require("@/lib/utils");
const headers_1 = require("next/headers");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const ThankYouPage = async ({ searchParams }) => {
    const orderId = searchParams.orderId;
    const nextCookies = (0, headers_1.cookies)();
    const { user } = await (0, payload_utils_1.getServerSideUser)(nextCookies);
    const payload = await (0, get_payload_1.getPayloadClient)();
    const { docs: orders } = await payload.find({
        collection: "orders",
        depth: 2,
        where: {
            id: {
                equals: orderId,
            },
        },
    });
    const [order] = orders;
    if (!order)
        return (0, navigation_1.notFound)();
    const orderUserId = typeof order.user === "string" ? order.user : order.user.id;
    if (orderUserId !== user?.id) {
        return (0, navigation_1.redirect)(`/sign-in?origin=thank-you?orderId=${order.id}`);
    }
    const products = order.products;
    const orderTotal = products.reduce((total, product) => {
        // Use the sale price if it's available, otherwise use the regular price
        const price = product.salePrice || product.price;
        return total + price;
    }, 0);
    const deliveryFee = 74;
    return ((0, jsx_runtime_1.jsxs)("main", { className: "relative lg:min-h-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12", children: (0, jsx_runtime_1.jsx)(image_1.default, { fill: true, src: "/checkout-thank-you.jpg", className: "h-full w-full object-cover object-center", alt: "thank you for your order" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24", children: (0, jsx_runtime_1.jsxs)("div", { className: "lg:col-start-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-blue-600", children: "Kj\u00F8p fullf\u00F8rt" }), (0, jsx_runtime_1.jsx)("h1", { className: "mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl", children: "Takk for din bestilling" }), order._isPaid ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-2 text-base text-muted-foreground", children: ["Kvittering vil bli sendt til", " ", typeof order.user !== "string" ? ((0, jsx_runtime_1.jsx)("span", { className: "font-medium text-gray-900", children: order.user.email })) : null, ". Ta kontakt med oss hvis du har noen sp\u00F8rsm\u00E5l rundt ditt kj\u00F8p."] })) : ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-base text-muted-foreground", children: "Vi setter pris p\u00E5 bestillingen din og behandler den n\u00E5. Bare vent litt, s\u00E5 sender vi deg en bekreftelse veldig snart!" })), (0, jsx_runtime_1.jsxs)("div", { className: "mt-16 text-sm font-medium", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-muted-foreground", children: "Order nr." }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-gray-900", children: order.id }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground", children: order.products.map((product) => {
                                            const label = config_1.PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
                                            const { image } = product.images[0];
                                            return ((0, jsx_runtime_1.jsxs)("li", { className: "flex space-x-6 py-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative h-24 w-24", children: typeof image !== "string" && image.url ? ((0, jsx_runtime_1.jsx)(image_1.default, { fill: true, src: image.url, alt: `${product.name} image`, className: "flex-none rounded-md bg-gray-100 object-cover object-center" })) : null }), (0, jsx_runtime_1.jsx)("div", { className: "flex-auto flex flex-col justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-gray-900", children: product.name }), (0, jsx_runtime_1.jsxs)("p", { className: "my-1", children: ["Kategori: ", label] })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "flex-none font-medium text-gray-900", children: (0, utils_1.formatPrice)(product.salePrice || product.price) })] }, product.id));
                                        }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("p", { children: "Delsum: " }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-900", children: (0, utils_1.formatPrice)(orderTotal) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("p", { children: "Levering" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-900", children: (0, utils_1.formatPrice)(deliveryFee) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base", children: "Totalt" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base", children: (0, utils_1.formatPrice)(orderTotal + deliveryFee) })] })] }), (0, jsx_runtime_1.jsx)(Paymentstatus_1.default, { isPaid: order._isPaid || false, orderEmail: order.user.email, orderId: order.id }), (0, jsx_runtime_1.jsx)("div", { className: "mt-16 border-t border-gray-200 py-6 text-right", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", className: "text-sm font-medium text-blue-600 hover:text-blue-500", children: "Fortsett \u00E5 handle \u2192" }) })] })] }) }) })] }));
};
exports.default = ThankYouPage;
