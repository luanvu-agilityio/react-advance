import Link from '@components/common/Link/index'
import { Button, Flex } from '@radix-ui/themes'
import { useMemo, useState, useCallback, memo, type MouseEvent } from 'react'
import { ChevronRight, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
  MoreCategoriesButton,
} from '../Homepage.styles'

// Memoized category link component to prevent re-renders
const MemoizedCategoryLink = memo(
  ({
    category,
    isNew,
    onClick,
  }: {
    category: string
    isNew: boolean
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  }) => (
    <CategoryLink
      key={category.toLowerCase().replace(/\s+/g, '-')}
      $isNew={isNew}
    >
      <Link
        href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={onClick}
      >
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
        <Button
          variant="outline"
          style={{
            fontSize: '15px',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--black-color-default)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid var(--green-shade-2)',
            height: 'auto',
            cursor: 'pointer',
          }}
        >
          Read recipes{' '}
          <ChevronRight
            size={16}
            strokeWidth={4}
            color="var(--green-color-default)"
            style={{ marginLeft: 2 }}
          />
        </Button>
      </ButtonContainer>
    </Banner>
  )
)

BannerComponent.displayName = 'BannerComponent'

function BannerSection() {
  const navigate = useNavigate()
  const [showAllCategories, setShowAllCategories] = useState(false)

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

  // Memoize event handlers
  const handleCategoryClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const categoryPath = e.currentTarget.pathname.slice(1)
      navigate(`/${categoryPath}`)
    },
    [navigate]
  )

  const handleToggleCategories = useCallback(() => {
    setShowAllCategories((prev) => !prev)
  }, [])

  return (
    <BannerContainer className="section">
      <CategoryMenu>
        <CategoryTitle>Category menu</CategoryTitle>
        <CategoryList>
          {displayedCategories.map((category, index) => (
            <MemoizedCategoryLink
              key={category.toLowerCase().replace(/\s+/g, '-')}
              category={category}
              isNew={showAllCategories && index >= 5}
              onClick={handleCategoryClick}
            />
          ))}
        </CategoryList>
        {hasMoreCategories && (
          <MoreCategoriesButton>
            <Button
              variant="ghost"
              onClick={handleToggleCategories}
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
                {showAllCategories ? 'Show less' : 'More Categories'}
                {showAllCategories ? (
                  <ChevronUp size={16} strokeWidth={4} />
                ) : (
                  <ChevronRight size={16} strokeWidth={4} />
                )}
              </Flex>
            </Button>
          </MoreCategoriesButton>
        )}
      </CategoryMenu>

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
