import { ProductCard } from '@components/product/ProductCard/ProductCard'
import { memo, useMemo } from 'react'
import { useProductNavigation } from '@hooks/useProductNavigation'
import { Pagination } from './Pagination/Pagination'
import type { ProductListingProps } from 'types/Pagination'
import {
  EmptyStateContainer,
  EmptyStateText,
  ProductListingContainer,
  ProductsGrid,
} from './Pagination/PaginationStyles'

const ProductListing = memo(
  ({
    products,
    viewMode = 'grid',
    currentPage = 1,
    totalProducts,
    productsPerPage = 5,
    onPageChange,
  }: ProductListingProps) => {
    const { createProductClickHandler } = useProductNavigation()

    // Calculate pagination values
    const { effectiveTotalProducts, totalPages } = useMemo(() => {
      const total = totalProducts ?? products.length
      const pages = Math.ceil(total / productsPerPage)
      return {
        effectiveTotalProducts: total,
        totalPages: pages,
      }
    }, [totalProducts, products.length, productsPerPage])

    // Create product click handler
    const handleProductClick = useMemo(
      () => createProductClickHandler(products),
      [createProductClickHandler, products]
    )

    // Show empty state if no products
    if (products.length === 0) {
      return (
        <ProductListingContainer>
          <EmptyStateContainer>
            <EmptyStateText>No products found.</EmptyStateText>
          </EmptyStateContainer>
        </ProductListingContainer>
      )
    }

    return (
      <ProductListingContainer>
        <ProductsGrid $viewMode={viewMode}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onClick={handleProductClick}
            />
          ))}
        </ProductsGrid>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={effectiveTotalProducts}
          onPageChange={onPageChange}
        />
      </ProductListingContainer>
    )
  }
)

ProductListing.displayName = 'ProductListing'

export default ProductListing
