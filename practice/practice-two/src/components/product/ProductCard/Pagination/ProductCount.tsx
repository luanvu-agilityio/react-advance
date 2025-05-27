import type { ProductCountProps } from 'types/Pagination'
import { memo } from 'react'
import { ProductCountDisplay } from './PaginationStyles'

export const ProductCount = memo(({ totalProducts }: ProductCountProps) => (
  <ProductCountDisplay>
    {totalProducts} Product{totalProducts !== 1 ? 's' : ''}
  </ProductCountDisplay>
))

ProductCount.displayName = 'ProductCount'
