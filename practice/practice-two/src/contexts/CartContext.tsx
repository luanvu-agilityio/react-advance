import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react'
import type { Product } from '../types/Product'

// Extend Product type for cart items
export interface CartItem
  extends Partial<Omit<Product, 'id' | 'price' | 'title'>> {
  id: number
  title: string
  price: number
  quantity: number
  buyUnit: string
  originalPrice?: number
  imageUrl?: string
  farm?: string
  freshness?: string
  rating?: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (
    product:
      | Product
      | (Partial<Product> & { id: number; price: number; title: string }),
    quantity: number,
    buyUnit: string
  ) => void
  removeItem: (id: number) => void
  updateItem: (id: number, updatedItem: Partial<CartItem>) => void
  updateQuantity: (id: number, quantity: number) => void
  updateUnit: (id: number, buyUnit: string) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart data from localStorage')
        throw e
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (
    product:
      | Product
      | (Partial<Product> & { id: number; price: number; title: string }),
    quantity: number,
    buyUnit: string
  ) => {
    setItems((prevItems) => {
      // Check if item already exists in cart with same buyUnit
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === product.id && i.buyUnit === buyUnit
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        const cartItem: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          buyUnit,
          originalPrice: product.originalPrice,
          imageUrl: product.imageUrl,
          farm: product.farm,
          freshness: product.freshness,
          rating: product.rating,
        }
        return [...prevItems, cartItem]
      }
    })

    // Open cart when item is added
    setIsOpen(true)
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Alias for removeItem to match OrderSummary expectations
  const removeFromCart = (id: number) => {
    removeItem(id)
  }

  // New updateItem function to update any property of a cart item
  const updateItem = (id: number, updatedItem: Partial<CartItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    )
  }

  // Update quantity specifically
  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  // Update buy unit specifically
  const updateUnit = (id: number, buyUnit: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, buyUnit } : item))
    )
  }

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem('cart')
  }, [])

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItem,
      updateQuantity,
      updateUnit,
      removeFromCart,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      totalItems,
      subtotal,
    }),
    [items, isOpen, totalItems, subtotal, clearCart, removeFromCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
