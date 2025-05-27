import styled from 'styled-components'
import { ProductCard } from '@components/product/ProductCard/ProductCard'
import type { Product } from 'types/Product'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const ProductsGrid = styled.div<{ $viewMode: string }>`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;

  @media (min-width: 576px) {
    gap: 24px;
    grid-template-columns: ${(props) =>
      props.$viewMode === 'grid'
        ? 'repeat(auto-fill, minmax(240px, 1fr))'
        : '1fr'};
  }

  @media (min-width: 992px) {
    gap: 32px;
    grid-template-columns: ${(props) =>
      props.$viewMode === 'grid'
        ? 'repeat(auto-fill, minmax(269px, 1fr))'
        : '1fr'};
  }
`
const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 32px;
  }
`

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  order: 2;

  @media (min-width: 768px) {
    order: 1;
  }
`

const PageButton = styled.button<{ $isActive?: boolean }>`
  color: ${(props) =>
    props.$isActive
      ? 'var(--green-color-default)'
      : 'var(--black-color-default)'};
  background-color: transparent;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: ${(props) =>
    props.$isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)'};

  &:hover {
    background: ${(props) =>
      props.$isActive ? 'var(--green-color-default)' : 'var(--black-shade-6)'};
  }
`

const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--green-color-default);
  color: var(--white-color);
  border: 2px solid var(--green-shade-1);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  order: 1;

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: translateY(2px);
  }
  @media (min-width: 768px) {
    width: auto;
    order: 2;
  }
`
const ProductCountDisplay = styled.span`
  color: var(--black-shade-2);
  font-size: 14px;
  display: none;

  @media (min-width: 768px) {
    display: block;
    order: 3;
  }
`
interface ProductListingProps {
  products: Product[]
  viewMode: string
  currentPage?: number
  totalProducts?: number
  productsPerPage?: number
  onPageChange?: (page: number) => void
}

const ProductListing = ({
  products,
  viewMode = 'grid',
  currentPage = 1,
  totalProducts = 0,
  productsPerPage = 5,
  onPageChange,
}: ProductListingProps) => {
  const navigate = useNavigate()

  const effectiveTotalProducts =
    totalProducts > 0 ? totalProducts : products.length
  const totalPages = Math.ceil(effectiveTotalProducts / productsPerPage)

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const pages = []

    // Always show first page
    if (totalPages > 0) {
      pages.push(1)
    }

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
      pages.push(i)
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

  // Handle page change
  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }

  // Handle show more
  const handleShowMore = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleProductClick = (id: number) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      const categoryPath = product.category?.toLowerCase().replace(/ /g, '-')
      const subcategoryPath = product.subcategory
        ?.toLowerCase()
        .replace(/ /g, '-')
      navigate(`/${categoryPath}/${subcategoryPath}/${id}`)
      window.scrollTo(0, 0)
    }
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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

      <PaginationContainer>
        <PageNumbers>
          <span style={{ color: 'var(--black-shade-2)', fontSize: '14px' }}>
            Page:
          </span>
          {pageNumbers.map((number: number | string, index: number) => {
            if (number === '...') {
              return (
                <span
                  key={`ellipsis-${currentPage}-${index > currentPage ? 'after' : 'before'}`}
                >
                  ...
                </span>
              )
            }

            return (
              <PageButton
                key={`page-${number}`}
                $isActive={currentPage === number}
                onClick={() => handlePageClick(Number(number))}
              >
                {number}
              </PageButton>
            )
          })}
        </PageNumbers>
        {currentPage < totalPages && (
          <ShowMoreButton onClick={handleShowMore}>
            Show more products
            <ChevronDown size={18} strokeWidth={3} />
          </ShowMoreButton>
        )}

        <ProductCountDisplay>
          {totalProducts ?? products.length} Products
        </ProductCountDisplay>
      </PaginationContainer>
    </div>
  )
}

export default ProductListing
