"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const skeleton_1 = require("./ui/skeleton");
const ProductPlaceholder = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-full w-full" }) }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-4 w-2/3 h-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-2 w-16 h-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "mt-2 w-12 h-4 rounded-lg" })] }));
};
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const ImageSlider_1 = __importDefault(require("./ImageSlider"));
const lucide_react_1 = require("lucide-react");
const client_1 = require("@/trpc/client");
const react_query_1 = require("@tanstack/react-query");
const ProductListing = ({ product, index, user, isFavorited, favoriteCount, }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [isNavigating, setIsNavigating] = (0, react_1.useState)(false);
    const queryClient = (0, react_query_1.useQueryClient)();
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);
        return () => clearTimeout(timer);
    }, [index]);
    const { mutate: toggleFavorite } = client_1.trpc.favorites.toggleFavorite.useMutation({
        onSuccess: () => {
            // Invalidate all related queries more aggressively
            queryClient.invalidateQueries({ queryKey: ["favoritesData"] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            queryClient.invalidateQueries(); // Invalidate all queries as fallback
            // Force re-fetch
            queryClient.refetchQueries({ queryKey: ["favoritesData"] });
        },
        onError: (error) => {
            console.error("Error toggling favorite:", error);
            alert("Feil ved lagring av favoritt. Prøv igjen.");
        },
    });
    const handleFavoriteClick = () => {
        if (!user) {
            alert("Du må være logget inn for å legge til favoritter");
            return;
        }
        if (user && product) {
            toggleFavorite({
                productId: product.id,
                userId: user.id,
                isFavorited: isFavorited,
            });
        }
        else {
            console.error("Missing user or product data", { user, product });
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
            }), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl", children: [isNavigating && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-20", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) })), (0, jsx_runtime_1.jsx)(ImageSlider_1.default, { urls: validUrls }), (0, jsx_runtime_1.jsx)("button", { onClick: handleFavoriteClick, className: "absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-white dark:bg-gray-800 p-1 sm:p-1.5 rounded-full shadow-md touch-manipulation", title: user
                                    ? "Legg til favoritter"
                                    : "Logg inn for å legge til favoritter", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: (0, utils_1.cn)("h-4 w-4 sm:h-5 sm:w-5", {
                                        "text-red-500 fill-red-500": user && isFavorited,
                                        "text-gray-400 dark:text-gray-500": !user || !isFavorited,
                                    }) }) })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: `/product/${product.id}`, onClick: () => setIsNavigating(true), className: (0, utils_1.cn)("block", {
                            "pointer-events-none opacity-70": isNavigating,
                        }), children: (0, jsx_runtime_1.jsx)("h3", { className: "mt-2 sm:mt-4 font-medium text-xs sm:text-sm text-gray-700 dark:text-white line-clamp-2", children: product.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-1 sm:mt-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs sm:text-sm text-gray-500 dark:text-white", children: product.size }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [product.salePrice && ((0, jsx_runtime_1.jsx)("span", { className: "line-through text-gray-400 text-xs sm:text-sm", children: (0, utils_1.formatPrice)(product.price) })), (0, jsx_runtime_1.jsx)("span", { className: product.salePrice
                                            ? "text-red-500 font-bold text-xs sm:text-sm"
                                            : "font-medium text-xs sm:text-sm text-gray-900 dark:text-white", children: (0, utils_1.formatPrice)(product.salePrice || product.price) })] })] })] }) }));
    }
};
exports.default = ProductListing;
