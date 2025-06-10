<<<<<<< HEAD
import { ChevronRight } from 'lucide-react'
import { Spinner } from '@radix-ui/themes'
import { ProductCard } from '@components/ProductCard/ProductCard'
=======
import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@components/ProductCard/ProductCard'
import { productData } from '@data/product-data'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Header,
  ProductGrid,
  Title,
  ViewMoreLink,
} from './RelatedProducts.styles'

<<<<<<< HEAD
// Import the related products query hook
import { useRelatedProducts } from '@hooks/useProductQuery'

=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
interface RelatedProductsProps {
  currentProductId: number
  subcategory: string
}

const RelatedProducts = ({
  currentProductId,
  subcategory,
}: RelatedProductsProps) => {
  const navigate = useNavigate()
<<<<<<< HEAD

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
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    </Container>
  )
}

export default RelatedProducts
