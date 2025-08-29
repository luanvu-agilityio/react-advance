'use client'
import Link from '@components/common/Link/index'
import { Button, Flex } from '@radix-ui/themes'
import { useMemo, useState, useCallback, memo } from 'react'
import { ChevronRight, ChevronUp } from 'lucide-react'
import { navbarData } from '@data/navbar'
import {
  BannerContainer,
  CategoryLink,
  CategoryList,
  CategoryMenu,
  CategoryTitle,
  MobileCategoryChip,
  MobileCategoryScroll,
} from '../Homepage.styles'
import { useNavigate } from 'react-router-dom'
import BannerComponent from './BannerComponent' // <-- Import the server component

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

function BannerSection() {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Bakery')
  const navigate = useNavigate()

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

  const handleMobileCategoryClick = useCallback(
    (category: string) => {
      setActiveCategory(category)
      navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`)
    },
    [navigate]
  )

  return (
    <BannerContainer className="section">
      <CategoryMenu>
        <CategoryTitle>Category menu</CategoryTitle>
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
      {/* Use the server component here */}
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
