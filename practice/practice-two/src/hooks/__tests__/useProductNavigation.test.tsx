import { renderHook, act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { useProductNavigation } from '../useProductNavigation'
import type { Product } from 'types/Product'

// Mock React Router's useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

// Mock window.scrollTo
const originalScrollTo = window.scrollTo
window.scrollTo = jest.fn()

describe('useProductNavigation', () => {
  // Mock navigate function
  const mockNavigate = jest.fn()

  // Sample products for testing
  const sampleProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 14',
      category: 'Electronics',
      subcategory: 'Smart Phones',
      price: 999,
      originalPrice: 1099,
      description: 'Latest iPhone model',
      discountPercentage: 0,
      rating: 4.8,
      stock: '100',
      brand: 'Apple',
      delivery: {
        time: '1-3 days',
        location: 'California',
      },
      freshness: 'New',
      farm: 'Apple Farm',
      freeShipping: true,
      imageUrl: 'iphone.jpg',
      tags: ['phone', 'apple', 'smartphone'],
      images: {
        main: 'iphone_main.jpg',
        gallery: ['iphone1.jpg', 'iphone2.jpg', 'iphone3.jpg'],
      },
    },
    {
      id: 2,
      title: 'Samsung Galaxy S22',
      category: 'Electronics',
      subcategory: 'Smart Phones',
      price: 899,
      originalPrice: 999,
      description: 'Latest Samsung model',
      discountPercentage: 5,
      rating: 4.7,
      stock: '80',
      brand: 'Samsung',
      delivery: {
        time: '2-4 days',
        location: 'Texas',
      },
      freshness: 'New',
      farm: 'Samsung Farm',
      freeShipping: true,
      imageUrl: 'samsung.jpg',
      tags: ['phone', 'samsung', 'smartphone'],
      images: {
        main: 'samsung_main.jpg',
        gallery: ['samsung1.jpg', 'samsung2.jpg', 'samsung3.jpg'],
      },
    },
  ]

  // Invalid product missing subcategory
  const invalidProduct: Product = {
    id: 3,
    title: 'Invalid Product',
    category: 'Electronics',
    subcategory: '', // Missing subcategory
    price: 299,
    originalPrice: 349,
    description: 'Invalid product',
    discountPercentage: 0,
    rating: 4.0,
    stock: '50',
    brand: 'Generic',
    delivery: {
      time: '3-5 days',
      location: 'Nevada',
    },
    freshness: 'New',
    farm: 'Generic Farm',
    freeShipping: false,
    imageUrl: 'generic.jpg',
    tags: ['generic', 'budget'],
    images: {
      main: 'generic_main.jpg',
      gallery: ['generic1.jpg', 'generic2.jpg'],
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Setup the mock navigate function for each test
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  afterAll(() => {
    // Restore original window.scrollTo
    window.scrollTo = originalScrollTo
  })

  test('navigateToProduct should navigate to correct product URL', () => {
    // Arrange
    const { result } = renderHook(() => useProductNavigation())
    const product = sampleProducts[0]

    // Act
    act(() => {
      result.current.navigateToProduct(product)
    })

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/electronics/smart-phones/1')
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  test('navigateToProduct should handle spaces in category and subcategory', () => {
    // Arrange
    const { result } = renderHook(() => useProductNavigation())
    const product = {
      ...sampleProducts[0],
      category: 'Home and Kitchen',
      subcategory: 'Coffee Makers',
    }

    // Act
    act(() => {
      result.current.navigateToProduct(product)
    })

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith(
      '/home-and-kitchen/coffee-makers/1'
    )
  })

  test('navigateToProduct should not navigate for products with missing category/subcategory', () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useProductNavigation())

    // Act
    act(() => {
      result.current.navigateToProduct(invalidProduct)
    })

    // Assert
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Product missing category or subcategory:',
      expect.anything()
    )

    consoleSpy.mockRestore()
  })

  test('createProductClickHandler should find product and navigate to it', () => {
    // Arrange
    const { result } = renderHook(() => useProductNavigation())

    // Create the handler with our sample products
    let productClickHandler: (id: number) => void
    act(() => {
      productClickHandler =
        result.current.createProductClickHandler(sampleProducts)
    })

    // Act
    act(() => {
      productClickHandler(2) // Navigate to Samsung Galaxy
    })

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/electronics/smart-phones/2')
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  test('createProductClickHandler should handle products not found', () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useProductNavigation())

    // Create the handler with our sample products
    let productClickHandler: (id: number) => void
    act(() => {
      productClickHandler =
        result.current.createProductClickHandler(sampleProducts)
    })

    // Act
    act(() => {
      productClickHandler(999) // Non-existent ID
    })

    // Assert
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith('Product not found with id:', 999)

    consoleSpy.mockRestore()
  })

  test('should memoize handler functions properly', () => {
    // Arrange
    const { result, rerender } = renderHook(() => useProductNavigation())

    // Capture initial function references
    const initialNavigateToProduct = result.current.navigateToProduct
    const initialCreateProductClickHandler =
      result.current.createProductClickHandler

    // Act - cause a rerender
    rerender()

    // Assert - functions should be the same instances (memoized)
    expect(result.current.navigateToProduct).toBe(initialNavigateToProduct)
    expect(result.current.createProductClickHandler).toBe(
      initialCreateProductClickHandler
    )
  })
})
