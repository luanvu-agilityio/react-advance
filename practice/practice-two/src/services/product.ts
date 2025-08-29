/**
 * Product Service API
 *
 * This module provides a comprehensive interface for interacting with the product API.
 * It includes methods for fetching, filtering, sorting, and counting products,
 * along with error handling and caching mechanisms.
 *
 * The service handles both server-side and client-side filtering to accommodate
 * complex query requirements while optimizing API calls through caching.
 *
 * @module services/product
 */

import type { Product } from 'types/Product'
import axios, { AxiosError } from 'axios'
import { productData } from '@data/product-data'
import { getTabDataByProductId } from '@data/tab-data'
import type { TabData } from 'types/tab-data'
import type { SortOrder } from 'types/sort-order'

// Base URL for the product API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://6830140df504aa3c70f63355.mockapi.io'

/**
 * Standard response format for paginated data
 */
export interface PaginatedResponse<T> {
  data: T[] // The actual data items
  total: number // Total count of items across all pages
  page: number // Current page number
  limit: number // Items per page
  totalPages: number // Total number of pages
}

/**
 * Parameters for filtering and paginating product API requests
 */
export interface ProductApiParams {
  p?: number // Page number
  l?: number // Limit (items per page)
  category?: string // Product category filter
  subcategory?: string // Product subcategory filter
  brands?: string[] // Brand filter (multiple)
  minPrice?: number // Minimum price filter
  maxPrice?: number // Maximum price filter
  ratings?: number[] // Rating filter (multiple values)
  search?: string // Search term
  sortBy?: string // Field to sort by
  sortOrder?: SortOrder // Sort direction
  section?: 'best-selling' | 'featured'
}

/**
 * Custom error class for product API errors with status code support
 */
