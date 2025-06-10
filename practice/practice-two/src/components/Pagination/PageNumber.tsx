import type { PageNumbersProps } from 'types/Pagination'
<<<<<<< HEAD
import { Ellipsis, PageButton, PageNumbersContainer } from './PaginationStyles'
=======
import {
  Ellipsis,
  PageButton,
  PageLabel,
  PageNumbersContainer,
} from './PaginationStyles'

interface ExtendedPageNumbersProps extends PageNumbersProps {
  disabled?: boolean
}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

export const PageNumbers = ({
  currentPage,
  pageNumbers,
<<<<<<< HEAD
  totalPages,
  onClick,
  disabled = false,
}: PageNumbersProps) => {
  const validPageNumbers = pageNumbers.filter(
    (number) => number === '...' || Number(number) <= totalPages
  )

  return (
    <PageNumbersContainer>
=======
  onPageClick,
  disabled = false,
}: ExtendedPageNumbersProps) => {
  return (
    <PageNumbersContainer>
      <PageLabel>Page:</PageLabel>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      {pageNumbers.map((number, index) => {
        if (number === '...') {
          return (
            <Ellipsis
<<<<<<< HEAD
              key={`ellipsis-${currentPage}-${index > validPageNumbers.indexOf(currentPage) ? 'after' : 'before'}`}
=======
              key={`ellipsis-${currentPage}-${index > pageNumbers.indexOf(currentPage) ? 'after' : 'before'}`}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
            onClick={() => !disabled && !isActive && onClick(pageNumber)}
=======
            onClick={() => !disabled && !isActive && onPageClick(pageNumber)}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
