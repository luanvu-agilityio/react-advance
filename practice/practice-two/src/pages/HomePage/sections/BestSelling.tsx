import { ChevronRight } from 'lucide-react'
import { Button, Flex } from '@radix-ui/themes'
import Link from '@components/common/Link/index'
import { navbarData } from '@data/navbar'
import ContentContainer from '@layouts/ContentContainer/ContentContainer'
import { getRandomItems } from '@helpers/getRandomItems'
import { ProductCard } from '@components/ProductCard/ProductCard'

import {
  CategoryList,
  CategoryColumn,
  Container,
  FlexContainer,
  ProductsGrid,
  SectionTitle,
  StyledLink,
} from '../Homepage.styles'
import { use } from 'react'
import { fetchSectionProducts } from '@services/product'

interface BestSellingProductsProps {
  sectionType?: 'best-selling' | 'featured'
  title?: string
  maxItems?: number
}

const BestSellingProducts = ({
  sectionType = 'best-selling',
  title = sectionType === 'best-selling'
    ? 'Best selling products'
    : 'Featured products',
  maxItems = 5,
}: BestSellingProductsProps) => {
  const products = use(fetchSectionProducts(sectionType, maxItems))

  // Get random categories from navbar data
  const categories = navbarData
    .filter((item) => item.type !== 'simple')
    .map((item) => item.label)
  const randomCategories = getRandomItems(categories, 5)

  return (
    <Container className="section">
      <ContentContainer>
        <FlexContainer>
          {/* Left Column - Categories */}
          <CategoryColumn>
            <SectionTitle>{title}</SectionTitle>
            <CategoryList>
              {randomCategories.map((category) => {
                const categoryPath = category.toLowerCase().replace(/\s+/g, '-')
                return (
                  <StyledLink key={categoryPath}>
                    <Link
                      href={`/${categoryPath}`}
                      style={{
                        color: 'var(--green-color-default)',
                        fontFamily: 'var(--font-family-secondary)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: '14px',
                      }}
                    >
                      {category}
                    </Link>
                  </StyledLink>
                )
              })}
            </CategoryList>
            <Button
              variant="ghost"
              // Use a regular link for navigation
              asChild
              style={{ marginTop: '24px' }}
            >
              <a href="/all-products" style={{ background: 'none' }}>
                <Flex align="center" gap="1">
                  More products
                  <ChevronRight size={16} strokeWidth={4} />
                </Flex>
              </a>
            </Button>
          </CategoryColumn>

          {/* Right Column - Products */}
          <ProductsGrid>
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
              <p>No products found in this section.</p>
            )}
          </ProductsGrid>
        </FlexContainer>
      </ContentContainer>
    </Container>
  )
}

export default BestSellingProducts
