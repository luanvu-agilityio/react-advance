import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProductFetch } from '../useProductFetch'
import { useCategoryStore } from '@stores/categoryStore'
import productApi from '@services/product'
import { type ReactNode } from 'react'

// Mock dependencies
jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

jest.mock('@services/product', () => ({
  __esModule: true,
  default: {
    getProducts: jest.fn(),
  },
}))

describe('useProductFetch', () => {
  // Create a fresh QueryClient for each test
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Turn off retries to simplify testing
          retry: false,
        },
      },
    })

    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation for categoryStore
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      getApiParams: jest.fn().mockReturnValue({
        p: 1,
        l: 10,
        category: 'electronics',
      }),
    })

    // Mock successful API response
    ;(productApi.getProducts as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, title: 'iPhone', price: 999 },
        { id: 2, title: 'MacBook', price: 1299 },
      ],
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    })
  })

  test('should fetch products with correct parameters', async () => {
    // Arrange
    const mockParams = { p: 2, l: 5, category: 'electronics' }
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      getApiParams: jest.fn().mockReturnValue(mockParams),
    })

    // Act
    const { result } = renderHook(() => useProductFetch(), {
      wrapper: createWrapper(),
    })

    // Assert - initially in loading state
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // Verify API was called with correct parameters
    expect(productApi.getProducts).toHaveBeenCalledWith(mockParams)
    expect(productApi.getProducts).toHaveBeenCalledTimes(1)
  })

  test('should return data from the API', async () => {
    // Arrange
    const mockData = {
      data: [{ id: 1, title: 'Test Product', price: 99 }],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    }

    ;(productApi.getProducts as jest.Mock).mockResolvedValue(mockData)

    // Act
    const { result } = renderHook(() => useProductFetch(), {
      wrapper: createWrapper(),
    })

    // Assert - wait for successful fetch
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // Check the returned data matches the mock
    expect(result.current.data).toEqual(mockData)
  })

  test('should handle API errors', async () => {
    // Arrange
    const error = new Error('API Error')
    ;(productApi.getProducts as jest.Mock).mockRejectedValue(error)

    // Act
    const { result } = renderHook(() => useProductFetch(), {
      wrapper: createWrapper(),
    })

    // Assert - wait for error state
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  test('should not fetch when enabled is false', async () => {
    // Act
    renderHook(() => useProductFetch(false), {
      wrapper: createWrapper(),
    })

    // Assert - API should not be called
    await waitFor(() => {
      expect(productApi.getProducts).not.toHaveBeenCalled()
    })
  })
})
