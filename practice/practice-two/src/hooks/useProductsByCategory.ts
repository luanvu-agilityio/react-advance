import { useMemo } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { navbarData } from '@data/navbar'
import { productData } from '@data/product-data'

/**
 * useProductsByCategory - A custom hook for filtering products based on URL parameters and page context
 *
 * This hook extracts category and search information from the current URL and returns
 * filtered product data based on the application's current navigation context. It handles
 * different filtering scenarios:
 *
 * - Search results: Filters products matching the search query across multiple fields
 * - Category view: Filters products belonging to the specified category
 * - All products view: Returns all products without category filtering
 *
 * The hook automatically handles URL parameter extraction and product filtering logic,
 * providing a clean interface for components to access context-aware product data.
 *
 * @returns {Object} An object containing filtered data and context information
 * @returns {string|undefined} categoryPath - The current category path extracted from URL parameters
 * @returns {Object|undefined} currentCategory - The current category object from navigation data
 * @returns {Array} productsInCategory - Array of products filtered by current page context
 * @returns {string} searchQuery - Current search query from URL parameters
 * @returns {string} subcategoryParam - Current subcategory filter from URL parameters
 *
 */
export const useProductsByCategory = () => {
  // Extracts category path from URL parameters
  const { categoryPath } = useParams<{ categoryPath: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''

  // Find the current category object from navigation data
  const currentCategory = useMemo(
    () =>
      navbarData.find(
        (item) => item.label.toLowerCase().replace(/\s+/g, '-') === categoryPath
      ),
    [categoryPath]
  )

  // Filter products based on current page context
  const productsInCategory = useMemo(() => {
    if (location.pathname === '/search-results' && searchQuery) {
      return productData.filter((product) => {
        const query = searchQuery.toLowerCase()
        const searchableFields = [
          product.title,
          product.description,
          product.category,
          product.subcategory,
          product.brand,
          ...(product.tags ?? []),
        ].map((field) => (field ?? '').toLowerCase())

        return searchableFields.some((field) => field.includes(query))
      })
    }

    if (!categoryPath || location.pathname === '/all-products') {
      return productData
    }

    return productData.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, '-') === categoryPath
    )
  }, [categoryPath, searchQuery, location.pathname])

  return {
    categoryPath, // current category path from URL
    currentCategory, // current category object from navigation data
    productsInCategory, // Array of products filtered by current page context
    searchQuery, // Current search query from URL parameters
    subcategoryParam: searchParams.get('subcategory') ?? '', //Subcategory parameter from URL
  }
}
