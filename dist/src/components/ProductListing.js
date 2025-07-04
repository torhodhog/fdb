"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const skeleton_1 = require("./ui/skeleton");
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const ImageSlider_1 = __importDefault(require("./ImageSlider"));
const lucide_react_1 = require("lucide-react");
const client_1 = require("@/trpc/client");
const react_query_1 = require("@tanstack/react-query");
const ProductListing = ({ product, index, user, isFavorited, favoriteCount, }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const queryClient = (0, react_query_1.useQueryClient)();
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);
        return () => clearTimeout(timer);
    }, [index]);
    const { mutate: toggleFavorite } = client_1.trpc.favorites.toggleFavorite.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoritesData"] });
        },
    });
    const handleFavoriteClick = () => {
        if (user && product) {
            toggleFavorite({
                productId: product.id,
                userId: user.id,
                isFavorited: isFavorited,
            });
        }
    };
    if (!product || !isVisible)
        return (0, jsx_runtime_1.jsx)(ProductPlaceholder, {});
    const validUrls = product.images
        .map(({ image }) => (typeof image === "string" ? image : image.url))
        .filter(Boolean);
    if (isVisible && product) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("relative w-full cursor-pointer group/main", {
                "animate-in fade-in-5 slide-in-from-top-8": isVisible,
            }), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl", children: [(0, jsx_runtime_1.jsx)(ImageSlider_1.default, { urls: validUrls }), user && ((0, jsx_runtime_1.jsx)("button", { onClick: handleFavoriteClick, className: "absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow-md", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: (0, utils_1.cn)("h-5 w-5", {
                                        "text-red-500 fill-red-500": isFavorited,
                                        "text-gray-400": !isFavorited,
                                    }) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-2 right-2 z-10 bg-white px-2 py-1 rounded-full shadow-md flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-4 w-4 text-gray-500 mr-1" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-gray-700", children: favoriteCount })] })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: `/product/${product.id}`, children: (0, jsx_runtime_1.jsx)("h3", { className: "mt-4 font-medium text-sm text-gray-700 dark:text-white", children: product.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500 dark:text-white", children: product.size }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 font-medium text-sm text-gray-900 dark:text-white", children: (0, utils_1.formatPrice)(product.price) })] })] }) }));
    }
    return null;
};
const ProductPlaceholder = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-full w-full" }) }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-4 w-2/3 h-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-2 w-16 h-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-2 w-12 h-4 rounded-lg" })] }));
};
exports.default = ProductListing;
