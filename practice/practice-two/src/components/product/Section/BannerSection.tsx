import styled from 'styled-components'
import Link from '@components/common/Link'
import { Button, Flex } from '@radix-ui/themes'
import { useMemo, type MouseEvent } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getRandomItems } from '@helpers/getRandomItems'
import { navbarData } from '@dummy-data/navbar'

const BannerContainer = styled.div`
  display: flex;
  gap: 32px;

  // Mobile
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 16px;
  }

  // Design width (1260px)
  @media (min-width: 1260px) {
    width: 1260px;
    margin: 0 auto;
  }

  // Large screens
  @media (min-width: 1460px) {
    width: 90%;
    max-width: 1460px;
    margin: 0 auto;
  }
`

const CategoryMenu = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 268px;
    flex-shrink: 0;
  }
`

const CategoryTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 1023px) {
    display: none;
  }
`

const CategoryLink = styled.div`
  a {
    color: var(--green-color-default);
    font-size: 14px;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
  }
`

const Banner = styled.div`
  background-color: var(--green-shade-4);
  padding: 32px;
  border-radius: 12px;
  background-size: cover;
  position: relative;
  background-image: url('/src/assets/images/banners/homepage-banner.png');
  background-position: center;
  background-repeat: no-repeat;

  width: 100%;

  @media (min-width: 1024px) {
    width: 419px;
  }

  @media (min-width: 1460px) {
    flex: 1;
    min-width: 369px;
  }
`

const BannerSubtitle = styled.div`
  color: var(--green-color-default);
  font-size: 12px;
  padding-top: 16px;
  font-weight: var(--font-weight-semibold);
`

const BannerHeading = styled.h2`
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 100px;
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-primary);
`

const ButtonContainer = styled.div`
  margin-top: auto;
`

const MoreProductsButton = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`

export default function BannerSection() {
  const navigate = useNavigate()

  // Get random categories
  const randomCategories = useMemo(() => {
    const categories = navbarData
      .filter((item) => item.type !== 'simple')
      .map((item) => item.label)
    return getRandomItems(categories, 5)
  }, [])

  const handleCategoryClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const categoryPath = e.currentTarget.pathname.slice(1)
    navigate(`/${categoryPath}`)
  }

  return (
    <BannerContainer className="section">
      <CategoryMenu>
        <CategoryTitle>Category menu</CategoryTitle>
        <CategoryList>
          {randomCategories.map((category) => (
            <CategoryLink key={category.toLowerCase().replace(/\s+/g, '-')}>
              <Link
                href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={handleCategoryClick}
              >
                {category}
              </Link>
            </CategoryLink>
          ))}
        </CategoryList>
        <MoreProductsButton>
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
        </MoreProductsButton>
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
