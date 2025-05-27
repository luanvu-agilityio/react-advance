import { type MouseEvent, useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import { Button, Flex } from '@radix-ui/themes'
import Link from '@components/common/Link'
import { navbarData } from '@dummy-data/navbar'

import { productData } from '@dummy-data/product-data'
import ContentContainer from '@components/common/ContentContainer'
import { useNavigate } from 'react-router-dom'
import { getRandomItems } from '@helpers/getRandomItems'
import { ProductCard } from '@components/product/ProductCard/ProductCard'

const Container = styled.div`
  width: 100%;
  background-color: white;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--black-color-default);

  @media (max-width: 1023px) {
    margin-bottom: 1.5rem;
  }
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledLink = styled.div`
  margin-bottom: 0.25rem;
`

const ProductsGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 32px;

  // Mobile
  grid-template-columns: 1fr;

  // Tablet
  @media (min-width: 640px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // Design width (1260px) and above
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(269px, 1fr));
  }
`

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

  const handleCategoryClick =
    (category: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const categoryPath = category.toLowerCase().replace(/\s+/g, '-')
      navigate(`/${categoryPath}`)
    }

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
                    onClick={handleCategoryClick(category)}
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
              variant="ghost"
              onClick={() => navigate('/all-products')}
              style={{
                marginTop: '3rem',
                fontWeight: 'var(--font-weight-bold)',
                padding: '12.5px 16px',
                color: 'var(--black-color-default)',
                justifyContent: 'flex-start',
                fontSize: '15px',
                borderRadius: '12px',
                backgroundColor: 'var(--black-shade-5)',
                cursor: 'pointer',
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
