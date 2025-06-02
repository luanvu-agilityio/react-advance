import { useCategoryStore } from '@stores/categoryStore'
import { ProductCount } from './ProductCount'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  PaginationContainer,
  PageNumbersContainer,
  PageLabel,
  PageButton,
} from './PaginationStyles'

interface PaginationProps {
  totalPages: number
  totalProducts: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  totalPages,
  onPageChange,
  totalProducts,
}: PaginationProps) => {
  const { currentPage } = useCategoryStore()

  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)

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

        {/* Next button */}
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.max(1, totalPages)}
          aria-label="Go to next page"
        >
          <ChevronsRight size={14} strokeWidth={3} />
        </PageButton>
      </PageNumbersContainer>

      <ProductCount totalProducts={totalProducts} />
    </PaginationContainer>
  )
}
