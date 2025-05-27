import type { PageNumbersProps } from 'types/Pagination'
import { memo } from 'react'
import {
  Ellipsis,
  PageButton,
  PageLabel,
  PageNumbersContainer,
} from './PaginationStyles'

export const PageNumbers = memo(
  ({ currentPage, totalPages, pageNumbers, onPageClick }: PageNumbersProps) => {
    if (totalPages <= 1) return null

    return (
      <PageNumbersContainer>
        <PageLabel>Page:</PageLabel>
        {pageNumbers.map((number, index) => {
          if (number === '...') {
            return (
              <Ellipsis
                key={`ellipsis-${currentPage}-${index > pageNumbers.indexOf(currentPage) ? 'after' : 'before'}`}
              >
                ...
              </Ellipsis>
            )
          }

          const pageNumber = Number(number)
          return (
            <PageButton
              key={`page-${pageNumber}`}
              $isActive={currentPage === pageNumber}
              onClick={() => onPageClick(pageNumber)}
              disabled={currentPage === pageNumber}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </PageButton>
          )
        })}
      </PageNumbersContainer>
    )
  }
)

PageNumbers.displayName = 'PageNumbers'
