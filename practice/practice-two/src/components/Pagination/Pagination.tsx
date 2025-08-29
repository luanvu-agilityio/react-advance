'use client'

import { useCategoryStore } from '@stores/categoryStore'
import { ProductCount } from './ProductCount/ProductCount'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  PaginationContainer,
  PageNumbersContainer,
  PageLabel,
  PageButton,
} from './PaginationStyles'
import { PageNumbers } from './PageNumber'

interface PaginationProps {
  totalPages: number
  totalProducts: number
  onPageChange: (page: number) => void
  currentPage?: number
}

export const Pagination = ({
  totalPages,
  onPageChange,
  totalProducts,
  currentPage: propCurrentPage,
}: PaginationProps) => {
  const { currentPage: storeCurrentPage } = useCategoryStore()
  const currentPage = propCurrentPage ?? storeCurrentPage

  // Generate page range for display (e.g., [1, 2, "...", 9, 10])
  const getPageRange = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => (i + 1).toString())
    }

    if (current <= 4) {
      return ['1', '2', '3', '4', '5', '...', total.toString()]
    }

    if (current >= total - 3) {
      return [
        '1',
        '...',
        (total - 4).toString(),
        (total - 3).toString(),
        (total - 2).toString(),
        (total - 1).toString(),
        total.toString(),
      ]
    }

    return [
      '1',
      '...',
      (current - 1).toString(),
      current.toString(),
      (current + 1).toString(),
      '...',
      total.toString(),
    ]
  }

  const pageNumbers = getPageRange(currentPage, totalPages)

  return (
    <PaginationContainer>
      <PageNumbersContainer>
        <PageLabel>Page</PageLabel>
        {/* Previous button */}
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronsLeft size={14} strokeWidth={3} />
        </PageButton>

        {/*  PageNumbers component */}
        <PageNumbers
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
          onClick={onPageChange}
        />

        {/* Next button */}
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <ChevronsRight size={14} strokeWidth={3} />
        </PageButton>
      </PageNumbersContainer>

      <ProductCount totalProducts={totalProducts} />
    </PaginationContainer>
  )
}
