import { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'

// Stores and Hooks
import { useCategoryStore } from '@stores/categoryStore'
import { useProductFetch } from '@hooks/useProductFetch'
import { useUrlParamSync } from '@hooks/useUrlParamSync'
import { useProductsByCategory } from '@hooks/useProductsByCategory'
import { useFilterOptions } from '@hooks/useFilterOptions'
import { useProductTagStore } from '@stores/tagStore'

// Components
import FilterComponents from '@components/Filter/FilteringComponents'
import ProductListing from '@components/ProductCard/ProductListing'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorDisplay from '@components/common/ErrorDisplay'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import { CategoryPageHeader } from './CategoryPageHeader'
import { NoResultsSection } from './NoResultSection'
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'
import SelectedTags from '@components/SelectedTag/SelectedTag'
import { ProductsPerPage } from '@components/Pagination/ProductPerPage/ProductsPerPage'
import { Sorting } from '@components/Sorting/Sorting'

// Utils & Types
import { getCategoryTitle } from '@utils/categoryUtils'
import type { StarRating } from 'types/Filter'

// Styles
import {
  ContentContainer,
  PageContainer,
  FilterControlsWrapper,
} from './CategoryStyles'

/**
 * CategoryPage component displaying product listings with filtering capabilities
 */
const CategoryPage = () => {
  // --------- STATE & STORE ACCESS ---------
  const location = useLocation()
  const { categoryPath } = useParams()
  const [productCount, setProductCount] = useState<number | null>(null)

  // Get category data from URL and hook
  const { currentCategory, productsInCategory, searchQuery } =
    useProductsByCategory()

  // Get store state and actions
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

  // --------- DATA FETCHING ---------
  // URL synchronization
  useUrlParamSync()

  // API data fetching
  const { data, isLoading, error, refetch } = useProductFetch(true)

  // Filter data for UI
  const { subcategories, categoryBrands } = useFilterOptions({
    currentCategory: currentCategory || null,
    productsInCategory,
    activeSubcategory: subcategory ?? '',
    selectedBrands,
    categoryPath,
    isSearchMode: false,
  })

  // --------- DERIVED STATE ---------
  const totalProductCount = productCount ?? data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(totalProductCount / displayLimit))

  const displayTitle = useMemo(
    () =>
      getCategoryTitle(
        location.pathname,
        searchQuery,
        categoryPath,
        currentCategory?.label
      ),
    [location.pathname, searchQuery, categoryPath, currentCategory?.label]
  )

  // --------- SIDE EFFECTS ---------
  // Effect: Apply tag filters when tags change
  useEffect(() => {
    if (selectedTags.length === 0) return

    // Apply filters based on tag types
    const categoryTags = selectedTags.filter((tag) => tag.type === 'category')
    const subcategoryTags = selectedTags.filter(
      (tag) => tag.type === 'subcategory'
    )
    const brandTags = selectedTags.filter((tag) => tag.type === 'brand')

    if (brandTags.length > 0) {
      setBrands(brandTags.map((tag) => tag.value))
    }

    if (categoryTags.length > 0) {
      setCategory(categoryTags[0].value)
    }

    if (subcategoryTags.length > 0) {
      setSubcategory(subcategoryTags[0].value)
    }
  }, [selectedTags, setBrands, setCategory, setSubcategory])

  // Effect: Set category when route changes
  useEffect(() => {
    if (categoryPath) {
      setCategory(categoryPath)
    }
  }, [categoryPath, setCategory])

  // Effect: Set search query when it changes
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery)
    }
  }, [searchQuery, setSearchQuery])

  // Effect: Reset filters on all-products route
  useEffect(() => {
    if (location.pathname === '/all-products') {
      resetFilters()
      setCategory(undefined) // Clear any category filter
    }
  }, [location.pathname, resetFilters, setCategory])

  // Effect: Get accurate product count by subcategory
  useEffect(() => {
    const fetchAccurateCount = async () => {
      if (subcategory) {
        const count = await getProductCountBySubcategory(subcategory)
        setProductCount(count)
      } else {
        setProductCount(null)
      }
    }

    fetchAccurateCount()
  }, [subcategory, getProductCountBySubcategory])

  // Effect: Refetch when limit changes
  useEffect(() => {
    refetch()
  }, [displayLimit, refetch])

  // --------- EVENT HANDLERS ---------
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

  // --------- RENDER METHODS ---------
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

  // --------- COMPONENT RENDER ---------
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
