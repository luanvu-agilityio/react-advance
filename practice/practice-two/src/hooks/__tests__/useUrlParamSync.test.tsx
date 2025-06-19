import { renderHook, act } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { useUrlParamSync } from '../useUrlParamSync'
import { useCategoryStore } from '@stores/categoryStore'
import {
  categoryStateToUrlParams,
  urlParamsToCategoryState,
} from '@utils/categoryUrlParams'

// Mock React Router
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

// Mock Zustand store
jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

// Mock utility functions
jest.mock('@utils/categoryUrlParams', () => ({
  categoryStateToUrlParams: jest.fn(),
  urlParamsToCategoryState: jest.fn(),
}))

describe('useUrlParamSync', () => {
  // Mock URL search params
  const setSearchParams = jest.fn()
  let mockSearchParams: URLSearchParams

  // Mock store functions and state
  const updateFilters = jest.fn()
  let mockCurrentPage = 1
  let mockLimit = 5

  beforeEach(() => {
    jest.clearAllMocks()

    // Set up URL params mock
    mockSearchParams = new URLSearchParams()
    ;(useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      setSearchParams,
    ])

    // Set up store mock with the correct functions
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      updateFilters,
      currentPage: mockCurrentPage,
      limit: mockLimit,
    })

    // Default mock implementation for utility functions
    ;(categoryStateToUrlParams as jest.Mock).mockReturnValue(
      new URLSearchParams()
    )
    ;(urlParamsToCategoryState as jest.Mock).mockReturnValue({
      currentPage: 1,
      limit: 5,
    })
  })

  test('should sync URL params to store on mount', () => {
    // Arrange
    mockSearchParams = new URLSearchParams('page=2&limit=10&sort=price')
    ;(useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      setSearchParams,
    ])

    const mockStateUpdates = { currentPage: 2, limit: 10, sort: 'price' }
    ;(urlParamsToCategoryState as jest.Mock).mockReturnValue(mockStateUpdates)

    // Act
    renderHook(() => useUrlParamSync())

    // Assert
    expect(urlParamsToCategoryState).toHaveBeenCalledWith(mockSearchParams)
    expect(updateFilters).toHaveBeenCalledWith(mockStateUpdates)
  })

  test('should sync store to URL when store state changes', () => {
    // Arrange
    const updatedParams = new URLSearchParams('page=3&limit=20')
    ;(categoryStateToUrlParams as jest.Mock).mockReturnValue(updatedParams)

    // Set up component - isInitialized will be true after first render
    const { rerender } = renderHook(() => useUrlParamSync())

    // Update mock values to trigger store changes
    mockCurrentPage = 3
    mockLimit = 20
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      updateFilters,
      currentPage: mockCurrentPage,
      limit: mockLimit,
    })

    // Act - rerender to trigger effect
    rerender()

    // Assert
    expect(categoryStateToUrlParams).toHaveBeenCalled()
    expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams), {
      replace: true,
    })
  })

  test('should not update URL if params have not changed', () => {
    // Arrange - Same params in URL and store
    mockSearchParams = new URLSearchParams('page=1&limit=5')
    ;(useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      setSearchParams,
    ])

    const mockParamsString = 'page=1&limit=5'
    ;(categoryStateToUrlParams as jest.Mock).mockImplementation(() => {
      const params = new URLSearchParams(mockParamsString)
      return params
    })

    // Act
    const { rerender } = renderHook(() => useUrlParamSync())
    rerender() // Second render to trigger effect after initialization

    // Assert
    expect(setSearchParams).not.toHaveBeenCalled()
  })

  test('should preserve non-store URL parameters', () => {
    // Arrange
    mockSearchParams = new URLSearchParams('page=1&external=value')
    ;(useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      setSearchParams,
    ])

    const updatedStoreParams = new URLSearchParams('page=2&limit=10')
    ;(categoryStateToUrlParams as jest.Mock).mockReturnValue(updatedStoreParams)

    // Set up component
    const { rerender } = renderHook(() => useUrlParamSync())

    // Update mock values to trigger store changes
    mockCurrentPage = 2
    mockLimit = 10
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      updateFilters,
      currentPage: mockCurrentPage,
      limit: mockLimit,
    })

    // Act
    rerender()

    // Assert - Should contain both store params and the external param
    expect(setSearchParams).toHaveBeenCalled()
    const calledParams = setSearchParams.mock.calls[0][0]
    expect(calledParams.get('page')).toBe('2')
    expect(calledParams.get('limit')).toBe('10')
    expect(calledParams.get('external')).toBe('value')
  })

  test('syncToUrl should manually sync store state to URL', () => {
    // Arrange
    const updatedParams = new URLSearchParams('page=5&limit=25')
    ;(categoryStateToUrlParams as jest.Mock).mockReturnValue(updatedParams)

    // Act
    const { result } = renderHook(() => useUrlParamSync())

    act(() => {
      result.current.syncToUrl()
    })

    // Assert
    expect(categoryStateToUrlParams).toHaveBeenCalled()
    expect(setSearchParams).toHaveBeenCalledWith(updatedParams, {
      replace: true,
    })
  })
})
