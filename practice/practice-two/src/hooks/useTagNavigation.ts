import { useNavigate } from 'react-router-dom'
import type { ProductTag } from '@utils/tagUtils'
import { useCategoryStore } from '@stores/categoryStore'

/**
 * useTagNavigation - A custom hook for handling navigation based on product tag types
 *
 * This hook provides functionality to navigate to appropriate routes based on the type
 * of product tag (category, subcategory, brand, or product). It also updates relevant
 * filter state in the CategoryStore to ensure filter UI reflects the navigation.
 *
 * Navigation behavior by tag type:
 * - category: Navigates to the category page and sets category filter
 * - subcategory: Navigates to the parent category page and sets both category & subcategory filters
 * - brand: Navigates to all-products page and sets brand filter
 * - product: Navigates to search results page and sets search query to the tag label
 *
 * @returns {Function} navigateToTag - Function to navigate based on provided tag
 *
 * @see {@link ProductTag} for the tag structure expected by this hook
 */

export const useTagNavigation = () => {
  const navigate = useNavigate()
  const { setCategory, setSubcategory, setBrands, setSearchQuery } =
    useCategoryStore()

  const navigateToTag = (tag: ProductTag) => {
    switch (tag.type) {
      case 'category':
        navigate(`/${tag.value}`)
        setCategory(tag.value)
        break
      case 'subcategory':
        if (tag.categoryPath) {
          navigate(`/${tag.categoryPath}`)
          setCategory(tag.categoryPath)
          setSubcategory(tag.value)
        }
        break
      case 'brand':
        navigate('/all-products')
        setBrands([tag.value])
        break
      case 'product':
        navigate('/search-results')
        setSearchQuery(tag.label)
        break
      default:
        navigate('/all-products')
    }
  }

  return { navigateToTag }
}
