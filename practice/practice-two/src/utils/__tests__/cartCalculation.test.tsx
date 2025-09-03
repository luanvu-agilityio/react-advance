import {
  calculateSubtotal,
  calculateTax,
  calculateShippingCost,
  calculateTotal,
} from '../cartCalculation'
import type { CartItem } from 'types/cart-items'

describe('Cart Calculation Utilities', () => {
  // Sample cart items for testing
  const sampleCartItems: CartItem[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      quantity: 2,
      images: {
        main: '',
        gallery: [],
      },
      buyUnit: 'kg',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 50,
      quantity: 1,
      images: {
        main: '',
        gallery: [],
      },
      buyUnit: 'pcs',
    },
    {
      id: 3,
      title: 'Product 3',
      price: 75,
      quantity: 3,
      images: {
        main: '',
        gallery: [],
      },
      buyUnit: 'box',
    },
  ]

  describe('calculateSubtotal', () => {
    it('should return 0 for empty cart', () => {
      expect(calculateSubtotal([])).toBe(0)
    })

    it('should calculate subtotal for a single item', () => {
      const singleItem: CartItem[] = [sampleCartItems[0]]
      // 100 * 2 = 200
      expect(calculateSubtotal(singleItem)).toBe(200)
    })

    it('should calculate subtotal for multiple items', () => {
      // (100 * 2) + (50 * 1) + (75 * 3) = 200 + 50 + 225 = 475
      expect(calculateSubtotal(sampleCartItems)).toBe(475)
    })
  })

  describe('calculateTax', () => {
    it('should calculate tax using default rate (17%)', () => {
      expect(calculateTax(100)).toBe(17)
      expect(calculateTax(200)).toBe(34)
    })

    it('should calculate tax using custom rate', () => {
      expect(calculateTax(100, 0.1)).toBe(10)
      expect(calculateTax(200, 0.05)).toBe(10)
    })
  })

  describe('calculateShippingCost', () => {
    it('should return fedex shipping cost', () => {
      expect(calculateShippingCost('fedex')).toBe(32.0)
    })

    it('should return dhl shipping cost', () => {
      expect(calculateShippingCost('dhl')).toBe(15.0)
    })
  })

  describe('calculateTotal', () => {
    it('should sum subtotal, tax and shipping cost', () => {
      expect(calculateTotal(100, 17, 15)).toBe(132)
      expect(calculateTotal(200, 34, 32)).toBe(266)
    })

    it('should handle decimal values', () => {
      expect(calculateTotal(99.99, 17, 15)).toBeCloseTo(131.99, 2)
    })
  })

  describe('Integration tests', () => {
    it('should calculate the complete order total', () => {
      const subtotal = calculateSubtotal(sampleCartItems)
      const tax = calculateTax(subtotal)
      const shipping = calculateShippingCost('fedex')
      const total = calculateTotal(subtotal, tax, shipping)

      // Subtotal: 475
      // Tax (17%): 80.75
      // Shipping: 32
      // Total: 587.75
      expect(total).toBeCloseTo(587.75, 2)
    })
  })
})
