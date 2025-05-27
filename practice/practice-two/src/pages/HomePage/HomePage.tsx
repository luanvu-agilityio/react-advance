import { Box } from '@radix-ui/themes'
import CustomerFeedbackCarousel from '@components/layout/Carousel/Carousel'
import BlogPreviewSection from '@components/layout/BlogPreview/BlogPreview'
import ProductSection from '@components/product/Section/ProductSection'
import BestSellingProducts from '@components/product/Section/BestSellingSection'
import BannerSection from '@components/product/Section/BannerSection'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import ContentContainer from '@components/common/ContentContainer'

import styled from 'styled-components'

// Responsive container with consistent breakpoints
const ResponsiveContainer = styled(Box)`
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

const MainContentWrapper = styled(Box)`
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

const BreadcrumbWrapper = styled(Box)`
  border-bottom: 1px solid var(--black-shade-6);
  padding: 12px 0;

  /* Hide on mobile */
  display: none;

  /* Show on tablet and up */
  @media (min-width: 768px) {
    display: block;
    margin: 0 auto;
    width: 1260px;
  }
`

const SectionWrapper = styled.div`
  width: 100%;

  /* Mobile specific styles */
  @media (max-width: 767px) {
    &.blog-section {
      background-color: var(--black-shade-6);
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
      background-color: var(--black-shade-6);
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
      background-color: var(--black-shade-6);
      margin: 0 -45px;
      padding: 0 45px;
    }

    &.banner-section {
      margin: 0 -45px;
      padding: 0 45px;
    }
  }
`

const HomePage = () => (
  <Box width="100%">
    {/* Breadcrumb - Hide on mobile */}
    <BreadcrumbWrapper>
      <ResponsiveContainer>
        <Breadcrumbs />
      </ResponsiveContainer>
    </BreadcrumbWrapper>

    {/* Main content */}
    <ResponsiveContainer>
      <MainContentWrapper>
        {/* Banner Section */}
        <SectionWrapper className="banner-section">
          <BannerSection />
        </SectionWrapper>

        {/* Best selling products section */}
        <BestSellingProducts
          sectionType="best-selling"
          title="Best selling products"
          maxItems={3}
        />

        {/* Featured products section */}
        <BestSellingProducts
          sectionType="featured"
          title="Best from our farmer"
          maxItems={3}
        />

        {/* Customer Feedback Section */}
        <SectionWrapper className="feedback-section">
          <CustomerFeedbackCarousel />
        </SectionWrapper>

        {/* Products You May Like Section */}
        <ProductSection
          title="Products You May Like"
          showRandomProducts={true}
          maxItems={4}
        />

        {/* Blog Section */}
        <SectionWrapper className="blog-section">
          <BlogPreviewSection />
        </SectionWrapper>
      </MainContentWrapper>
    </ResponsiveContainer>
  </Box>
)

export default HomePage
