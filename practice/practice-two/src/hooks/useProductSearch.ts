import { useMemo } from 'react'
import type { Product } from 'types/Product'
import { productData } from '@data/product-data'

/**
 * Custom hook for searching and filtering products
 * Memoizes results to prevent expensive filtering on every render
 *
 * @param query - Search text to filter products by title
 * @param category - Category to filter products by (or 'all')
 * @returns Array of filtered products
 */
export const useProductSearch = (query: string, category: string) => {
  return useMemo(() => {
    // Return empty array when query is empty
    if (!query) return []

    // Filter products that match both query and category
    return productData.filter((product: Product) => {
      const matchesQuery = product.title
        .toLowerCase()
        .includes(query.toLowerCase())

      const matchesCategory =
        category === 'all' ||
        product.category.toLowerCase().replace(/\s+/g, '-') === category

      return matchesQuery && matchesCategory
    })
  }, [query, category])
}
