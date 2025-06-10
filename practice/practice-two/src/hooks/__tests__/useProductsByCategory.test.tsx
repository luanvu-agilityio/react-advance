import { renderHook } from '@testing-library/react'
import { useProductsByCategory } from '../useProductsByCategory'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { navbarData } from '@data/navbar'
import { productData } from '@data/product-data'

// Mock React Router hooks
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock the imported data
jest.mock('@data/navbar', () => ({
  navbarData: [
    { label: 'Electronics', links: [] },
    { label: 'Fruits and Vegetables', links: [] },
    { label: 'Home and Kitchen', links: [] },
  ],
}))

jest.mock('@data/product-data', () => ({
  productData: [
    {
      id: '1',
      title: 'iPhone 14',
      description: 'Latest iPhone model',
      category: 'Electronics',
      subcategory: 'Phones',
      brand: 'Apple',
      tags: ['phone', 'smartphone'],
      price: 999,
    },
    {
      id: '2',
      title: 'Banana',
      description: 'Yellow fruit',
      category: 'Fruits and Vegetables',
      subcategory: 'Fruits',
      brand: 'Organic',
      price: 0.99,
    },
    {
      id: '3',
      title: 'Coffee Maker',
      description: 'Makes coffee',
      category: 'Home and Kitchen',
      subcategory: 'Appliances',
      brand: 'KitchenAid',
      price: 129.99,
    },
  ],
}))

describe('useProductsByCategory', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementations
    ;(useParams as jest.Mock).mockReturnValue({ categoryPath: '' })
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/' })
    ;(useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(''),
      jest.fn(),
    ])
  })

  test('should return all products when on all-products page', () => {
    // Arrange
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/all-products' })

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toEqual(productData)
    expect(result.current.currentCategory).toBeUndefined()
    expect(result.current.searchQuery).toBe('')
  })

  test('should filter products by category path', () => {
    // Arrange
    ;(useParams as jest.Mock).mockReturnValue({ categoryPath: 'electronics' })
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/category/electronics',
    })

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toHaveLength(1)
    expect(result.current.productsInCategory[0].id).toBe('1')
    expect(result.current.categoryPath).toBe('electronics')
    expect(result.current.currentCategory).toEqual(navbarData[0])
  })

  test('should filter products by search query', () => {
    // Arrange
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/search-results' })
    ;(useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('search=coffee'),
      jest.fn(),
    ])

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toHaveLength(1)
    expect(result.current.productsInCategory[0].id).toBe('3')
    expect(result.current.searchQuery).toBe('coffee')
  })

  test('should filter products by category with spaces and special characters', () => {
    // Arrange
    ;(useParams as jest.Mock).mockReturnValue({
      categoryPath: 'fruits-and-vegetables',
    })
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/category/fruits-and-vegetables',
    })

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toHaveLength(1)
    expect(result.current.productsInCategory[0].id).toBe('2')
    expect(result.current.currentCategory).toEqual(navbarData[1])
  })

  test('should return subcategoryParam from search params', () => {
    // Arrange
    ;(useParams as jest.Mock).mockReturnValue({ categoryPath: 'electronics' })
    ;(useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('subcategory=phones'),
      jest.fn(),
    ])

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.subcategoryParam).toBe('phones')
  })

  test('should find products that match search query in multiple fields', () => {
    // Arrange
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/search-results' })
    ;(useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('search=apple'),
      jest.fn(),
    ])

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toHaveLength(1)
    expect(result.current.productsInCategory[0].brand).toBe('Apple')
  })

  test('should return empty array when no products match the category', () => {
    // Arrange
    ;(useParams as jest.Mock).mockReturnValue({ categoryPath: 'non-existent' })
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/category/non-existent',
    })

    // Act
    const { result } = renderHook(() => useProductsByCategory())

    // Assert
    expect(result.current.productsInCategory).toHaveLength(0)
    expect(result.current.currentCategory).toBeUndefined()
  })
})
