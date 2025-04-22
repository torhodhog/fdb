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
const ProductListing = ({ product, index }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [favorites, setFavorites] = (0, react_1.useState)(new Set());
    const [userId, setUserId] = (0, react_1.useState)(null);
    const [hasFetchedFavorites, setHasFetchedFavorites] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);
        return () => clearTimeout(timer);
    }, [index]);
    (0, react_1.useEffect)(() => {
        if (hasFetchedFavorites)
            return;
        const fetchFavorites = async () => {
            try {
                const response = await fetch("/api/favorites", {
                    credentials: "include",
                });
                const data = await response.json();
                const docs = Array.isArray(data) ? data : data.docs;
                if (!Array.isArray(docs)) {
                    console.error("Uventet format på /api/favorites:", data);
                    return;
                }
                const productIds = docs.map((fav) => typeof fav.product === "string"
                    ? fav.product
                    : fav.product?.id || "");
                setFavorites(new Set(productIds));
                setHasFetchedFavorites(true);
            }
            catch (error) {
                console.error("Feil under henting av favoritter:", error);
            }
        };
        fetchFavorites();
    }, [hasFetchedFavorites]);
    (0, react_1.useEffect)(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/user", {
                    credentials: "include",
                });
                if (!response.ok) {
                    console.error("Failed to fetch user:", await response.json());
                    return;
                }
                const data = await response.json();
                setUserId(data.userId);
            }
            catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    const toggleFavorite = async (productId) => {
        try {
            if (favorites.has(productId)) {
                const response = await fetch(`/api/favorites/${productId}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API error:", errorData);
                    alert("Kunne ikke oppdatere favoritt. Prøv igjen senere.");
                    return;
                }
                setFavorites((prev) => {
                    const updated = new Set(prev);
                    updated.delete(productId);
                    return updated;
                });
            }
            else {
                if (!userId) {
                    alert("Du må være logget inn for å legge til favoritter.");
                    return;
                }
                const response = await fetch(`/api/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ user: userId, product: productId }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API error:", errorData);
                    alert("Kunne ikke oppdatere favoritt. Prøv igjen senere.");
                    return;
                }
                setFavorites((prev) => new Set(prev).add(productId));
            }
        }
        catch (error) {
            console.error("Failed to toggle favorite:", error);
        }
    };
    if (!product || !isVisible)
        return (0, jsx_runtime_1.jsx)(ProductPlaceholder, {});
    const validUrls = product.images
        .map(({ image }) => {
        if (typeof image === "string") {
            return image;
        }
        else if (image && "url" in image) {
            return image.url;
        }
        return null;
    })
        .filter(Boolean);
    return ((0, jsx_runtime_1.jsx)(link_1.default, { className: (0, utils_1.cn)("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
        }), href: `/product/${product.id}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full relative", children: [(0, jsx_runtime_1.jsx)(ImageSlider_1.default, { urls: validUrls }), product.isSold ? ((0, jsx_runtime_1.jsx)("p", { className: " text-gray-400 mt-8", children: "Dette produktet er dessverre solgt" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { className: "mt-4 font-medium text-sm", children: product.name }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-gray-500", children: ["St\u00F8rrelse: ", product.size] }), product.onSale &&
                            product.salePrice !== null &&
                            product.salePrice !== undefined ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "mt-1 font-medium text-sm line-through", children: (0, utils_1.formatPrice)(product.price) }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 font-medium text-sm text-red-500", children: [(0, utils_1.formatPrice)(product.salePrice), " (", Math.round((1 - product.salePrice / product.price) * 100), "% off)"] })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 font-medium text-sm", children: (0, utils_1.formatPrice)(product.price) })), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                e.preventDefault();
                                toggleFavorite(product.id);
                            }, className: "absolute top-4 right-4 z-10", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "w-6 h-6", fill: favorites.has(product.id) ? "red" : "none", stroke: favorites.has(product.id) ? "red" : "currentColor" }) })] }))] }) }));
};
const ProductPlaceholder = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-full" }) }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-4/6 mt-4" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-3/6 mt-2" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-2/6 mt-2" })] }));
};
exports.default = ProductListing;
