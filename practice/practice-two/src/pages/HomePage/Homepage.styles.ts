import styled from 'styled-components'
import { Box } from '@radix-ui/themes'
import Link from '@components/common/Link'
// Responsive container with consistent breakpoints
export const ResponsiveContainer = styled(Box)`
  width: 100%;

  /* Mobile: Full width with padding */
  padding: 0 16px;

  /* Tablet: Full width with padding */
  @media (min-width: 768px) {
    padding: 0 32px;
  }

  /* Desktop: Keep current behavior under 1260px */
  @media (min-width: 1024px) {
    padding: 0 45px;
  }

  /* Design width: Fixed 1260px */
  @media (min-width: 1260px) {
    width: 1260px;
    margin: 0 auto;
    padding: 0;
  }

  /* Large screens: Max 1400px centered */
  @media (min-width: 1400px) {
    width: 1400px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
  }
`

export const MainContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  /* Mobile spacing */
  gap: 24px;

  /* Tablet and up spacing */
  @media (min-width: 768px) {
    gap: 32px;
  }

  /* Desktop spacing */
  @media (min-width: 1024px) {
    gap: 40px;
  }
`

export const BreadcrumbWrapper = styled(Box)`
  border-bottom: 1px solid var(--black-shade-6);
  padding: 12px 0;

  /* Hide on mobile */
  display: none;

  /* Show on tablet and up */
  @media (min-width: 768px) {
    display: block;
    margin: 0 auto;
    width: 1260px;
    padding: 12px 45px;
  }
`

export const SectionWrapper = styled.div`
  width: 100%;
  margin-bottom: 64px;

  /* Mobile specific styles */
  @media (max-width: 767px) {
    &.blog-section {
      margin: 0 -16px;
      padding: 0 16px;
    }

    &.feedback-section {
      background-color: white;
    }

    &.banner-section {
      margin: 0 -16px;
      padding: 0 16px;
    }
  }

  /* Tablet styles */
  @media (min-width: 768px) and (max-width: 1023px) {
    &.blog-section {
      margin: 0 -32px;
      padding: 0 32px;
    }

    &.banner-section {
      margin: 0 -32px;
      padding: 0 32px;
    }
  }

  /* Desktop styles */
  @media (min-width: 1024px) and (max-width: 1259px) {
    &.blog-section {
      margin: 0 -45px;
      padding: 0 45px;
    }

    &.banner-section {
      margin: 0 -45px;
      padding: 0 45px;
    }
  }
`
// Banner section styles

export const BannerContainer = styled.div`
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
  }

  // Large screens
  @media (min-width: 1460px) {
    width: 90%;
    max-width: 1460px;
  }
`

export const CategoryMenu = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 268px;
    flex-shrink: 0;
  }
`

export const CategoryTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
`

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1023px) {
    display: none;
  }
`

export const CategoryLink = styled.div<{ $isNew?: boolean }>`
  opacity: ${(props) => (props.$isNew ? 0 : 1)};
  animation: ${(props) =>
    props.$isNew ? 'fadeIn 0.3s ease-in-out forwards' : 'none'};

  a {
    color: var(--green-color-default);
    font-size: 14px;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const Banner = styled.div`
  background-color: var(--green-shade-4);
  padding: 32px 32px 0;
  border-radius: 12px;
  background-size: cover;
  position: relative;
  background-image: url('https://res.cloudinary.com/ds82onf5q/image/upload/v1748372412/homepage-banner_zaaroy.png');
  background-position: center;
  background-repeat: no-repeat;
  height: auto;
  width: 100%;

  @media (min-width: 1024px) {
    width: 419px;
    height: 280px;
  }

  @media (min-width: 1460px) {
    flex: 1;
    min-width: 369px;
  }
`

export const BannerSubtitle = styled.div`
  color: var(--green-color-default);
  font-size: 12px;
  padding-top: 16px;
  font-weight: var(--font-weight-semibold);
`

export const BannerHeading = styled.h2`
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 68px;
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-primary);
`

export const ButtonContainer = styled.div`
  margin-top: auto;
`

export const MoreCategoriesButton = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`
// Bestselling section styles
export const Container = styled.div`
  width: 100%;
  background-color: white;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--black-color-default);

  &.section-title {
    font-size: 18px;
    font-weight: var(--font-weight-semibold);
    color: var(--black-color-default);
  }

  @media (max-width: 1023px) {
    margin-bottom: 1.5rem;
  }
`

export const StyledLink = styled.div`
  margin-bottom: 0.25rem;
`

export const ProductsGrid = styled.div`
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

//Blog section styles
export const SectionContainer = styled.section`
  margin: 0 auto;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

export const PostsGrid = styled.div`
  display: grid;
  gap: 32px;

  // Mobile
  grid-template-columns: 1fr;

  // Tablet
  @media (min-width: 640px) and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  // Design width (1260px)
  @media (min-width: 1024px) {
    grid-template-columns: 469px 270px 1fr;
  }
`
export const LargeCardContainer = styled.div`
  grid-column: span 1;

  @media (min-width: 640px) {
    grid-column: span 2;
  }

  @media (min-width: 1024px) {
    grid-column: span 1;
  }
`

export const MediumCardContainer = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 270px;
  }
`

export const SmallCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1024px) {
    width: auto;
  }
`

export const LargeCard = styled.article`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
  width: 100%;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 400px;
  }

  @media (min-width: 1024px) {
    width: 469px;
    max-width: 100%;
  }
`

export const MediumCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
`

export const SmallCard = styled.article`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const LargeCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const MediumCardImage = styled.img`
  height: 180px;
  width: 100%;
  max-width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;

  @media (min-width: 1024px) {
    width: 269px;
  }
`

export const SmallCardImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  margin-left: auto;
  object-fit: cover;
`

export const LargeCardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 206px;
  padding: 24px;
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
`

export const MediumCardContent = styled.div``

export const SmallCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TextContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
`

export const BadgeContainer = styled.div`
  margin-bottom: 0.5rem;
`

export const LargeCardTitle = styled.h3`
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  color: var(--white-color);
  margin: 0.5rem 0;
`

export const MediumCardTitle = styled.h3`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin-bottom: 16px;
`

export const SmallCardTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  color: var(--black-color-default);
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`

export const LargeCardMeta = styled(CardMeta)`
  color: #e5e7eb;
`

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--black-shade-6);
`

export const AuthorName = styled.span`
  margin-right: 0.5rem;
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
`

export const PostDate = styled.span`
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  margin: 0 1rem;
`
// Products section styles
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const StyledLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  gap: 6px;
`

export const ProductFlex = styled.div`
  display: flex;

  gap: 32px;
`
