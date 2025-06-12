import { useMemo } from 'react'
import type { Product } from 'types/Product'
import type { BrandProps } from '../types/Filter'
import type { Category, CurrentCategory } from 'types/Category'

/**
 * useFilterOptions - A custom hook for generating dynamic filter options based on product data
 *
 * This hook analyzes the provided product data and category context to generate
 * structured filter options for subcategories and brands.
 *
 * Key features:
 * - Generates subcategory filters with product counts
 * - Creates brand filters with product counts and selected states
 * - Adapts filter options based on the current view context
 *
 * @param {CurrentCategory|null} options.currentCategory - Current category data with subcategories
 * @param {Product[]} options.productsInCategory - Array of products in the current context
 * @param {string} options.activeSubcategory - Currently selected subcategory
 * @param {string[]} options.selectedBrands - Array of selected brand names
 * @param {string|undefined} options.categoryPath - Path of the current category
 * @param {boolean} options.isSearchMode - Whether filters are being generated for search results
 *
 * @returns {Object} Filter options for rendering UI components
 * @returns {Array<{name: string, count: number}>} subcategories - Available subcategory filters with product counts
 * @returns {Array<{name: string, selected: boolean, count: number}>} categoryBrands - Available brand filters with counts and selection state
 *
 */
interface UseFilterOptionsProps {
  currentCategory: CurrentCategory | null
  productsInCategory: Product[]
  activeSubcategory: string
  selectedBrands: string[]
  categoryPath: string | undefined
  isSearchMode: boolean
}

export const useFilterOptions = ({
  currentCategory,
  productsInCategory,
  activeSubcategory,
  selectedBrands,
  isSearchMode,
}: Omit<UseFilterOptionsProps, 'onCategoryClick'>) => {
  // Generate subcategory options from category structure
  const subcategories = useMemo(() => {
    // Helper function to count subcategories from products
    const getSubcategoryCountsFromProducts = (products: Product[]) => {
      const subcategoryMap = new Map<string, number>()

      products.forEach((product) => {
        const subcategory = product.subcategory
        subcategoryMap.set(
          subcategory,
          (subcategoryMap.get(subcategory) ?? 0) + 1
        )
      })

      return Array.from(subcategoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }))
    }

    // For search mode or when we have products, use dynamic counts
    if (isSearchMode || productsInCategory.length > 0) {
      return getSubcategoryCountsFromProducts(productsInCategory)
    }

    // Normal category mode (when no products loaded yet)
    return (
      currentCategory?.categories?.map((cat: Category) => ({
        name: cat.title,
        count: productsInCategory.filter(
          (product) => product.subcategory === cat.title
        ).length,
      })) ?? []
    )
  }, [currentCategory, productsInCategory, isSearchMode])

  // Generate brand options based on available products
  const categoryBrands = useMemo(() => {
    // Filter products by subcategory if one is active
    const relevantProducts = activeSubcategory
      ? productsInCategory.filter(
          (product) => product.subcategory === activeSubcategory
        )
      : productsInCategory

    // Aggregate brands with counts from relevant products
    const brandsInCategory = relevantProducts.reduce<BrandProps[]>(
      (acc, product) => {
        const existingBrand = acc.find((b) => b.name === product.brand)
        if (existingBrand) {
          existingBrand.count = (existingBrand.count ?? 0) + 1
        } else {
          acc.push({
            name: product.brand,
            selected: selectedBrands.includes(product.brand),
            count: 1,
          })
        }
        return acc
      },
      []
    )

    return brandsInCategory
  }, [productsInCategory, activeSubcategory, selectedBrands])

  return { subcategories, categoryBrands }
}
