import { ProductCard } from '@components/ProductCard/ProductCard'
import { useMemo } from 'react'
import { useProductNavigation } from '@hooks/useProductNavigation'
import type { ProductListingProps } from 'types/Pagination'
import {
  EmptyStateContainer,
  EmptyStateText,
  ProductListingContainer,
  ProductsGrid,
} from '@components/Pagination/PaginationStyles'
import { Pagination } from '@components/Pagination/Pagination'

const ProductListing = ({
  products,
  viewMode = 'grid',
<<<<<<< HEAD
  currentPage,
=======

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  totalProducts,
  productsPerPage = 5,
  onPageChange,
}: ProductListingProps) => {
  const { createProductClickHandler } = useProductNavigation()

  // Calculate pagination values
<<<<<<< HEAD
  const { effectiveTotalProducts, totalPages } = useMemo(() => {
    const total = totalProducts ?? products.length
    const pages = Math.max(1, Math.ceil(total / productsPerPage))

    return {
      effectiveTotalProducts: total,
      totalPages: pages,
    }
  }, [totalProducts, products.length, productsPerPage])
=======
  const { effectiveTotalProducts, totalPages, shouldShowPagination } =
    useMemo(() => {
      const total = totalProducts ?? products.length
      const pages = Math.max(1, Math.ceil(total / productsPerPage))

      const shouldShow = pages > 1 || total > productsPerPage

      return {
        effectiveTotalProducts: total,
        totalPages: pages,
        shouldShowPagination: shouldShow,
      }
    }, [totalProducts, products.length, productsPerPage])
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

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

<<<<<<< HEAD
      <Pagination
        totalPages={totalPages}
        totalProducts={effectiveTotalProducts}
        onPageChange={onPageChange || (() => {})}
        currentPage={currentPage}
      />
=======
      {shouldShowPagination && (
        <Pagination
          totalPages={totalPages}
          totalProducts={effectiveTotalProducts}
          onPageChange={onPageChange || (() => {})}
        />
      )}
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    </ProductListingContainer>
  )
}

ProductListing.displayName = 'ProductListing'

export default ProductListing
