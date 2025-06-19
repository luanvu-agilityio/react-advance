import type { SortOrder } from 'types/sort-order'
import { create } from 'zustand'

export interface CategoryState {
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
  sortOrder: SortOrder

  // Actions
  setSortBy: (field: string) => void
  setSortOrder: (order: SortOrder) => void
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
  updateFilters: (updates: Partial<CategoryState>) => void
}

const defaultPriceRange = { min: 0, max: 1000 }

export const useCategoryStore = create<CategoryState>()((set) => ({
  // Initial state
  currentPage: 1,
  limit: 5,
  displayLimit: 5,
  selectedBrands: [],
  selectedRatings: [],
  priceRange: defaultPriceRange,
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc' as SortOrder,

  // Sorting actions
  // Sort actions
  setSortBy: (field: string) => {
    set({ sortBy: field, currentPage: 1 })
  },

  setSortOrder: (order: SortOrder) => {
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

  updateFilters: (updates: Partial<CategoryState>) => {
    set({
      ...updates,
      currentPage: 1, // Reset page with any filter change
    })
  },
}))
