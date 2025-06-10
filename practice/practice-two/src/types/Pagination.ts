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
<<<<<<< HEAD
  onClick: (page: number) => void
=======
  onPageClick: (page: number) => void
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
