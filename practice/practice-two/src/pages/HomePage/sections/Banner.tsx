import Link from '@components/common/Link/index'
import { Button, Flex } from '@radix-ui/themes'
import { useMemo, useState, useCallback, memo } from 'react'
import { ChevronRight, ChevronUp } from 'lucide-react'
import { navbarData } from '@data/navbar'
import {
  Banner,
  BannerContainer,
  BannerHeading,
  BannerSubtitle,
  ButtonContainer,
  CategoryLink,
  CategoryList,
  CategoryMenu,
  CategoryTitle,
  MobileCategoryChip,
  MobileCategoryScroll,
} from '../Homepage.styles'
import { useNavigate } from 'react-router-dom'

// Memoized category link component to prevent re-renders
const MemoizedCategoryLink = memo(
  ({ category, isNew }: { category: string; isNew: boolean }) => (
    <CategoryLink
      key={category.toLowerCase().replace(/\s+/g, '-')}
      $isNew={isNew}
    >
      <Link href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}>
        {category}
      </Link>
    </CategoryLink>
  )
)

MemoizedCategoryLink.displayName = 'MemoizedCategoryLink'

// Memoized banner component
const BannerComponent = memo(
  ({ subtitle, heading }: { subtitle: string; heading: string }) => (
    <Banner>
      <BannerSubtitle>{subtitle}</BannerSubtitle>
      <BannerHeading>{heading}</BannerHeading>

      <ButtonContainer>
        <Button variant="outline">
          Read recipes{' '}
          <ChevronRight
            size={16}
            strokeWidth={4}
            color="var(--green-color-default)"
            style={{ marginLeft: '2px' }}
          />
        </Button>
      </ButtonContainer>
    </Banner>
  )
)

BannerComponent.displayName = 'BannerComponent'

function BannerSection() {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Bakery')
  const navigate = useNavigate()

  // Memoize all computed values
  const allCategories = useMemo(() => {
    return navbarData
      .filter((item) => item.type !== 'simple')
      .map((item) => item.label)
  }, [])

  const displayedCategories = useMemo(() => {
    return showAllCategories ? allCategories : allCategories.slice(0, 5)
  }, [allCategories, showAllCategories])

  const hasMoreCategories = useMemo(() => {
    return allCategories.length > 5
  }, [allCategories])

  const handleToggleCategories = useCallback(() => {
    setShowAllCategories((prev) => !prev)
  }, [])

  const handleMobileCategoryClick = useCallback((category: string) => {
    setActiveCategory(category)
    navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`)
  }, [])

  return (
    <BannerContainer className="section">
      <CategoryMenu>
        <CategoryTitle>Category menu</CategoryTitle>

        {/* Mobile horizontal scrolling categories */}
        <MobileCategoryScroll>
          {allCategories.map((category) => (
            <MobileCategoryChip
              key={`mobile-${category}`}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => handleMobileCategoryClick(category)}
            >
              {category}
            </MobileCategoryChip>
          ))}
        </MobileCategoryScroll>

        {/* Desktop category list - unchanged */}
        <CategoryList>
          {displayedCategories.map((category, index) => (
            <MemoizedCategoryLink
              key={category.toLowerCase().replace(/\s+/g, '-')}
              category={category}
              isNew={showAllCategories && index >= 5}
            />
          ))}
        </CategoryList>

        {hasMoreCategories && (
          <Button
            variant="ghost"
            onClick={handleToggleCategories}
            style={{ marginTop: '24px' }}
          >
            <Flex align="center" gap="1">
              {showAllCategories ? 'Show less' : 'More Categories'}
              {showAllCategories ? (
                <ChevronUp size={16} strokeWidth={4} />
              ) : (
                <ChevronRight size={16} strokeWidth={4} />
              )}
            </Flex>
          </Button>
        )}
      </CategoryMenu>

      {/* Rest of the component remains the same */}
      <BannerComponent
        subtitle="Farm fresh"
        heading="Get garden fresh fruits and vegetables"
      />

      <BannerComponent
        subtitle="Fresh bakery"
        heading="Freshly baked breads and pastries daily"
      />
    </BannerContainer>
  )
}

export default memo(BannerSection)
