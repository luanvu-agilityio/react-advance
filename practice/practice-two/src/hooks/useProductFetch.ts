import { useQuery } from '@tanstack/react-query'
import { useCategoryStore } from '@stores/categoryStore'
import productApi, { type PaginatedResponse } from '@services/product'
import type { Product } from 'types/Product'

/**
 * useProductFetch - A custom hook for fetching paginated product data with filter parameters
 *
 * This hook integrates with the category store to retrieve the current filter parameters
 * and uses React Query to fetch product data from the API. It automatically handles
 * caching, refetching, and pagination based on the current application state.
 *
 * @param {boolean} [enabled=true] - Controls whether the query should automatically run.
 *                                  Set to false to disable automatic fetching.
 *
 * @returns {UseQueryResult<PaginatedResponse<Product>>} Query result object containing:
 *   - data: Paginated product data if successful
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error information if the request failed
 */

export const useProductFetch = (enabled: boolean = true) => {
  const { getApiParams } = useCategoryStore()

  const apiParams = getApiParams()

  return useQuery({
    queryKey: ['products', apiParams],
    queryFn: () => productApi.getProducts(apiParams),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    select: (data: PaginatedResponse<Product>) => {
      return data
    },
  })
}
