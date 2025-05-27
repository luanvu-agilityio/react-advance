import { useMemo } from 'react'

export const usePagination = (currentPage: number, totalPages: number) => {
  return useMemo(() => {
    const pages: (number | string)[] = []

    if (totalPages <= 0) return pages

    // Always show first page
    pages.push(1)

    // Add ellipsis if not showing page 2
    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Add ellipsis if not showing the second last page
    if (currentPage < totalPages - 2 && totalPages > 4) {
      pages.push('...')
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages])
}
