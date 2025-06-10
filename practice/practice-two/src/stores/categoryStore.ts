import productApi from '@services/product'
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

interface CategoryState {
  // Pagination
  currentPage: number
  limit: number
  displayLimit: number

  // Filters
  category?: string
  subcategory?: string
  selectedBrands: string[]
  selectedRatings: number[]
  priceRange: { min: number; max: number }
  searchQuery?: string

  // UI State
  viewMode: string

  //Sorting
  sortBy: string
  sortOrder: 'asc' | 'desc'
  setSortBy: (field: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void

  // Actions
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setCategory: (category?: string) => void
  setSubcategory: (subcategory?: string) => void
  setBrands: (brands: string[]) => void
  setRatings: (ratings: number[]) => void
  setPriceRange: (range: { min: number; max: number }) => void
  setSearchQuery: (query?: string) => void
  setViewMode: (mode: string) => void
  resetFilters: () => void
  resetPagination: () => void
  setDisplayLimit: (limit: number) => void

  // URL helpers
  getUrlParams: () => URLSearchParams
  setFromUrl: (searchParams: URLSearchParams) => void
  getApiParams: () => Record<string, string | number | string[] | number[]>
  getProductCountBySubcategory: (subcategory: string) => Promise<number>
}

const defaultPriceRange = { min: 0, max: 1000 }

export const useCategoryStore = create<CategoryState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      currentPage: 1,
      limit: 5,
      displayLimit: 5,
      selectedBrands: [],
      selectedRatings: [],
      priceRange: defaultPriceRange,
      viewMode: 'grid',
      sortBy: 'name',
      sortOrder: 'asc',

      // Sorting actions
      // Sort actions
      setSortBy: (field: string) => {
        set({ sortBy: field, currentPage: 1 })
      },

      setSortOrder: (order: 'asc' | 'desc') => {
        set({ sortOrder: order, currentPage: 1 })
      },

      // Pagination actions
      setPage: (page: number) => {
        set({ currentPage: Math.max(1, page) })
      },

      setLimit: (limit: number) => {
        set({ limit: Math.max(1, limit), currentPage: 1 })
      },

      // Filter actions
      setCategory: (category) => {
        set({ category, currentPage: 1 }) // Reset page when category changes
      },

      setSubcategory: (subcategory) => {
        set({ subcategory, currentPage: 1 })
      },

      setBrands: (brands) => {
        set({ selectedBrands: brands, currentPage: 1 })
      },

      setRatings: (ratings) => {
        set({ selectedRatings: ratings, currentPage: 1 })
      },

      setPriceRange: (range) => {
        set({ priceRange: range, currentPage: 1 })
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query, currentPage: 1 })
      },

      setViewMode: (mode) => {
        set({ viewMode: mode })
      },

      setDisplayLimit: (displayLimit: number) => {
        const newLimit = Math.max(1, displayLimit)
        set({
          displayLimit: newLimit,
          limit: newLimit,
          currentPage: 1,
        })
      },
      // Reset functions
      resetFilters: () => {
        set({
          selectedBrands: [],
          selectedRatings: [],
          priceRange: defaultPriceRange,
          subcategory: undefined,
          currentPage: 1,
        })
      },

      resetPagination: () => {
        set({ currentPage: 1 })
      },

      // URL management
      getUrlParams: () => {
        const state = get()
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
      },

      setFromUrl: (searchParams) => {
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('limit') || '5', 10)
        const subcategory = searchParams.get('subcategory')
        const search = searchParams.get('search')
        const sort = searchParams.get('sort') || 'name'
        const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc'

        set({
          currentPage: Math.max(1, page),
          limit: Math.max(1, limit),
          subcategory: subcategory || undefined,
          searchQuery: search || undefined,
          sortBy: sort,
          sortOrder: order as 'asc' | 'desc',
        })
      },

      // API params
      getApiParams: () => {
        const state = get()
        const params: Record<string, string | number | string[] | number[]> = {
          p: state.currentPage,
          l: state.limit,
        }
        if (state.category) params.category = state.category
        if (state.subcategory) params.subcategory = state.subcategory
        if (state.selectedBrands.length > 0)
          params.brands = state.selectedBrands
        if (state.priceRange.min > defaultPriceRange.min)
          params.minPrice = state.priceRange.min
        if (state.priceRange.max < defaultPriceRange.max)
          params.maxPrice = state.priceRange.max
        if (state.searchQuery) params.search = state.searchQuery
        if (state.selectedRatings.length > 0)
          params.ratings = state.selectedRatings

        params.sortBy = state.sortBy
        params.sortOrder = state.sortOrder
        return params
      },

      getProductCountBySubcategory: async (subcategory: string) => {
        try {
          // Make a specific API call to count products
          const response = await productApi.getProductCount({ subcategory })
          return response
        } catch (error) {
          console.error('Error getting product count:', error)
          return 0
        }
      },
    })),
    { name: 'category-store' }
  )
)
