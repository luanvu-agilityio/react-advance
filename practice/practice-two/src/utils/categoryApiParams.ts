import type { CategoryState } from '@stores/categoryStore'

const defaultPriceRange = { min: 0, max: 1000 }

/**
 * Converts category store state to API request parameters
 */
export const categoryStateToApiParams = (
  state: CategoryState
): Record<string, string | number | string[] | number[]> => {
  const params: Record<string, string | number | string[] | number[]> = {
    p: state.currentPage,
    l: state.limit,
  }

  if (state.category) params.category = state.category
  if (state.subcategory) params.subcategory = state.subcategory
  if (state.selectedBrands.length > 0) params.brands = state.selectedBrands
  if (state.priceRange.min > defaultPriceRange.min)
    params.minPrice = state.priceRange.min
  if (state.priceRange.max < defaultPriceRange.max)
    params.maxPrice = state.priceRange.max
  if (state.searchQuery) params.search = state.searchQuery
  if (state.selectedRatings.length > 0) params.ratings = state.selectedRatings

  params.sortBy = state.sortBy
  params.sortOrder = state.sortOrder
  return params
}
