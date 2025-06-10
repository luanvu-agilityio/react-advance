import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Stores and Hooks
import { useCategoryStore } from '@stores/categoryStore'
import { useProductFetch } from '@hooks/useProductFetch'
import { useUrlParamSync } from '@hooks/useUrlParamSync'
import { useProductsByCategory } from '@hooks/useProductsByCategory'
import { useFilterOptions } from '@hooks/useFilterOptions'

// Components
import FilterComponents from '@components/Filter/FilteringComponents'
import ProductListing from '@components/ProductCard/ProductListing'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorDisplay from '@components/common/ErrorDisplay'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import { CategoryPageHeader } from './CategoryPageHeader'
import { NoResultsSection } from './NoResultSection'
import { getCategoryTitle } from '@utils/categoryUtils'
// Styles
import {
  ContentContainer,
  PageContainer,
  FilterControlsWrapper,
} from './CategoryStyles'
import type { StarRating } from 'types/Filter'
import { ProductsPerPage } from '@components/Pagination/ProductPerPage/ProductsPerPage'
import { Sorting } from '@components/Sorting/Sorting'
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'
import SelectedTags from '@components/SelectedTag/SelectedTag'
import { useProductTagStore } from '@stores/tagStore'
const CategoryPage = () => {
  const { categoryPath } = useParams()
  const [accurateProductCount, setAccurateProductCount] = useState<
    number | null
  >(null)
  // Get legacy data for filters (until we fully migrate)
  const { currentCategory, productsInCategory, searchQuery } =
    useProductsByCategory()

  // Store state and actions
  const {
    currentPage,
    displayLimit,
    selectedBrands,
    selectedRatings,
    priceRange,
    subcategory,
    viewMode,
    getProductCountBySubcategory,
    setPage,
    setCategory,
    setSubcategory,
    setBrands,
    setRatings,
    setPriceRange,
    setViewMode,
    resetFilters,
    setSearchQuery,
  } = useCategoryStore()

  const { selectedTags, clearTags } = useProductTagStore()

  // URL synchronization
  useUrlParamSync()

  // API data fetching
  const { data, isLoading, error, refetch } = useProductFetch(true)

  // Filter data for UI
  const { subcategories, categoryBrands } = useFilterOptions({
    currentCategory: currentCategory || null,
    productsInCategory,
    activeSubcategory: subcategory || '',
    selectedBrands,
    categoryPath,
    isSearchMode: false,
  })

  useEffect(() => {
    // If tags have changed, apply appropriate filters
    if (selectedTags.length > 0) {
      // Apply filters based on tag types
      const categoryTags = selectedTags.filter((tag) => tag.type === 'category')
      const subcategoryTags = selectedTags.filter(
        (tag) => tag.type === 'subcategory'
      )
      const brandTags = selectedTags.filter((tag) => tag.type === 'brand')

      // Set brands if there are brand tags
      if (brandTags.length > 0) {
        setBrands(brandTags.map((tag) => tag.value))
      }

      // Set category/subcategory if applicable
      if (categoryTags.length > 0) {
        setCategory(categoryTags[0].value)
      }

      if (subcategoryTags.length > 0) {
        setSubcategory(subcategoryTags[0].value)
      }
    }
  }, [selectedTags, setBrands, setCategory, setSubcategory])

  // Set category when route changes
  useEffect(() => {
    if (categoryPath) {
      setCategory(categoryPath)
    }
  }, [categoryPath, setCategory])

  // Set search query when it changes
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery)
    }
  }, [searchQuery, setSearchQuery])

  // Handlers
  const handlePageChange = (page: number) => {
    setPage(page)
    window.scrollTo(0, 0)
  }

  const handleSubcategoryClick = (subcategoryName: string) => {
    const newSubcategory =
      subcategoryName === subcategory ? '' : subcategoryName

    setSubcategory(newSubcategory || undefined)
  }

  const handleBrandSelect = (brandName: string, isSelected: boolean) => {
    const newBrands = isSelected
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((brand) => brand !== brandName)
    setBrands(newBrands)
  }

  const handleRatingSelect = (rating: number, isSelected: boolean) => {
    const newRatings = isSelected
      ? [...selectedRatings, rating].sort((a, b) => b - a)
      : selectedRatings.filter((r) => r !== rating)
    setRatings(newRatings)
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max })
  }

  const handleResetFilters = () => {
    resetFilters()
    clearTags()
  }

  useEffect(() => {
    const fetchAccurateCount = async () => {
      if (subcategory) {
        const count = await getProductCountBySubcategory(subcategory)

        setAccurateProductCount(count)
      } else {
        setAccurateProductCount(null)
      }
    }

    fetchAccurateCount()
  }, [subcategory, getProductCountBySubcategory])

  const totalProductCount = accurateProductCount ?? data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(totalProductCount / displayLimit))

  useEffect(() => {
    // Refetch when limit changes
    refetch()
  }, [displayLimit, refetch])

  // Render content
  const renderContent = () => {
    if (error) {
      return <ErrorDisplay error={error.message} onRetry={refetch} />
    }

    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
        </div>
      )
    }

    if (data?.data && data.data.length > 0) {
      // If current page is beyond total pages, redirect to page 1
      if (currentPage > totalPages) {
        setTimeout(() => setPage(1), 0)
        return <LoadingSpinner />
      }

      return (
        <ProductListing
          products={data.data}
          viewMode={viewMode}
          currentPage={currentPage}
          totalProducts={totalProductCount}
          productsPerPage={displayLimit}
          onPageChange={handlePageChange}
        />
      )
    }

    return (
      <NoResultsSection
        searchQuery={searchQuery}
        onResetFilters={handleResetFilters}
      />
    )
  }

  const displayTitle = getCategoryTitle(
    location.pathname,
    searchQuery,
    categoryPath,
    currentCategory?.label
  )

  // Add this effect to reset filters on all-products route:
  useEffect(() => {
    if (location.pathname === '/all-products') {
      resetFilters()
      setCategory(undefined) // Clear any category filter
    }
  }, [location.pathname, resetFilters, setCategory])
  return (
    <PageContainer className="section">
      <Breadcrumbs style={{ padding: '12px 0' }} />

      <CategoryPageHeader
        title={displayTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        productCount={totalProductCount}
      />

      <FilterControlsWrapper>
        <Sorting />
        <ProductsPerPage />
      </FilterControlsWrapper>

      <SelectedTags />

      <ContentContainer>
        <ErrorBoundary fallback={<div>Filter options couldn't be loaded</div>}>
          <FilterComponents
            categories={subcategories}
            brands={categoryBrands.map((brand) => ({
              name: brand.name,
              selected: selectedBrands.includes(brand.name),
              count: brand.count ?? 0,
            }))}
            ratings={[5, 4, 3, 2, 1].map((rating) => ({
              rating: rating as StarRating,
              selected: selectedRatings.includes(rating),
            }))}
            priceRange={priceRange}
            onCategoryClick={handleSubcategoryClick}
            onBrandSelect={handleBrandSelect}
            onRatingSelect={handleRatingSelect}
            onPriceRangeChange={handlePriceRangeChange}
            initialActiveCategory={subcategory ?? ''}
          />
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Products couldn't be loaded</div>}>
          {renderContent()}
        </ErrorBoundary>
      </ContentContainer>
    </PageContainer>
  )
}

export default CategoryPage
