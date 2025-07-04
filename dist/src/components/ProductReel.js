"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const client_1 = require("@/trpc/client");
const ProductListing_1 = __importDefault(require("./ProductListing"));
const LottieAnimation_1 = __importDefault(require("@/components/LottieAnimation"));
const ProductReel = (props) => {
    const { title, subtitle, href, query, sortBy = "createdAt", sortOrder = "desc", hideSoldItems = false, loadMore = false, showSaleItems = false, } = props;
    const { data: userData } = client_1.trpc.auth.getMe.useQuery();
    const user = userData?.user;
    const [loadedProducts, setLoadedProducts] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const { data: queryResults, isLoading: isQueryLoading, isError, error, } = client_1.trpc.getInfiniteProducts.useQuery({
        limit: 200, // Set a high limit to fetch all products
        cursor: 1, // Start from the first page
        query: { ...query, sortBy, sortOrder },
    });
    const productIds = queryResults?.items.map((p) => p.id);
    const { data: favoritesData } = client_1.trpc.favoritesData.getFavoritesData.useQuery({
        productIds: productIds ?? [],
        userId: user?.id,
    }, {
        enabled: !!productIds && productIds.length > 0,
    });
    (0, react_1.useEffect)(() => {
        if (queryResults && queryResults.items) {
            setLoadedProducts(queryResults.items);
            setIsLoading(false); // Set loading to false after products are loaded
        }
    }, [queryResults]);
    if (isQueryLoading && isLoading) {
        return (0, jsx_runtime_1.jsx)(LottieAnimation_1.default, {});
    }
    if (isError) {
        return (0, jsx_runtime_1.jsxs)("div", { children: ["Feil ved henting av produkter: ", error.message] });
    }
    if (!queryResults) {
        return (0, jsx_runtime_1.jsx)("div", { className: "mt-8", children: "Vent litt, drakter lastes..." });
    }
    const filteredProducts = (loadedProducts || []).filter((product) => {
        const sizeMatch = !query.size || product.size === query.size;
        const searchTermMatch = !query.searchTerm ||
            product.name.toLowerCase().includes(query.searchTerm.toLowerCase());
        const soldMatch = !product.isSold || !hideSoldItems;
        const saleMatch = !props.showSaleItems || product.onSale;
        const namesMatch = !query.names || query.names.includes(product.name);
        const teamMatch = !query.team || product.name === query.team;
        const printMatch = query.hasPrint === null ||
            query.hasPrint === undefined ||
            product.trykk === (query.hasPrint ? "Ja" : "Nei");
        const finalSaleMatch = !props.finalSale || product.finalSale;
        const nationMatch = !query.nation || product.nasjon === query.nation;
        const matches = sizeMatch &&
            searchTermMatch &&
            soldMatch &&
            saleMatch &&
            namesMatch &&
            teamMatch &&
            printMatch &&
            finalSaleMatch &&
            nationMatch;
        return matches;
    });
    return ((0, jsx_runtime_1.jsxs)("section", { id: "product-reel-section", className: "py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:flex md:items-center md:justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl px-4 lg:max-w-4xl lg:px-0", children: [title ? ((0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl", children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-muted-foreground", children: subtitle })) : null] }), href ? ((0, jsx_runtime_1.jsxs)(link_1.default, { href: href, className: "hidden text-sm font-extrabold text-gray-600 hover:text-blue-500 md:block", children: [props.showSaleItems
                                ? "Se alle salgsvarer"
                                : "Se hele kolleksjonen", " ", (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2192" })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-6 flex items-center w-full", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8", children: filteredProducts.map((product, i) => {
                            const favoriteCount = favoritesData?.favoriteCounts[product.id] ?? 0;
                            const isFavorited = favoritesData?.userFavorites[product.id] ?? false;
                            return ((0, jsx_runtime_1.jsx)(ProductListing_1.default, { product: product, index: i, user: user, isFavorited: isFavorited, favoriteCount: favoriteCount }, `product-${i}`));
                        }) }) }) })] }));
};
exports.default = ProductReel;
