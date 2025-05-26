import { useMemo } from 'react'
import { useCart } from '@contexts/CartContext'

/**
 * Hook to handle cart summary calculations and operations
 * @param shippingMethod The selected shipping method ('fedex', 'dhl', etc.)
 * @returns Cart items, summary calculations, and handler functions
 */
export const useCartSummary = (shippingMethod: string) => {
  // Get cart data and methods from CartContext
  const {
    items,
    removeItem,
    updateItem,
    subtotal: cartSubtotal,
    totalItems,
  } = useCart()

  // Calculate order summary values based on cart data and shipping method
  const summary = useMemo(() => {
    // Tax calculation (17%)
    const tax = cartSubtotal * 0.17

    // Shipping cost based on method
    const getShippingCost = (method: string): number => {
      if (method === 'fedex') return 32
      if (method === 'dhl') return 15
      return 0
    }

    const shipping = getShippingCost(shippingMethod)

    // Total order value
    const total = cartSubtotal + tax + shipping

    return {
      subtotal: cartSubtotal,
      tax,
      shipping,
      total,
      itemCount: totalItems,
    }
  }, [cartSubtotal, shippingMethod, totalItems])

  /**
   * Handle changing item quantity
   * @param id The item ID
   * @param quantity The new quantity
   */
  const handleQuantityChange = (id: number, quantity: number) => {
    // Prevent negative quantities
    if (quantity <= 0) {
      return removeItem(id)
    }

    updateItem(id, { quantity })
  }

  /**
   * Handle changing item unit type (e.g., kg, pcs)
   * @param id The item ID
   * @param buyUnit The new unit type
   */
  const handleUnitChange = (id: number, buyUnit: string) => {
    updateItem(id, { buyUnit })
  }

  return {
    items,
    ...summary,
    isEmpty: items.length === 0,
    handleQuantityChange,
    handleUnitChange,
    handleRemove: removeItem,
  }
}