class ProductApiError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ProductApiError'
  }
}
const countCache = new Map<string, number>()
const productApi = {
  /**
   * Fetches products with pagination and filtering
   *
   * This method handles the main product listing functionality, supporting:
   * - Pagination with page number and limit
   * - Category and subcategory filtering
   * - Price range filtering
   * - Brand filtering
   * - Rating filtering
   * - Text search
   * - Sorting by various fields
   *
   * @param params - Filter and pagination parameters
   * @returns Promise containing paginated product response
   */
  getProducts: async (
    params: ProductApiParams = {}
  ): Promise<PaginatedResponse<Product>> => {
    try {
      // Default to page 1 with 10 items if not specified
      const page = params.p ?? 1
      const limit = params.l ?? 10

      // Convert API parameters to query string format
      const queryParams: Record<string, string> = {
        p: page.toString(),
        l: limit.toString(),
      }

      // Handle sorting
      if (params.sortBy) {
        queryParams.sortby = params.sortBy
        queryParams.order = params.sortOrder || 'asc'
      }

      // Convert category/subcategory from kebab-case to Title Case for API
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

      // Handle server-side filtering for single brand
      if (params.brands?.length === 1) {
        queryParams.brand = params.brands[0]
      }

      // Handle server-side filtering for single rating
      if (params.ratings?.length === 1) {
        queryParams.rating = params.ratings[0].toString()
      }

      // Create URL with query parameters
      const url = new URL(`${API_BASE_URL}/products`)

      // Add all query parameters to the URL
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })

      // Make the API request with the properly formatted URL
      const response = await axios.get(url.toString(), {
        timeout: 10000,
      })

      // Apply client-side filters
      let filteredData = response.data

      // Apply price filters client-side
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

      // Handle multiple brands client-side if more than one selected
      if (params.brands !== undefined && params.brands.length > 1) {
        filteredData = filteredData.filter((product: Product) =>
          params.brands!.includes(product.brand)
        )
      }

      // Handle multiple ratings client-side if more than one selected
      if (params.ratings !== undefined && params.ratings.length > 1) {
        filteredData = filteredData.filter((product: Product) =>
          params.ratings!.includes(product.rating)
        )
      }

      let totalCount = 0
      const headerTotal = response.headers['x-total-count']
      if (headerTotal) {
        // Use header total if available
        totalCount = parseInt(headerTotal, 10)
      } else {
        // Otherwise use cache or make a separate request
        const cacheKey = JSON.stringify({
          category: params.category,
          subcategory: params.subcategory,
          search: params.search,
          brands: params.brands,
        })

        if (countCache.has(cacheKey)) {
          // Use cached count if available
          totalCount = countCache.get(cacheKey)!
        } else {
          // Otherwise fetch the count and cache it
          try {
            const countParams = { ...params }
            delete countParams.p
            delete countParams.l

            const count = await productApi.getProductCount(countParams)
            totalCount = count

            // Store in cache for future use
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

      // Calculate total pages based on count and limit
      const totalPages = Math.max(1, Math.ceil(totalCount / limit))

      // Return the paginated response with filtered data
      return {
        data: filteredData,
        total: totalCount,
        page,
        limit,
        totalPages,
      }
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Fetches a single product by ID
   *
   * @param id - The product ID to fetch
   * @returns Promise containing the product details
   * @throws Error if product not found
   */
  getProductById: async (id: number): Promise<Product> => {
    if (!id) throw new Error('Product ID is required')

    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
        timeout: 10000,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`Product with ID ${id} not found`)
      }
      throw error
    }
  },

  /**
   * Fetches additional tab data for product details page
   *
   * @param id - Product ID to fetch tab data for
   * @returns Promise containing tab data (description, specs, reviews)
   */
  getTabDataByProductId: async (id: number): Promise<TabData> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const tabData = getTabDataByProductId(id)
    return { id, ...tabData }
  },

  /**
   * Fetches products related to a specific product
   *
   * @param productId - ID of the reference product
   * @param subcategory - Subcategory to filter related products
   * @returns Promise containing array of related products (max 4)
   */
  getRelatedProducts: async (
    productId: number,
    subcategory: string
  ): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Find products in the same subcategory, excluding the current product
    return productData
      .filter((p) => p.subcategory === subcategory && p.id !== productId)
      .slice(0, 4)
  },

  /**
   * Gets count of products matching specific filters
   *
   * @param params - Filter parameters (excludes pagination and sorting)
   * @returns Promise containing the count of matching products
   */
  getProductCount: async (
    params: Omit<ProductApiParams, 'page' | 'limit' | 'sortBy' | 'sortOrder'>
  ): Promise<number> => {
    try {
      // Build query parameters for the count request
      const queryParams: Record<string, string> = {}

      // Convert category/subcategory from kebab-case to Title Case
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

      // Add search and brand filters
      if (params.search) queryParams.search = params.search
      if (params.brands?.length) queryParams.brand = params.brands[0]

      // Fetch all matching products without pagination to get the count
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
  /**
   * Clears the product count cache
   * Call this when product data might have changed
   */
  clearCache: () => {
    countCache.clear()
  },
}

/**
 * Gets product count for a specific subcategory
 */
const subcategoryCountPromiseCache = new Map<string, Promise<number>>()

export const getProductCountBySubcategory = (
  subcategory: string
): Promise<number> => {
  if (subcategoryCountPromiseCache.has(subcategory)) {
    return subcategoryCountPromiseCache.get(subcategory)!
  }
  const promise = productApi.getProductCount({ subcategory })
  subcategoryCountPromiseCache.set(subcategory, promise)
  return promise
}

/**
 * Sorts an array of products based on specified criteria
 *
 * @param products - Array of products to sort
 * @param sortBy - Field to sort by (price, name, rating)
 * @param sortOrder - Sort direction (asc or desc)
 * @returns Sorted array of products
 */

/**
 * Handles API errors and provides consistent error messaging
 *
 * @param error - The error object from the API call
 * @throws ProductApiError with appropriate message and status code
 */
function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status
    const message = error.response?.data?.message ?? error.message

    // Handle specific HTTP error codes
    switch (statusCode) {
      case 404:
        throw new ProductApiError('Products not found', 404)
      case 500:
        throw new ProductApiError('Server error. Please try again later.', 500)
      default:
        throw new ProductApiError(`Network error: ${message}`, statusCode)
    }
  }

  // Handle non-Axios errors
  throw new ProductApiError('An unexpected error occurred. Please try again.')
}

const sectionProductsPromiseCache = new Map<string, Promise<Product[]>>()

export const fetchSectionProducts = (
  section: 'best-selling' | 'featured',
  maxItems: number
): Promise<Product[]> => {
  const cacheKey = `${section}:${maxItems}`
  if (sectionProductsPromiseCache.has(cacheKey)) {
    return sectionProductsPromiseCache.get(cacheKey)!
  }
  const promise = productApi
    .getProducts({ section, l: maxItems })
    .then((res) => res.data)
  sectionProductsPromiseCache.set(cacheKey, promise)
  return promise
}
export default productApi
