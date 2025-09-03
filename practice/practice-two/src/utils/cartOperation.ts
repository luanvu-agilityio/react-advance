import type { Product } from 'types/Product'
import type { CartItem } from 'types/cart-items'

/**
 * Adds an item to the cart or increments quantity if it already exists
 */
export const addItemToCart = (
  items: CartItem[],
  product:
    | Product
    | (Partial<Product> & { id: number; price: number; title: string }),
  quantity: number,
  buyUnit: string
): CartItem[] => {
  const existingItemIndex = items.findIndex(
    (i) => i.id === product.id && i.buyUnit === buyUnit
  )

  if (existingItemIndex !== -1) {
    const newItems = [...items]
    newItems[existingItemIndex].quantity += quantity
    return newItems
  } else {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      buyUnit,
      images: product.images ?? { main: '', gallery: [] },
      farm: product.farm,
      freshness: product.freshness,
      rating: product.rating,
    }
    return [...items, newItem]
  }
}

/**
 * Removes an item from the cart by id
 */
export const removeItemFromCart = (
  items: CartItem[],
  id: number
): CartItem[] => {
  return items.filter((item) => item.id !== id)
}

/**
 * Updates an existing cart item
 */
export const updateCartItem = (
  items: CartItem[],
  id: number,
  updates: Partial<CartItem>
): CartItem[] => {
  return items.map((item) => (item.id === id ? { ...item, ...updates } : item))
}
