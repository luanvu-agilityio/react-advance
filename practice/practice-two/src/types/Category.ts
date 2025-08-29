import type { BrandProps } from './Filter'
import type { Product } from './Product'
import type { ReactNode } from 'react'

export interface Category {
  title: string
}

export interface CurrentCategory {
  categories: Category[]
}

export interface CategoryPageHeaderProps {
  title: string
  productCount: number | ReactNode
  viewMode: string
  onViewModeChange: (value: string) => void
}

export interface ViewModeOptionProps {
  value: string
  label: string
  icon: string
  viewMode: string
}

export interface NoResultsSectionProps {
  searchQuery: string | null
  onResetFilters: () => void
}

export interface CategoryPageState {
  viewMode: string
  categoryTitle: string
  activeSubcategory: string
  selectedBrands: string[]
  isSearchMode: boolean
  selectedRatings: number[]
  priceRange: { min: number; max: number }
  isLoading: boolean
  currentPage: number
  totalProducts: number
  apiProducts: Product[]
  error: string | null
  isPending: boolean
}

export interface FilterData {
  subcategories: Array<{
    name: string
    count: number
    onClick: () => void
    isActive: boolean
  }>
  categoryBrands: BrandProps[]
}
