import { Box } from '@radix-ui/themes'
import CustomerFeedbackCarousel from '@components/Carousel/Carousel'
import BlogPreviewSection from '@pages/HomePage/sections/BlogPreview'
import BannerSection from './sections/BannerSection'
import BestSellingProducts from './sections/BestSellingSection'
import ProductSection from './sections/ProductSection'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import {
  BreadcrumbWrapper,
  MainContentWrapper,
  ResponsiveContainer,
  SectionWrapper,
} from './Homepage.styles'

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
        <SectionWrapper>
          <BestSellingProducts
            sectionType="best-selling"
            title="Best selling products"
            maxItems={3}
          />
        </SectionWrapper>

        {/* Featured products section */}
        <SectionWrapper>
          <BestSellingProducts
            sectionType="featured"
            title="Best from our farmer"
            maxItems={3}
          />
        </SectionWrapper>

        {/* Customer Feedback Section */}
        <SectionWrapper className="feedback-section">
          <CustomerFeedbackCarousel />
        </SectionWrapper>

        {/* Products You May Like Section */}
        <SectionWrapper>
          <ProductSection
            title="Products You May Like"
            showRandomProducts={true}
            maxItems={4}
          />
        </SectionWrapper>

        {/* Blog Section */}
        <SectionWrapper className="blog-section">
          <BlogPreviewSection />
        </SectionWrapper>
      </MainContentWrapper>
    </ResponsiveContainer>
  </Box>
)

export default HomePage
