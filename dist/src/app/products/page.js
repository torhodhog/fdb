"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MaxWidthWrapper_1 = __importDefault(require("@/components/MaxWidthWrapper"));
const ProductReel_1 = __importDefault(require("@/components/ProductReel"));
const config_1 = require("@/config");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const LottieAnimation_1 = __importDefault(require("@/components/LottieAnimation")); // Import LottieAnimation
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const parse = (param) => {
    return typeof param === "string" ? param : undefined;
};
const ProductsPage = ({ searchParams }) => {
    const sort = parse(searchParams.sort);
    const category = parse(searchParams.category);
    const nation = parse(searchParams.nation); // Parse the nation parameter
    const label = config_1.PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [ligaSystem, setLigaSystem] = (0, react_1.useState)("");
    const [size, setSize] = (0, react_1.useState)("");
    const [team, setTeam] = (0, react_1.useState)(""); // New state for team selection
    const [hasPrint, setHasPrint] = (0, react_1.useState)(null); // New state for hasPrint selection
    const [selectedNation, setSelectedNation] = (0, react_1.useState)(""); // New state for nation selection
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const handleSearch = () => {
        setIsLoading(true); // Set loading state to true when searching
        // Simulate search delay
        setTimeout(() => {
            setIsLoading(false); // Set loading state to false after search
        }, 500);
    };
    const resetFilters = () => {
        setSearchTerm("");
        setLigaSystem("");
        setSize("");
        setTeam("");
        setHasPrint(null); // Reset hasPrint filter
        setSelectedNation(""); // Reset nation filter
        setIsLoading(true); // Set loading state to true
        // Simulate reset delay
        setTimeout(() => {
            setIsLoading(false); // Set loading state to false after reset
        }, 500);
    };
    // Simulate loading by setting a delay
    (0, react_1.useEffect)(() => {
        setIsLoading(false); // Set loading state to false after initial load
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(MaxWidthWrapper_1.default, { className: "relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row justify-between w-full max-w-sm items-center mt-14", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 flex-grow mb-4 sm:mb-0", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { className: "flex-grow", type: "search", placeholder: "S\u00F8k etter produkter...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSearch, type: "submit", className: "bg-green-900", children: "S\u00F8k" })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "ml-4  w-full sm:w-auto bg-yellow-400", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "mr-2 h-4 w-4" }), " Filtrer"] }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "w-full sm:w-56 left-0 sm:left-auto", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, { children: "Filtrer Produkter" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuGroup, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSub, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shirt, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "St\u00F8rrelse" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubContent, { className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("XS"), children: "XS" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("S"), children: "S" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("M"), children: "M" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("L"), children: "L" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("XL"), children: "XL" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSize("XXL"), children: "XXL" })] }) })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSub, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Lag" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubContent, { className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTeam("Manchester United"), children: "Manchester United" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTeam("Arsenal"), children: "Arsenal" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTeam("Barcelona"), children: "Barcelona" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTeam("Real Madrid"), children: "Real Madrid" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTeam("Juventus"), children: "Juventus" })] }) })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSub, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bold, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Trykk" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubContent, { className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setHasPrint(true), children: "Med Trykk" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setHasPrint(false), children: "Uten Trykk" })] }) })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSub, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Nasjon" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSubContent, { className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Norge"), children: "Norge" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Sverige"), children: "Sverige" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Danmark"), children: "Danmark" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Tyskland"), children: "Tyskland" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Spania"), children: "Spania" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Italia"), children: "Italia" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("Frankrike"), children: "Frankrike" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setSelectedNation("England"), children: "England" })] }) })] })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: resetFilters, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Nullstill Filter" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-8 mt-16", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "England" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDEC\uD83C\uDDE7" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "Spania" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDEA\uD83C\uDDF8" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "Norge" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDF3\uD83C\uDDF4" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "Italia" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDEE\uD83C\uDDF9" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "Frankrike" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDEB\uD83C\uDDF7" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: { pathname: "/products", query: { nation: "Tyskland" } }, className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "2rem" }, children: "\uD83C\uDDE9\uD83C\uDDEA" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", className: "text-black text-lg font-semibold hover:underline", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { style: { fontSize: "2rem" } }) })] })] }), (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { children: isLoading ? ((0, jsx_runtime_1.jsx)(LottieAnimation_1.default, {}) // Display the Lottie animation while loading
                ) : ((0, jsx_runtime_1.jsx)(ProductReel_1.default, { title: label ?? "Alle produkter", query: {
                        category,
                        sort: sort === "desc" || sort === "asc" ? sort : undefined,
                        searchTerm: team ? team : searchTerm, // <--- henter fra din local state
                        liga_system: ligaSystem,
                        size: size,
                        limit: 1000,
                        hasPrint: hasPrint,
                        nation: selectedNation || nation,
                    } })) })] }));
};
exports.default = ProductsPage;
