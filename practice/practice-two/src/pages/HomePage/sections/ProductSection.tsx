import { ChevronRight } from 'lucide-react'

import styled from 'styled-components'
import Link from '@components/common/Link'
import { useMemo } from 'react'
import type { MouseEvent } from 'react'
import { productData } from '@data/product-data'
import ContentContainer from '@components/common/ContentContainer'
import { ProductCard } from '@components/product/ProductCard/ProductCard'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  gap: 6px;
`

const SectionTitle = styled.p`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

const ProductFlex = styled.div`
  display: flex;

  gap: 32px;
`

interface ProductSectionProps {
  title?: string
  showRandomProducts?: boolean
  maxItems?: number
}

const ProductSection = ({
  title = 'Section Headline',
  showRandomProducts = true,
  maxItems = 4,
}: ProductSectionProps) => {
  // Use imported productData instead of hardcoded products
  const displayProducts = useMemo(() => {
    // Get products with both "best-selling" and "featured" tags
    const productsWithBothTags = productData.filter((product) => {
      const sections = product.section ?? []
      return sections.includes('best-selling') && sections.includes('featured')
    })

    // Get products with only "best-selling" tag
    const bestSellingProducts = productData.filter((product) => {
      const sections = product.section ?? []
      return sections.includes('best-selling') && !sections.includes('featured')
    })

    // Get products with only "featured" tag
    const featuredProducts = productData.filter((product) => {
      const sections = product.section ?? []
      return sections.includes('featured') && !sections.includes('best-selling')
    })

    // Combine all these products
    const combinedProducts = [
      ...productsWithBothTags,
      ...bestSellingProducts,
      ...featuredProducts,
    ]

    // Randomize if needed
    if (showRandomProducts) {
      // Shuffle the array
      return [...combinedProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, maxItems)
    }

    // Otherwise just take the first maxItems
    return combinedProducts.slice(0, maxItems)
  }, [showRandomProducts, maxItems])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    console.log('See more products clicked')
  }

  return (
    <section className="section">
      <ContentContainer direction="column">
        <HeaderContainer>
          <SectionTitle className="section-title">{title}</SectionTitle>
          <StyledLink href="/products" onClick={handleClick}>
            See more{' '}
            <ChevronRight
              size={14}
              color="var(--green-color-default"
              strokeWidth={4}
            />
          </StyledLink>
        </HeaderContainer>

        <ProductFlex>
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
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
