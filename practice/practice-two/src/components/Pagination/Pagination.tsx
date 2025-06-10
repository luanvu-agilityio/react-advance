import { useCategoryStore } from '@stores/categoryStore'
<<<<<<< HEAD
import { ProductCount } from './ProductCount/ProductCount'
=======
import { ProductCount } from './ProductCount'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  PaginationContainer,
  PageNumbersContainer,
  PageLabel,
  PageButton,
} from './PaginationStyles'
<<<<<<< HEAD
import { PageNumbers } from './PageNumber'
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

interface PaginationProps {
  totalPages: number
  totalProducts: number
  onPageChange: (page: number) => void
<<<<<<< HEAD
  currentPage?: number
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}

export const Pagination = ({
  totalPages,
  onPageChange,
  totalProducts,
<<<<<<< HEAD
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
=======
}: PaginationProps) => {
  const { currentPage } = useCategoryStore()

  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

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

<<<<<<< HEAD
        {/*  PageNumbers component */}
        <PageNumbers
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
          onClick={onPageChange}
        />
=======
        {/* Page numbers */}
        {pages.map((page) => (
          <PageButton
            key={page}
            $isActive={page === currentPage}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PageButton>
        ))}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

        {/* Next button */}
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
<<<<<<< HEAD
          disabled={currentPage === totalPages}
=======
          disabled={currentPage === Math.max(1, totalPages)}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
          aria-label="Go to next page"
        >
          <ChevronsRight size={14} strokeWidth={3} />
        </PageButton>
      </PageNumbersContainer>

      <ProductCount totalProducts={totalProducts} />
    </PaginationContainer>
  )
}
