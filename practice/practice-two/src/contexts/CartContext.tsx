import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
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
    // Update the last operation timestamp

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

  // New updateItem function to update any property of a cart item
  const updateItem = (id: number, updatedItem: Partial<CartItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

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
      clearCart,
      isOpen,
      openCart,
      closeCart,
      totalItems,
      subtotal,
    }),
    [items, isOpen, totalItems, subtotal]
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
