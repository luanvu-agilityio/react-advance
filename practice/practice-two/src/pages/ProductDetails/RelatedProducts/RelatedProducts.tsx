import { ChevronRight } from 'lucide-react'
import { Spinner } from '@radix-ui/themes'
import { ProductCard } from '@components/ProductCard/ProductCard'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Header,
  ProductGrid,
  Title,
  ViewMoreLink,
} from './RelatedProducts.styles'

// Import the related products query hook
import { useRelatedProducts } from '@hooks/useProductQuery'

interface RelatedProductsProps {
  currentProductId: number
  subcategory: string
}

const RelatedProducts = ({
  currentProductId,
  subcategory,
}: RelatedProductsProps) => {
  const navigate = useNavigate()

  const {
    data: relatedProducts,
    isLoading,
    error,
  } = useRelatedProducts(currentProductId, subcategory)

  const handleViewMore = () => {
    // Navigate to category page
    const categoryPath = subcategory.toLowerCase().replace(/ /g, '-')
    navigate(`/${categoryPath}`)
  }

  // Don't render anything if there's an error or no products
  if (
    error ||
    (!isLoading && (!relatedProducts || relatedProducts.length === 0))
  ) {
    return null
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

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '40px 0',
          }}
        >
          <Spinner size="3" />
        </div>
      ) : (
        <ProductGrid>
          {relatedProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode="grid"
              onAddToWishlist={() =>
                console.log('Add to wishlist:', product.id)
              }
            />
          ))}
        </ProductGrid>
      )}
    </Container>
  )
}

export default RelatedProducts
