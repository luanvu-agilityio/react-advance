import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@components/ProductCard/ProductCard'
import {
  Container,
  Header,
  ProductGrid,
  Title,
  ViewMoreLink,
} from './RelatedProducts.styles'
import type { Product } from 'types/Product'

export interface RelatedProductsProps {
  products: Product[]
  subcategory: string
}

const RelatedProducts = ({ products, subcategory }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null

  const categoryPath = subcategory.toLowerCase().replace(/ /g, '-')

  return (
    <Container>
      <Header>
        <Title>Related products</Title>
        <ViewMoreLink href={`/${categoryPath}`}>
          More products
          <ChevronRight
            size={15}
            strokeWidth={4}
            color="var(--green-color-default)"
          />
        </ViewMoreLink>
      </Header>
      <ProductGrid>
        {products.map((product) => (
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
