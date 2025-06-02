import type { Product } from './Product'

export interface ProductListingProps {
  products: Product[]
  viewMode: string
  currentPage?: number
  totalProducts?: number
  productsPerPage?: number
  onPageChange?: (page: number) => void
}

export interface PageNumbersProps {
  currentPage: number
  totalPages: number
  pageNumbers: (number | string)[]
  onPageClick: (page: number) => void
  disabled?: boolean
}

export interface ShowMoreProps {
  currentPage: number
  totalPages: number
  onShowMore: () => void
}

export interface ProductCountProps {
  totalProducts: number
}
