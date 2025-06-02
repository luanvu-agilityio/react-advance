import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Stores and Hooks
import { useCategoryStore } from '@stores/categoryStore'
import { useProductsQuery } from '@hooks/useProductsQuery'
import { useCategoryUrlSync } from '@hooks/useCategoryUrlSync'
import { useCategoryData } from '@hooks/useCategoryData'
import { useFilterData } from '@hooks/useFilterData'

// Components
import FilterComponents from '@components/Filter/FilteringComponents'
import ProductListing from '@components/ProductCard/ProductListing'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorDisplay from '@components/common/ErrorDisplay'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import { CategoryPageHeader } from './CategoryPageHeader'
import { NoResultsSection } from './NoResultSection'

// Styles
import {
  ContentContainer,
  PageContainer,
  FilterControlsWrapper,
} from './CategoryStyles'
import type { StarRating } from 'types/Filter'
import { ProductsPerPage } from '@components/Pagination/ProductsPerPage'
import { Sorting } from '@components/Sorting/SortingComponent'

const CategoryPageNew = () => {
  const { categoryPath } = useParams()

  // Get legacy data for filters (until we fully migrate)
  const { currentCategory, productsInCategory, searchQuery } = useCategoryData()

  // Store state and actions
  const {
    currentPage,
    limit,
    selectedBrands,
    selectedRatings,
    priceRange,
    subcategory,
    viewMode,
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

  // URL synchronization
  useCategoryUrlSync()

  // API data fetching
  const { data, isLoading, error, refetch } = useProductsQuery(true)

  // Filter data for UI
  const { subcategories, categoryBrands } = useFilterData({
    currentCategory: currentCategory || null,
    productsInCategory,
    activeSubcategory: subcategory || '',
    selectedBrands,
    categoryPath,
    isSearchMode: false,
  })

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
  }

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
      return (
        <ProductListing
          products={data.data}
          viewMode={viewMode}
          currentPage={currentPage}
          totalProducts={data.total}
          productsPerPage={limit}
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

  const displayedProductCount = data?.total ?? 0

  const displayTitle = searchQuery
    ? `Search Results for "${searchQuery}" (${displayedProductCount})`
    : `${currentCategory?.label ?? categoryPath} (${displayedProductCount})`
  return (
    <PageContainer className="section">
      <Breadcrumbs style={{ padding: '12px 0' }} />

      <CategoryPageHeader
        title={displayTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        productCount={data?.total ?? 0}
      />

      <FilterControlsWrapper>
        <Sorting />
        <ProductsPerPage />
      </FilterControlsWrapper>

      <ContentContainer>
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
          initialActiveCategory={subcategory || ''}
        />

        {renderContent()}
      </ContentContainer>
    </PageContainer>
  )
}

export default CategoryPageNew
