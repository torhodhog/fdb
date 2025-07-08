"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCart = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useCart = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    items: [],
    addItem: (product) => set((state) => {
        // Check if the product already exists in the cart
        const existingItem = state.items.find((item) => item.product.id === product.id);
        // If it already exists, don't add it again
        if (existingItem) {
            return state;
        }
        // Otherwise, add the new product to the cart
        return { items: [...state.items, { product }] };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== id),
    })),
    clearCart: () => set({ items: [] }),
}), {
    name: 'cart-storage',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
