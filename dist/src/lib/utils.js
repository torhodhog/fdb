"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.formatPrice = formatPrice;
exports.constructMetadata = constructMetadata;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function formatPrice(price, options = {}) {
    const { currency = "NOK", notation = "standard" } = options;
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
function constructMetadata({ title = 'Fotballdraktbutikken - markedet for brukte, unike fotballdrakter', description = 'Fotballdraktbutikken is an open-source marketplace for high-quality digital goods.', image = '/herologo.png', icons = '/herologo.png', noIndex = false, } = {}) {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@torhodhog',
        },
        icons,
        metadataBase: new URL('https://fdb-production-7fbb.up.railway.app'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
