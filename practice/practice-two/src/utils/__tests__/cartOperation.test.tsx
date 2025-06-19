import {
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} from '../cartOperation'
import type { CartItem } from 'types/cart-items'
import type { Product } from 'types/Product'

describe('Cart Operations', () => {
  // Sample product data for testing
  const product1: Product = {
    id: 1,
    title: 'Apple',
    price: 2.5,
    imageUrl: 'apple.jpg',
    farm: 'Organic Farm',
    freshness: 'New',
    rating: 4.5,
    category: 'fruits',
    subcategory: 'apples',
    description: 'Fresh organic apple',
    originalPrice: 3.0,
    delivery: { time: '1-2 days', location: 'Local' },
    stock: '100',
    freeShipping: true,
    tags: ['best-selling'],
    brand: 'A',
    images: {
      main: 'apple.jpg',
      gallery: ['apple-2.jpg'],
    },
  }

  const product2: Product = {
    id: 2,
    title: 'Orange',
    price: 1.5,
    imageUrl: 'orange.jpg',
    farm: 'Citrus Grove',
    freshness: 'Fresh',
    rating: 4.0,
    category: 'fruits',
    subcategory: 'citrus',
    description: 'Juicy orange',
    originalPrice: 2.0,
    delivery: { time: '1-3 days', location: 'Local' },
    stock: '80',
    freeShipping: true,
    tags: ['best-selling'],
    brand: 'B',
    images: {
      main: 'orange.jpg',
      gallery: ['orange-2.jpg'],
    },
  }

  // Sample cart items for testing
  const initialCartItems: CartItem[] = [
    {
      id: 1,
      title: 'Apple',
      price: 2.5,
      quantity: 2,
      buyUnit: 'kg',
      imageUrl: 'apple.jpg',
      farm: 'Organic Farm',
      freshness: 'New',
      rating: 4.5,
    },
  ]

  describe('addItemToCart', () => {
    it('should add a new item to an empty cart', () => {
      const result = addItemToCart([], product1, 1, 'kg')

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
      expect(result[0].quantity).toBe(1)
      expect(result[0].buyUnit).toBe('kg')
    })

    it('should increment quantity when adding existing item with same buyUnit', () => {
      const result = addItemToCart(initialCartItems, product1, 3, 'kg')

      expect(result).toHaveLength(1)
      expect(result[0].quantity).toBe(5) // 2 (initial) + 3 (added)
    })

    it('should add as new item when same product has different buyUnit', () => {
      const result = addItemToCart(initialCartItems, product1, 1, 'pcs')

      expect(result).toHaveLength(2)
      expect(result[1].id).toBe(1)
      expect(result[1].buyUnit).toBe('pcs')
      expect(result[1].quantity).toBe(1)
    })

    it('should add different products as separate items', () => {
      const result = addItemToCart(initialCartItems, product2, 2, 'kg')

      expect(result).toHaveLength(2)
      expect(result[1].id).toBe(2)
      expect(result[1].title).toBe('Orange')
    })
  })

  describe('removeItemFromCart', () => {
    it('should remove an item from cart by id', () => {
      const result = removeItemFromCart(initialCartItems, 1)

      expect(result).toHaveLength(0)
    })

    it('should handle empty cart', () => {
      const result = removeItemFromCart([], 1)

      expect(result).toHaveLength(0)
    })
  })

  describe('updateCartItem', () => {
    it('should update quantity of an existing item', () => {
      const result = updateCartItem(initialCartItems, 1, { quantity: 10 })

      expect(result[0].quantity).toBe(10)
      expect(result).toHaveLength(1)
    })

    it('should update multiple properties at once', () => {
      const result = updateCartItem(initialCartItems, 1, {
        quantity: 5,
        buyUnit: 'pcs',
        price: 3.0,
      })

      expect(result[0].quantity).toBe(5)
      expect(result[0].buyUnit).toBe('pcs')
      expect(result[0].price).toBe(3.0)
    })

    it('should not modify other items in the cart', () => {
      // Create a cart with multiple items
      const multiItemCart = [
        ...initialCartItems,
        {
          id: 2,
          title: 'Orange',
          price: 1.5,
          quantity: 3,
          buyUnit: 'kg',
          imageUrl: 'orange.jpg',
          farm: 'Citrus Grove',
          freshness: 'Fresh',
          rating: 4.0,
        },
      ]

      const result = updateCartItem(multiItemCart, 1, { quantity: 10 })

      expect(result[0].quantity).toBe(10)
      expect(result[1].quantity).toBe(3) // Unchanged
      expect(result).toHaveLength(2)
    })
  })
})
