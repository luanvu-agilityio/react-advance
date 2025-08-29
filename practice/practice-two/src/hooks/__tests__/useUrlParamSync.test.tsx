import { renderHook, act } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { useUrlParamSync } from '../useUrlParamSync'
import { useCategoryStore } from '@stores/categoryStore'

// Mock React Router
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

// Mock Zustand store
jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

describe.skip('useUrlParamSync', () => {
  // Mock URL search params
  const setSearchParams = jest.fn()
  let mockSearchParams: URLSearchParams

  // Mock store functions and state
  const setFromUrl = jest.fn()
  const getUrlParams = jest.fn()
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

    // Set up store mock
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      setFromUrl,
      getUrlParams,
      currentPage: mockCurrentPage,
      limit: mockLimit,
    })

    // Default mock implementation
    getUrlParams.mockReturnValue(new URLSearchParams())
  })

  test('should sync URL params to store on mount', () => {
    // Arrange
    mockSearchParams = new URLSearchParams('page=2&limit=10&sort=price')
    ;(useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      setSearchParams,
    ])

    // Act
    renderHook(() => useUrlParamSync())

    // Assert
    expect(setFromUrl).toHaveBeenCalledWith(mockSearchParams)
  })

  test('should sync store to URL when store state changes', () => {
    // Arrange
    const updatedParams = new URLSearchParams('page=3&limit=20')
    getUrlParams.mockReturnValue(updatedParams)

    // Set up component - isInitialized will be true after first render
    const { rerender } = renderHook(() => useUrlParamSync())

    // Update mock values to trigger store changes
    mockCurrentPage = 3
    mockLimit = 20
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      setFromUrl,
      getUrlParams,
      currentPage: mockCurrentPage,
      limit: mockLimit,
    })

    // Act - rerender to trigger effect
    rerender()

    // Assert
    expect(getUrlParams).toHaveBeenCalled()
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

    getUrlParams.mockReturnValue(new URLSearchParams('page=1&limit=5'))

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
    getUrlParams.mockReturnValue(updatedStoreParams)

    // Set up component
    const { rerender } = renderHook(() => useUrlParamSync())

    // Update mock values to trigger store changes
    mockCurrentPage = 2
    mockLimit = 10
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      setFromUrl,
      getUrlParams,
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
    getUrlParams.mockReturnValue(updatedParams)

    // Act
    const { result } = renderHook(() => useUrlParamSync())

    act(() => {
      result.current.syncToUrl()
    })

    // Assert
    expect(getUrlParams).toHaveBeenCalled()
    expect(setSearchParams).toHaveBeenCalledWith(updatedParams, {
      replace: true,
    })
  })
})
