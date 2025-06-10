import { useMemo } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { navbarData } from '@data/navbar'
import { productData } from '@data/product-data'

/**
 * Main hook function that orchestrates URL data extraction and product filtering
 * @returns Object containing all category-related data and filtered products
 */
export const useProductsByCategory = () => {
  /**
   * Extracts category path from URL parameters
   */
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
