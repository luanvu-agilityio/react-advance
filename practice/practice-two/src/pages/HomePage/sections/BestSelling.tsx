import { type MouseEvent, useCallback, useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import { Button, Flex } from '@radix-ui/themes'
import Link from '@components/common/Link/index'
import { navbarData } from '@data/navbar'

import { productData } from '@data/product-data'
import ContentContainer from '@components/common/ContentContainer/ContentContainer'
import { useNavigate } from 'react-router-dom'
import { getRandomItems } from '@helpers/getRandomItems'
import { ProductCard } from '@components/ProductCard/ProductCard'
import {
  CategoryList,
  Container,
  FlexContainer,
  ProductsGrid,
  SectionTitle,
  StyledLink,
} from '../Homepage.styles'

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
  const navigate = useNavigate()

  // Get random categories from navbar data
  const randomCategories = useMemo(() => {
    const categories = navbarData
      .filter((item) => item.type !== 'simple')
      .map((item) => item.label)
    return getRandomItems(categories, 5)
  }, [])

  // Filter products by section tag using useMemo for performance
  const filteredProducts = useMemo(() => {
    return productData
      .filter((product) => product.section?.includes(sectionType))
      .slice(0, maxItems)
  }, [sectionType, maxItems])

  const handleCategoryClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, category: string) => {
      e.preventDefault()
      const categoryPath = category.toLowerCase().replace(/\s+/g, '-')
      navigate(`/${categoryPath}`)
    },
    [navigate]
  )

  return (
    <Container className="section">
      <ContentContainer>
        <FlexContainer>
          {/* Left Column - Categories - Hidden on mobile, shown as a horizontal scrollbar */}
          <CategoryColumn>
            <SectionTitle>{title}</SectionTitle>
            <CategoryList>
              {randomCategories.map((category) => (
                <StyledLink key={category.toLowerCase().replace(/\s+/g, '-')}>
                  <Link
                    href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleCategoryClick(e, category)}
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
              ))}
            </CategoryList>
            <Button
              variant="soft"
              onClick={() => navigate('/all-products')}
              style={{
                marginTop: '3rem',
                justifyContent: 'flex-start',
              }}
            >
              <Flex align="center" gap="1">
                More products
                <ChevronRight size={16} strokeWidth={4} />
              </Flex>
            </Button>
          </CategoryColumn>

          {/* Right Column - Products */}
          <ProductsGrid>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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

const CategoryColumn = styled.div`
  width: 100%;

  @media (max-width: 1023px) {
    ${CategoryList}, button {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    width: 268px;
    flex-shrink: 0;
  }
`

export default BestSellingProducts
