import type { ShowMoreProps } from 'types/Pagination'
import { ShowMoreButton } from './PaginationStyles'
import { ChevronDown } from 'lucide-react'

export const ShowMore = ({
  currentPage,
  totalPages,
  onShowMore,
}: ShowMoreProps) => {
  if (currentPage >= totalPages) return null

  return (
    <ShowMoreButton
      onClick={onShowMore}
      disabled={currentPage >= totalPages}
      aria-label="Load more products"
    >
      Show more products
      <ChevronDown size={18} strokeWidth={3} />
    </ShowMoreButton>
  )
}
