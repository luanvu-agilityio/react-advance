import { ChevronRight } from 'lucide-react'
import ContentContainer from '@layouts/ContentContainer/ContentContainer'
import { ProductCard } from '@components/ProductCard/ProductCard'
import {
  HeaderContainer,
  ProductFlex,
  SectionTitle,
  StyledLinkButton,
} from '../Homepage.styles'
import { use } from 'react'
import { fetchSectionProducts } from '@services/product'

interface ProductSectionProps {
  title?: string

  maxItems?: number
  sectionType?: 'best-selling' | 'featured'
}

const ProductSection = ({
  title = 'Section Headline',

  sectionType = 'best-selling',
  maxItems = 4,
}: ProductSectionProps) => {
  const products = use(fetchSectionProducts(sectionType, maxItems))

  return (
    <section className="section">
      <ContentContainer direction="column">
        <HeaderContainer>
          <SectionTitle className="section-title">{title}</SectionTitle>
          <StyledLinkButton to="/all-products">
            See more{' '}
            <ChevronRight
              size={14}
              color="var(--green-color-default"
              strokeWidth={4}
            />
          </StyledLinkButton>
        </HeaderContainer>

        <ProductFlex>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
                onAddToWishlist={() =>
                  console.log(`Add ${product.title} to wishlist`)
                }
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ProductFlex>
      </ContentContainer>
    </section>
  )
}

export default ProductSection
