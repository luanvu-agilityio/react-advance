import { productData } from '@data/product-data'
import type { Product } from 'types/Product'

export const formatSubcategoryFromParam = (
  subcategoryParam: string
): string => {
  return subcategoryParam
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatCategoryPath = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export const formatSubcategoryToParam = (subcategory: string): string => {
  return subcategory.toLowerCase().replace(/\s+/g, '-')
}

export const shouldShowSearchMode = (
  pathname: string,
  categoryPath?: string
): boolean => {
  return (
    pathname === '/search-results' ||
    pathname === '/all-products' ||
    categoryPath === 'all-products' ||
    categoryPath === 'search-results'
  )
}

export const getCategoryTitle = (
  pathname: string,
  searchQuery: string,
  categoryPath?: string,
  categoryLabel?: string
): string => {
  if (pathname === '/search-results' && searchQuery) {
    return 'Search Results'
  }

  if (pathname === '/all-products' || categoryPath === 'all-products') {
    return 'All Products'
  }

<<<<<<< HEAD
  return categoryLabel ?? categoryPath ?? ''
=======
  return categoryLabel ?? ''
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}
/**
 * Finds category path for a given subcategory
 */
export const findCategoryForSubcategory = (
  subcategory: string
): string | null => {
  const product = productData.find(
    (p: Product) => p.subcategory === subcategory
  )
  return product ? product.category.toLowerCase().replace(/\s+/g, '-') : null
}
