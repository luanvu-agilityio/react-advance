import type { Product } from 'types/Product'
import axios from 'axios'

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

const productApi = {
  getProducts: async (
    params: ProductApiParams
  ): Promise<PaginatedResponse<Product>> => {
    try {
      // Convert params to the format MockAPI expects
      const queryParams: Record<string, string> = {
        page: params.page?.toString() || '1',
        limit: params.limit?.toString() || '9',
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

      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: queryParams,
      })

      // Get the total count from headers or make a separate count request
      const totalCount = parseInt(response.headers['x-total-count'] ?? '0', 10)

      return {
        data: response.data,
        total: totalCount ?? response.data.length,
        page: params.page ?? 1,
        limit: params.limit ?? 9,
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },
}

export default productApi
