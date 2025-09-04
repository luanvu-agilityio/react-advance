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
 * @param {string | undefined} productId - The ID of the product to fetch
 */
export const useProductDetails = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(Number(productId) || 0),
    enabled: !!productId && !isNaN(Number(productId)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  })
}

/**
 * useProductTabData - Hook for fetching tab-specific content for a product
 *
 * @param {number | undefined} productId - The ID of the product to fetch tab data for
 */
export const useProductTabData = (productId: number | undefined) => {
  return useQuery({
    queryKey: ['productTabData', productId], // Changed to match your ProductDetails component
    queryFn: () => productApi.getTabDataByProductId(productId || 0),
    enabled: productId !== undefined && productId > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

/**
 * useRelatedProducts - Hook for fetching products related to a specific product
 *
 * @param {number | undefined} productId - The ID of the reference product
 * @param {string | undefined} subcategory - The subcategory to find related products from
 */
export const useRelatedProducts = (
  productId: number | undefined,
  subcategory: string | undefined
) => {
  return useQuery({
    queryKey: ['relatedProducts', productId, subcategory], // Reordered for consistency
    queryFn: () =>
      productApi.getRelatedProducts(productId ?? 0, subcategory ?? ''),
    enabled: !!productId && !!subcategory && productId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
