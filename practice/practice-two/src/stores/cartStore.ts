import {
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} from '@utils/cartOperation'
import type { Product } from 'types/Product'
import type { CartItem } from 'types/cart-items'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  // State
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (
    product:
      | Product
      | (Partial<Product> & { id: number; price: number; title: string }),
    quantity: number,
    buyUnit: string
  ) => void
  removeItem: (id: number) => void
  updateItem: (id: number, updatedItem: Partial<CartItem>) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  updateQuantity: (id: number, quantity: number) => void
  updateUnit: (id: number, buyUnit: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, buyUnit) => {
        set((state) => {
          const updatedItems = addItemToCart(
            state.items,
            product,
            quantity,
            buyUnit
          )
          return { items: updatedItems, isOpen: true }
        })
      },

      removeItem: (id) =>
        set((state) => ({
          items: removeItemFromCart(state.items, id),
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: updateCartItem(state.items, id, updates),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: updateCartItem(state.items, id, { quantity }),
        })),

      updateUnit: (id, buyUnit) =>
        set((state) => ({
          items: updateCartItem(state.items, id, { buyUnit }),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
