import { Product } from "@/payload-types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type CartItem = {
   product: Product
}

type CartState = {
   items: CartItem[]
   addItem: (product: Product) => void
   removeItem: (productId: string) => void
   clearCart: () => void
}

export const useCart = create<CartState>()(
   persist(
     (set) => ({
       items: [],
       addItem: (product) =>
         set((state) => {
           // Check if the product already exists in the cart
           const existingItem = state.items.find(
             (item) => item.product.id === product.id
           )
           
           // If it already exists, don't add it again
           if (existingItem) {
             return state
           }
           
           // Otherwise, add the new product to the cart
           return { items: [...state.items, { product }] }
         }),
       removeItem: (id) =>
         set((state) => ({
           items: state.items.filter(
             (item) => item.product.id !== id
           ),
         })),
       clearCart: () => set({ items: [] }),
     }),
     {
       name: 'cart-storage',
       storage: createJSONStorage(() => localStorage),
     }
   )
 )