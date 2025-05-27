import type { Product } from 'types/Product'
import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'https://6830140df504aa3c70f63355.mockapi.io'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
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
}

class ProductApiError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ProductApiError'
  }
}

const productApi = {
  getProducts: async (
    params: ProductApiParams
  ): Promise<PaginatedResponse<Product>> => {
    try {
      // Convert params to the format MockAPI expects
      const queryParams: Record<string, string> = {
        page: params.page?.toString() ?? '1',
        limit: params.limit?.toString() ?? '9',
      }

      // Add search param if provided (title)
      if (params.search) {
        queryParams.title = `${params.search}`
      }

      // Add category filter if provided
      if (params.category) {
        // Convert from path format to display format
        const formattedCategory = params.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        queryParams.category = formattedCategory
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: queryParams,
        signal: controller.signal,
        timeout: 10000,
      })

      clearTimeout(timeoutId)

      // Get the total count from headers or make a separate count request
      const totalCount = parseInt(response.headers['x-total-count'] ?? '0', 10)

      return {
        data: response.data,
        total: totalCount ?? response.data.length,
        page: params.page ?? 1,
        limit: params.limit ?? 9,
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new ProductApiError('Request was cancelled due to timeout')
      }

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
          case 429:
            throw new ProductApiError(
              'Too many requests. Please wait and try again.',
              429
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
}

export default productApi
