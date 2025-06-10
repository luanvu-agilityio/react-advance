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

  // Computed values
  getSubtotal: () => number
  getTax: () => number
  getShippingCost: (method: string) => number
  getTotal: (shippingMethod: string) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, buyUnit) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === product.id && i.buyUnit === buyUnit
          )
          if (existingItemIndex !== -1) {
            const newItems = [...state.items]
            newItems[existingItemIndex].quantity += quantity
            return { items: newItems, isOpen: true }
          } else {
            const newItem = {
              id: product.id,
              title: product.title,
              price: product.price,
              quantity,
              buyUnit,
              imageUrl: product.imageUrl,
              farm: product.farm,
              freshness: product.freshness,
              rating: product.rating,
            }
            return {
              items: [...state.items, newItem],
              isOpen: true,
            }
          }
        })
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getTax: () => get().getSubtotal() * 0.17, //  17% tax rate

      getShippingCost: (method) => {
        switch (method) {
          case 'fedex':
            return 32
          case 'dhl':
            return 15
          default:
            return 15
        }
      },

      getTotal: (shippingMethod) => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        const shippingCost = get().getShippingCost(shippingMethod)
        return subtotal + tax + shippingCost
      },

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      updateUnit: (id, buyUnit) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, buyUnit } : item
          ),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
