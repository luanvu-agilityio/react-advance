import type { Product } from 'types/Product'
import axios, { AxiosError } from 'axios'
import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'https://6830140df504aa3c70f63355.mockapi.io'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductApiParams {
  page?: number
  limit?: number
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

// Cache for total counts to maintain consistency
const totalCountCache = new Map<string, number>()

const productApi = {
  getProducts: async (
    params: ProductApiParams = {}
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const page = params.page ?? 1
      const limit = params.limit ?? 10

      // Create cache key for this filter combination
      const cacheKey = JSON.stringify({
        category: params.category,
        subcategory: params.subcategory,
        search: params.search,
        brands: params.brands,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
      })

      // Build query parameters for MockAPI
      const queryParams: Record<string, string> = {
        p: page.toString(),
        l: limit.toString(),
      }

      // Add filters
      if (params.search) {
        queryParams.search = params.search
      }

      if (params.category) {
        const formattedCategory = params.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        queryParams.category = formattedCategory
      }

      if (params.subcategory) {
        const formattedSubcategory = params.subcategory
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        queryParams.subcategory = formattedSubcategory
      }

      if (params.brands && params.brands.length > 0) {
        queryParams.brand = params.brands[0]
      }

      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: queryParams,
        timeout: 15000,
      })

      const dataLength = response.data.length

      // Try to get total from header first
      let totalCount = 0
      const headerTotalCount = response.headers['x-total-count']
      if (headerTotalCount) {
        totalCount = parseInt(headerTotalCount, 10)
        totalCountCache.set(cacheKey, totalCount)
      } else {
        // Use cached total if available
        const cachedTotal = totalCountCache.get(cacheKey)
        if (cachedTotal !== undefined) {
          totalCount = cachedTotal
        } else {
          // Calculate total based on current data
          if (dataLength < limit) {
            // Not a full page - we know exactly how many items
            totalCount = (page - 1) * limit + dataLength
          } else if (page === 1) {
            // First page is full - check next page only if necessary
            const estimatedTotal = await checkNextPageExists(queryParams, limit)
            totalCount = estimatedTotal
          } else {
            // Later pages and full - we know there are at least this many items
            totalCount = page * limit
          }

          // Save to cache for future use
          totalCountCache.set(cacheKey, totalCount)
        }
      }

      // Helper function to check next page
      async function checkNextPageExists(
        queryParams: Record<string, string>,
        limit: number
      ): Promise<number> {
        try {
          const nextPageCheck = await axios.get(`${API_BASE_URL}/products`, {
            params: { ...queryParams, p: 2, l: 1 },
            timeout: 5000,
          })

          return nextPageCheck.data?.length > 0 ? limit + 1 : limit
        } catch (err) {
          console.log(
            'Error checking next page, assuming only current page',
            err
          )
          return limit
        }
      }

      const totalPages = Math.max(1, Math.ceil(totalCount / limit))

      const sortData = (data: Product[]) => {
        if (!params.sortBy || params.sortBy === 'default') return data

        const order = params.sortOrder === 'desc' ? -1 : 1

        return [...data].sort((a, b) => {
          switch (params.sortBy) {
            case 'price':
              return (a.price - b.price) * order
            case 'name':
              return a.title.localeCompare(b.title) * order
            case 'rating':
              return (a.rating - b.rating) * order

            default:
              return 0
          }
        })
      }

      response.data = sortData(response.data)
      return {
        data: response.data,
        total: totalCount,
        page,
        limit,
        totalPages,
      }
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status
        const message = error.response?.data?.message ?? error.message

        switch (statusCode) {
          case 404:
            throw new ProductApiError('Products not found', 404)
          case 500:
            throw new ProductApiError(
              'Server error. Please try again later.',
              500
            )
          default:
            throw new ProductApiError(`Network error: ${message}`, statusCode)
        }
      }

      throw new ProductApiError(
        'An unexpected error occurred. Please try again.'
      )
    }
  },

  // Get first page to determine total count
  getProductCount: async (
    params: Omit<ProductApiParams, 'page' | 'limit'>
  ): Promise<number> => {
    try {
      const response = await productApi.getProducts({
        ...params,
        page: 1,
        limit: 1,
      })
      return response.total
    } catch (error) {
      console.error('Error getting product count:', error)
      return 0
    }
  },

  // Clear cache when needed
  clearCache: () => {
    totalCountCache.clear()
  },
}

export default productApi
