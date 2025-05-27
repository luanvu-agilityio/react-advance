import { usePagination } from '@hooks/usePagination'
import { memo, useCallback } from 'react'
import { PaginationContainer } from './PaginationStyles'
import { ProductCount } from './ProductCount'
import { PageNumbers } from './PageNumber'
import { ShowMore } from './ShowMoreButton'

// Component: Pagination
export const Pagination = memo(
  ({
    currentPage,
    totalPages,
    totalProducts,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    totalProducts: number
    onPageChange?: (page: number) => void
  }) => {
    const pageNumbers = usePagination(currentPage, totalPages)

    const handlePageClick = useCallback(
      (page: number) => {
        if (onPageChange && page !== currentPage) {
          onPageChange(page)
        }
      },
      [onPageChange, currentPage]
    )

    const handleShowMore = useCallback(() => {
      if (onPageChange && currentPage < totalPages) {
        onPageChange(currentPage + 1)
      }
    }, [onPageChange, currentPage, totalPages])

    if (totalPages <= 1) {
      return (
        <PaginationContainer>
          <ProductCount totalProducts={totalProducts} />
        </PaginationContainer>
      )
    }

    return (
      <PaginationContainer>
        <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onPageClick={handlePageClick}
        />

        <ShowMore
          currentPage={currentPage}
          totalPages={totalPages}
          onShowMore={handleShowMore}
        />

        <ProductCount totalProducts={totalProducts} />
      </PaginationContainer>
    )
  }
)

Pagination.displayName = 'Pagination'
