"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("swiper/react");
require("swiper/css");
require("swiper/css/pagination");
const react_2 = require("react");
const modules_1 = require("swiper/modules");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const ImageSlider = ({ urls }) => {
    const [swiper, setSwiper] = (0, react_2.useState)(null);
    const [activeIndex, setActiveIndex] = (0, react_2.useState)(0);
    const [slideConfig, setSlideConfig] = (0, react_2.useState)({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
    });
    (0, react_2.useEffect)(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex);
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1,
            });
        });
    }, [swiper, urls]);
    const activeStyles = 'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300';
    const inactiveStyles = 'hidden text-gray-400';
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'group relative  bg-zinc-100 aspect-square overflow-hidden', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition', children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.preventDefault();
                            swiper?.slideNext();
                        }, className: (0, utils_1.cn)(activeStyles, 'right-3 transition', {
                            [inactiveStyles]: slideConfig.isEnd,
                            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isEnd,
                        }), "aria-label": 'next image', children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: 'h-4 w-4 text-zinc-700' }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.preventDefault();
                            swiper?.slidePrev();
                        }, className: (0, utils_1.cn)(activeStyles, 'left-3 transition', {
                            [inactiveStyles]: slideConfig.isBeginning,
                            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isBeginning,
                        }), "aria-label": 'previous image', children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: 'h-4 w-4 text-zinc-700' }) })] }), (0, jsx_runtime_1.jsx)(react_1.Swiper, { pagination: {
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition ${className}"></span>`;
                    },
                }, onSwiper: (swiper) => setSwiper(swiper), spaceBetween: 10, slidesPerView: 1, modules: [modules_1.Pagination], touchRatio: 1, touchStartPreventDefault: false, simulateTouch: true, className: "h-full w-full", children: urls.map((url, i) => ((0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { className: "-z-10 relative h-full w-full", children: (0, jsx_runtime_1.jsx)(image_1.default, { className: "-z-10 object-center", src: url, alt: `Product image ${i + 1}`, fill: true, sizes: "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw", style: { objectFit: 'cover' }, priority: i === 0 }) }, i))) })] }));
};
exports.default = ImageSlider;
