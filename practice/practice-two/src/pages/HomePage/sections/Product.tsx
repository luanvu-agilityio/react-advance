import { ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import type { MouseEvent } from 'react'
import { productData } from '@data/product-data'
import ContentContainer from '@layouts/ContentContainer/ContentContainer'
import { ProductCard } from '@components/ProductCard/ProductCard'
import {
  HeaderContainer,
  ProductFlex,
  SectionTitle,
  StyledLinkButton,
} from '../Homepage.styles'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
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
    navigate('/all-products')
  }

  return (
    <section className="section">
      <ContentContainer direction="column">
        <HeaderContainer>
          <SectionTitle className="section-title">{title}</SectionTitle>
          <StyledLinkButton href="/products" onClick={handleClick}>
            See more{' '}
            <ChevronRight
              size={14}
              color="var(--green-color-default"
              strokeWidth={4}
            />
          </StyledLinkButton>
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
