import type { PageNumbersProps } from 'types/Pagination'
import {
  Ellipsis,
  PageButton,
  PageLabel,
  PageNumbersContainer,
} from './PaginationStyles'

interface ExtendedPageNumbersProps extends PageNumbersProps {
  disabled?: boolean
}

export const PageNumbers = ({
  currentPage,
  pageNumbers,
  onPageClick,
  disabled = false,
}: ExtendedPageNumbersProps) => {
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
        const isActive = currentPage === pageNumber

        return (
          <PageButton
            key={`page-${pageNumber}`}
            $isActive={isActive}
            onClick={() => !disabled && !isActive && onPageClick(pageNumber)}
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
