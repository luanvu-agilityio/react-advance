import { renderHook, act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { useTagNavigation } from '../useTagNavigation'
import { useCategoryStore } from '@stores/categoryStore'
import { useProductTagStore } from '@stores/tagStore'
import type { ProductTag } from '@utils/tagUtils'

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

jest.mock('@stores/tagStore', () => ({
  useProductTagStore: jest.fn(),
}))

describe('useTagNavigation', () => {
  // Mock navigation function
  const mockNavigate = jest.fn()

  // Mock category store functions
  const mockSetCategory = jest.fn()
  const mockSetSubcategory = jest.fn()
  const mockSetBrands = jest.fn()
  const mockSetSearchQuery = jest.fn()

  // Mock tag store functions
  const mockAddTag = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    // Setup category store mock
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      setCategory: mockSetCategory,
      setSubcategory: mockSetSubcategory,
      setBrands: mockSetBrands,
      setSearchQuery: mockSetSearchQuery,
    })

    // Setup tag store mock
    ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
      addTag: mockAddTag,
    })
  })

  describe('navigateToTag', () => {
    test('should navigate to category tag URL', () => {
      // Arrange
      const categoryTag: ProductTag = {
        label: 'Electronics',
        type: 'category',
        value: 'electronics',
      }

      const { result } = renderHook(() => useTagNavigation())

      // Act
      act(() => {
        result.current.navigateToTag(categoryTag)
      })

      // Assert
      expect(mockNavigate).toHaveBeenCalledWith('/electronics')
      expect(mockSetCategory).toHaveBeenCalledWith('electronics')
    })

    test('should navigate to subcategory tag URL', () => {
      // Arrange
      const subcategoryTag: ProductTag = {
        label: 'Smartphones',
        type: 'subcategory',
        value: 'smartphones',
        categoryPath: 'electronics',
      }

      const { result } = renderHook(() => useTagNavigation())

      // Act
      act(() => {
        result.current.navigateToTag(subcategoryTag)
      })

      // Assert
      expect(mockNavigate).toHaveBeenCalledWith('/electronics')
      expect(mockSetCategory).toHaveBeenCalledWith('electronics')
      expect(mockSetSubcategory).toHaveBeenCalledWith('smartphones')
    })

    test('should navigate to brand filter page', () => {
      // Arrange
      const brandTag: ProductTag = {
        label: 'Apple',
        type: 'brand',
        value: 'Apple',
      }

      const { result } = renderHook(() => useTagNavigation())

      // Act
      act(() => {
        result.current.navigateToTag(brandTag)
      })

      // Assert
      expect(mockNavigate).toHaveBeenCalledWith('/all-products')
      expect(mockSetBrands).toHaveBeenCalledWith(['Apple'])
    })

    test('should navigate to product search results', () => {
      // Arrange
      const productTag: ProductTag = {
        label: 'iPhone',
        type: 'product',
        value: 'iphone',
      }

      const { result } = renderHook(() => useTagNavigation())

      // Act
      act(() => {
        result.current.navigateToTag(productTag)
      })

      // Assert
      expect(mockNavigate).toHaveBeenCalledWith('/search-results')
      expect(mockSetSearchQuery).toHaveBeenCalledWith('iPhone')
    })

    test('should not navigate when subcategory has no categoryPath', () => {
      // Arrange
      const invalidSubcategoryTag: ProductTag = {
        label: 'Invalid',
        type: 'subcategory',
        value: 'invalid',
        // Missing categoryPath
      }

      const { result } = renderHook(() => useTagNavigation())

      // Act
      act(() => {
        result.current.navigateToTag(invalidSubcategoryTag)
      })

      // Assert
      expect(mockNavigate).not.toHaveBeenCalled()
      expect(mockSetCategory).not.toHaveBeenCalled()
      expect(mockSetSubcategory).not.toHaveBeenCalled()
    })
  })
})
