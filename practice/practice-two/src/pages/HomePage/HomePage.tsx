import { Box } from '@radix-ui/themes'
import CustomerFeedbackCarousel from '@components/layout/Carousel/Carousel'
import BlogPreviewSection from '@components/layout/BlogPreview/BlogPreview'
import ProductSection from '@components/product/Section/ProductSection'
import BestSellingProducts from '@components/product/Section/BestSellingSection'
import BannerSection from '@components/product/Section/BannerSection'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import ContentContainer from '@components/common/ContentContainer'

import styled from 'styled-components'

// Add these styled components for responsive layout
const ResponsiveBox = styled(Box)`
  @media (max-width: 767px) {
    gap: 32px !important;
  }
`

const SectionWrapper = styled.div`
  width: 100%;

  @media (max-width: 767px) {
    padding: 0;

    &.blog-section {
      background-color: var(--black-shade-6);
    }

    &.feedback-section {
      background-color: white;
    }
  }
`

const HomePage = () => (
  <Box width="100%">
    {/* Breadcrumb - Hide on mobile */}
    <Box
      style={
        {
          borderBottom: '1px solid var(--black-shade-6)',
          padding: '12px 0',
          display: 'none',
          '@media screen and (min-width: 768px)': {
            display: 'block',
          },
        } as React.CSSProperties
      }
    >
      <ContentContainer>
        <Breadcrumbs />
      </ContentContainer>
    </Box>

    {/* Main content */}
    <ResponsiveBox style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Banner Section */}
      <Box py="4">
        <BannerSection />
      </Box>

      {/* Best selling products section */}
      <Box py="4">
        <BestSellingProducts
          sectionType="best-selling"
          title="Best selling products"
          maxItems={3}
        />
      </Box>

      {/* Featured products section */}
      <Box py="4">
        <BestSellingProducts
          sectionType="featured"
          title="Best from our farmer"
          maxItems={3}
        />
      </Box>

      {/* Customer Feedback Section */}
      <Box py="4">
        <ContentContainer>
          <CustomerFeedbackCarousel />
        </ContentContainer>
      </Box>

      {/* Products You May Like Section */}

      <Box py="4">
        <ProductSection
          title="Products You May Like"
          showRandomProducts={true}
          maxItems={4}
        />
      </Box>

      {/* Blog Section */}
      <SectionWrapper className="blog-section">
        <Box py="4">
          <ContentContainer>
            <BlogPreviewSection />
          </ContentContainer>
        </Box>
      </SectionWrapper>
    </ResponsiveBox>
  </Box>
)

export default HomePage
