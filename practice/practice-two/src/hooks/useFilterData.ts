import { useMemo } from 'react'
import type { Product } from 'types/Product'
import type { BrandProps } from '../types/Filter'
import type { Category, CurrentCategory } from 'types/Category'

interface UseFilterDataProps {
  currentCategory: CurrentCategory | null
  productsInCategory: Product[]
  activeSubcategory: string
  selectedBrands: string[]
  categoryPath: string | undefined
  isSearchMode: boolean
}

export const useFilterData = ({
  currentCategory,
  productsInCategory,
  activeSubcategory,
  selectedBrands,

  isSearchMode,
}: Omit<UseFilterDataProps, 'onCategoryClick'>) => {
  // Generate subcategory options from category structure
  const subcategories = useMemo(() => {
    if (isSearchMode) {
      // In search mode, generate categories from search results
      const categoryMap = new Map<string, number>()

      productsInCategory.forEach((product) => {
        const subcategory = product.subcategory
        categoryMap.set(subcategory, (categoryMap.get(subcategory) || 0) + 1)
      })

      return Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
        // isActive: activeSubcategory === name,
      }))
    }

    if (productsInCategory.length > 0) {
      const subcategoryMap = new Map<string, number>()

      productsInCategory.forEach((product) => {
        const subcategory = product.subcategory
        subcategoryMap.set(
          subcategory,
          (subcategoryMap.get(subcategory) || 0) + 1
        )
      })

      return Array.from(subcategoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }))
    }

    // Normal category mode
    return (
      currentCategory?.categories?.map((cat: Category) => ({
        name: cat.title,
        count: productsInCategory.filter(
          (product) => product.subcategory === cat.title
        ).length,
        // isActive: activeSubcategory === cat.title,
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
          existingBrand.count++
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
