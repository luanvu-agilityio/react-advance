import { useQuery } from '@tanstack/react-query'
import productApi from '@services/product'

/**
 * Product data fetching hooks
 *
 * This file provides a collection of hooks for fetching different types of product data
 * using React Query.
 */

/**
 * useProductDetails - Hook for fetching detailed information about a specific product
 *
 * Retrieves data for a single product by its ID. The data is cached
 * for 5 minutes to reduce unnecessary network requests while maintaining reasonable
 * data freshness.
 *
 * @param {string | undefined} productId - The ID of the product to fetch
 * @returns {UseQueryResult} Query result object containing:
 *   - data: The product details if successful
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error information if the request failed
 *   - other standard React Query result properties
 */

export const useProductDetails = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(Number(productId) || 0),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * useProductTabData - Hook for fetching tab-specific content for a product
 *
 * Retrieves information displayed in product detail tabs, such as
 * specifications, reviews, etc. Data is cached for 10 minutes as this content
 * changes less frequently than core product data.
 *
 * @param {number | undefined} productId - The ID of the product to fetch tab data for
 * @returns {UseQueryResult} Query result object containing:
 *   - data: The product tab data if successful
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error information if the request failed
 *   - other standard React Query result properties
 */
export const useProductTabData = (productId: number | undefined) => {
  return useQuery({
    queryKey: ['productTabs', productId],
    queryFn: () => productApi.getTabDataByProductId(productId || 0),
    enabled: productId !== undefined,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * useRelatedProducts - Hook for fetching products related to a specific product
 *
 * Retrieves a list of products that are related to the specified product, typically
 * from the same subcategory. Data is cached for 5 minutes.
 *
 * @param {number | undefined} productId - The ID of the reference product
 * @param {string | undefined} subcategory - The subcategory to find related products from
 * @returns {UseQueryResult} Query result object containing:
 *   - data: Array of related products if successful
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error information if the request failed
 *   - other standard React Query result properties
 */
export const useRelatedProducts = (
  productId: number | undefined,
  subcategory: string | undefined
) => {
  return useQuery({
    queryKey: ['relatedProducts', subcategory, productId],
    queryFn: () =>
      productApi.getRelatedProducts(productId ?? 0, subcategory ?? ''),
    enabled: !!productId && !!subcategory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
