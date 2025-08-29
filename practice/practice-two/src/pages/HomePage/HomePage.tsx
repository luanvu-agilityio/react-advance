import { memo, lazy, Suspense } from 'react'
import { Box } from '@radix-ui/themes'
import BannerSection from './sections/Banner'
import BestSellingProducts from './sections/BestSelling'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import {
  BreadcrumbWrapper,
  MainContentWrapper,
  ResponsiveContainer,
  SectionWrapper,
} from './Homepage.styles'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
// Lazy load components that are lower in the page
const LazyProductSection = lazy(() => import('./sections/Product'))
const LazyBlogPreviewSection = lazy(() => import('./sections/BlogPreview'))
const LazyFeedbackCarousel = lazy(() => import('@components/Carousel/Carousel'))

const HomePage = () => (
  <Box width="100%">
    {/* Top content loads immediately */}
    <BreadcrumbWrapper>
      <ResponsiveContainer>
        <Breadcrumbs />
      </ResponsiveContainer>
    </BreadcrumbWrapper>

    <ResponsiveContainer>
      <MainContentWrapper>
        <SectionWrapper className="banner-section">
          <BannerSection />
        </SectionWrapper>

        <SectionWrapper>
          <BestSellingProducts
            sectionType="best-selling"
            title="Best selling products"
            maxItems={3}
          />
        </SectionWrapper>

        <SectionWrapper>
          <BestSellingProducts
            sectionType="featured"
            title="Best from our farmer"
            maxItems={3}
          />
        </SectionWrapper>

        {/* Lazy load below-the-fold content */}
        <Suspense fallback={<LoadingSpinner minHeight="200px" />}>
          <SectionWrapper className="feedback-section">
            <LazyFeedbackCarousel />
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSpinner minHeight="200px" />}>
          <SectionWrapper>
            <LazyProductSection title="Products You May Like" maxItems={4} />
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSpinner minHeight="200px" />}>
          <SectionWrapper className="blog-section">
            <LazyBlogPreviewSection />
          </SectionWrapper>
        </Suspense>
      </MainContentWrapper>
    </ResponsiveContainer>
  </Box>
)

export default memo(HomePage)
