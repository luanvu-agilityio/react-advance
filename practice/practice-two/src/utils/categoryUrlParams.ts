import type { CategoryState } from '@stores/categoryStore'
import type { SortOrder } from 'types/sort-order'

/**
 * Converts category store state to URL search parameters
 */
export const categoryStateToUrlParams = (
  state: CategoryState
): URLSearchParams => {
  const params = new URLSearchParams()

  if (state.currentPage > 1) {
    params.set('page', state.currentPage.toString())
  }

  // Always include limit in URL params
  params.set('limit', state.limit.toString())

  if (state.subcategory) {
    params.set(
      'subcategory',
      state.subcategory.toLowerCase().replace(/\s+/g, '-')
    )
  }

  if (state.searchQuery) {
    params.set('search', state.searchQuery)
  }

  params.set('sort', state.sortBy)
  params.set('order', state.sortOrder)

  return params
}

/**
 * Converts URL search parameters to category store state updates
 */
export const urlParamsToCategoryState = (
  searchParams: URLSearchParams
): Partial<CategoryState> => {
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '5', 10)
  const subcategory = searchParams.get('subcategory')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'name'
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc'

  return {
    currentPage: Math.max(1, page),
    limit: Math.max(1, limit),
    subcategory: subcategory || undefined,
    searchQuery: search || undefined,
    sortBy: sort,
    sortOrder: order as SortOrder,
  }
}
