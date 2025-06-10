import { ProductCountDisplay } from './PaginationStyles'

interface ProductCountProps {
  totalProducts: number
}

export const ProductCount = ({ totalProducts }: ProductCountProps) => (
  <ProductCountDisplay>
    <span>{totalProducts}</span>
    <span>Products</span>
  </ProductCountDisplay>
)

ProductCount.displayName = 'ProductCount'
