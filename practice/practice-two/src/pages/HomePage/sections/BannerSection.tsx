import Link from '@components/common/Link/index'
import { Button, Flex } from '@radix-ui/themes'
import { useMemo, useState, type MouseEvent } from 'react'
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

export default function BannerSection() {
  const navigate = useNavigate()

  const [showAllCategories, setShowAllCategories] = useState(false)

  // Get all
  const allCategories = useMemo(() => {
    return navbarData
      .filter((item) => item.type !== 'simple')
      .map((item) => item.label)
  }, [])

  // Show the first 5 or all categories
  const displayedCategories = useMemo(() => {
    return showAllCategories ? allCategories : allCategories.slice(0, 5)
  }, [allCategories, showAllCategories])

  const hasMoreCategories = allCategories.length > 5
  const handleCategoryClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const categoryPath = e.currentTarget.pathname.slice(1)
    navigate(`/${categoryPath}`)
  }

  const handleToggleCategories = () => {
    setShowAllCategories(!showAllCategories)
  }
  return (
    <BannerContainer className="section">
      <CategoryMenu>
        <CategoryTitle>Category menu</CategoryTitle>
        <CategoryList>
          {displayedCategories.map((category, index) => (
            <CategoryLink
              key={category.toLowerCase().replace(/\s+/g, '-')}
              $isNew={showAllCategories && index >= 5}
            >
              <Link
                href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={handleCategoryClick}
              >
                {category}
              </Link>
            </CategoryLink>
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

      <Banner>
        <BannerSubtitle>Farm fresh</BannerSubtitle>
        <BannerHeading>Get garden fresh fruits and vegetables</BannerHeading>
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

      <Banner>
        <BannerSubtitle>Fresh bakery</BannerSubtitle>
        <BannerHeading>Freshly baked breads and pastries daily</BannerHeading>
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
    </BannerContainer>
  )
}
