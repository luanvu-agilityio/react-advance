import type { Product } from 'types/Product'
import axios, { AxiosError } from 'axios'
import { productData } from '@data/product-data'
import { getTabDataByProductId } from '@data/tab-data'
import type { TabData } from 'types/tab-data'

const API_BASE_URL = 'https://6830140df504aa3c70f63355.mockapi.io'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductApiParams {
  p?: number
  l?: number
  category?: string
  subcategory?: string
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  ratings?: number[]
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

class ProductApiError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ProductApiError'
  }
}

// Simple cache for product counts by filter combination
const countCache = new Map<string, number>()

const productApi = {
  getProducts: async (
    params: ProductApiParams = {}
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const page = params.p ?? 1
      const limit = params.l ?? 10

      // Build query parameters
      const queryParams: Record<string, string> = {
        p: page.toString(),
        l: limit.toString(),
      }

      // Add category filters (converting from kebab-case to Title Case)
      if (params.category) {
        queryParams.category = params.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      if (params.subcategory) {
        queryParams.subcategory = params.subcategory
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      // Add other filters
      if (params.search) queryParams.search = params.search
      if (params.brands?.length) queryParams.brand = params.brands[0]

      if (params.ratings?.length) {
        queryParams.rating = Math.min(...params.ratings).toString()
      }

      // Fetch the products
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: queryParams,
        timeout: 10000,
      })

      // Apply client-side filters
      let filteredData = response.data

      // Client-side price filter
      if (params.minPrice !== undefined) {
        filteredData = filteredData.filter(
          (product: Product) => product.price >= params.minPrice!
        )
      }

      if (params.maxPrice !== undefined) {
        filteredData = filteredData.filter(
          (product: Product) => product.price <= params.maxPrice!
        )
      }

      let totalCount = 0
      const headerTotal = response.headers['x-total-count']
      if (headerTotal) {
        totalCount = parseInt(headerTotal, 10)
      } else {
        // If no header, use cache or make a separate count request
        const cacheKey = JSON.stringify({
          category: params.category,
          subcategory: params.subcategory,
          search: params.search,
          brands: params.brands,
        })

        if (countCache.has(cacheKey)) {
          totalCount = countCache.get(cacheKey)!
        } else {
          // Make a separate API call to get the total count without pagination
          try {
            // Clone params but remove pagination params
            const countParams = { ...params }
            delete countParams.p
            delete countParams.l

            const count = await productApi.getProductCount(countParams)
            totalCount = count

            // Cache for future use
            countCache.set(cacheKey, count)
          } catch (error) {
            console.error(
              'Failed to get total count, using filtered data length',
              error
            )
            totalCount = filteredData.length
          }
        }
      }

      // Calculate total pages based on the actual total count
      const totalPages = Math.max(1, Math.ceil(totalCount / limit))

      return {
        data: sortProducts(filteredData, params.sortBy, params.sortOrder),
        total: totalCount, // Use the actual total here
        page,
        limit,
        totalPages,
      }
    } catch (error) {
      handleApiError(error)
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    if (!id) throw new Error('Product ID is required')

    // Initially, use the mock data - replace with real API call later
    const product = productData.find((p) => p.id === Number(id))
    if (!product) throw new Error(`Product with ID ${id} not found`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return product
  },

  getTabDataByProductId: async (id: number): Promise<TabData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))
    const tabData = getTabDataByProductId(id)
    return { id, ...tabData }
  },

  getRelatedProducts: async (
    productId: number,
    subcategory: string
  ): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return productData
      .filter((p) => p.subcategory === subcategory && p.id !== productId)
      .slice(0, 4)
  },

  // Get product counts
  getProductCount: async (
    params: Omit<ProductApiParams, 'page' | 'limit' | 'sortBy' | 'sortOrder'>
  ): Promise<number> => {
    try {
      // Build query for count endpoint
      const queryParams: Record<string, string> = {}

      if (params.category) {
        queryParams.category = params.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      if (params.subcategory) {
        queryParams.subcategory = params.subcategory
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      if (params.search) queryParams.search = params.search
      if (params.brands?.length) queryParams.brand = params.brands[0]

      // If count endpoint failed or returned invalid data, calculate count client-side
      const fallbackResponse = await axios.get(`${API_BASE_URL}/products`, {
        params: queryParams,
        timeout: 5000,
      })
      return fallbackResponse.data.length
    } catch (error) {
      console.error('Error getting product count:', error)
      return 0
    }
  },
  clearCache: () => {
    countCache.clear()
  },
}

// Helper function to sort products
function sortProducts(
  products: Product[],
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): Product[] {
  if (!sortBy || sortBy === 'default') return products

  const direction = sortOrder === 'desc' ? -1 : 1

  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.price - b.price) * direction
      case 'name':
        return a.title.localeCompare(b.title) * direction
      case 'rating':
        return (a.rating - b.rating) * direction
      default:
        return 0
    }
  })
}

// Helper function to handle API errors
function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status
    const message = error.response?.data?.message ?? error.message

    switch (statusCode) {
      case 404:
        throw new ProductApiError('Products not found', 404)
      case 500:
        throw new ProductApiError('Server error. Please try again later.', 500)
      default:
        throw new ProductApiError(`Network error: ${message}`, statusCode)
    }
  }

  throw new ProductApiError('An unexpected error occurred. Please try again.')
}

export default productApi
