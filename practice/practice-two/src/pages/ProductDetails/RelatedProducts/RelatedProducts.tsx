import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@components/ProductCard/ProductCard'
import { productData } from '@data/product-data'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Header,
  ProductGrid,
  Title,
  ViewMoreLink,
} from './RelatedProducts.styles'

interface RelatedProductsProps {
  currentProductId: number
  subcategory: string
}

const RelatedProducts = ({
  currentProductId,
  subcategory,
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
      navigate(`/${categoryPath}`)
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
            onAddToWishlist={() => console.log('Add to wishlist:', product.id)}
          />
        ))}
      </ProductGrid>
    </Container>
  )
}

export default RelatedProducts
