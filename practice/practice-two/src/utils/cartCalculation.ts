import type { CartItem } from 'types/cart-items'

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const calculateTax = (subtotal: number, taxRate = 0.17): number => {
  return subtotal * taxRate //  17% tax rate
}

export const calculateShippingCost = (method: string): number => {
  switch (method) {
    case 'fedex':
      return 32.0
    case 'dhl':
      return 15.0
    default:
      return 15.0
  }
}

export const calculateTotal = (
  subtotal: number,
  tax: number,
  shipping: number
): number => {
  return subtotal + tax + shipping
}
