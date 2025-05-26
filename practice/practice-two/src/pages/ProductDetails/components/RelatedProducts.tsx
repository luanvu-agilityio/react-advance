import { useMemo } from 'react'
import styled from 'styled-components'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@components/product/ProductCard/ProductCard'
import { productData } from '@dummy-data/product-data'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;
`

const ViewMoreLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--black-color-default);
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  text-decoration: none;

  &:hover {
    color: var(--green-color-default);
  }
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

interface RelatedProductsProps {
  currentProductId: number
  subcategory: string
  onProductClick: (productId: number) => void
}

const RelatedProducts = ({
  currentProductId,
  subcategory,
  onProductClick,
}: RelatedProductsProps) => {
  const navigate = useNavigate()
  const relatedProducts = useMemo(() => {
    // Get all products from the same subcategory except current product
    const sameSubcategoryProducts = productData.filter(
      (product) =>
        product.subcategory === subcategory && product.id !== currentProductId
    )

    // Randomly select 4 products
    const shuffledProducts = [...sameSubcategoryProducts]
    shuffledProducts.sort(() => Math.random() - 0.5)
    return shuffledProducts.slice(0, 4)
  }, [currentProductId, subcategory])

  const handleViewMore = () => {
    const currentProduct = productData.find((p) => p.id === currentProductId)
    if (currentProduct) {
      const categoryPath = currentProduct.category
        .toLowerCase()
        .replace(/ /g, '-')
      navigate(`${categoryPath}`)
    }
  }

  return (
    <Container>
      <Header>
        <Title>Related products</Title>
        <ViewMoreLink onClick={handleViewMore}>
          More products
          <ChevronRight
            size={15}
            strokeWidth={4}
            color="var(--green-color-default)"
          />
        </ViewMoreLink>
      </Header>

      <ProductGrid>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="grid"
            onClick={() => onProductClick(product.id)}
            onAddToWishlist={() => console.log('Add to wishlist:', product.id)}
          />
        ))}
      </ProductGrid>
    </Container>
  )
}

export default RelatedProducts
