import type { PageNumbersProps } from 'types/Pagination'
import { Ellipsis, PageButton, PageNumbersContainer } from './PaginationStyles'

export const PageNumbers = ({
  currentPage,
  pageNumbers,
  totalPages,
  onClick,
  disabled = false,
}: PageNumbersProps) => {
  const validPageNumbers = pageNumbers.filter(
    (number) => number === '...' || Number(number) <= totalPages
  )

  return (
    <PageNumbersContainer>
      {pageNumbers.map((number, index) => {
        if (number === '...') {
          return (
            <Ellipsis
              key={`ellipsis-${currentPage}-${index > validPageNumbers.indexOf(currentPage) ? 'after' : 'before'}`}
            >
              ...
            </Ellipsis>
          )
        }

        const pageNumber = Number(number)
        const isActive = currentPage === pageNumber

        return (
          <PageButton
            key={`page-${pageNumber}`}
            $isActive={isActive}
            onClick={() => !disabled && !isActive && onClick(pageNumber)}
            disabled={disabled || isActive}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
            style={{
              opacity: disabled ? 0.5 : 1,
              cursor: disabled || isActive ? 'not-allowed' : 'pointer',
            }}
          >
            {pageNumber}
          </PageButton>
        )
      })}
    </PageNumbersContainer>
  )
}

PageNumbers.displayName = 'PageNumbers'
