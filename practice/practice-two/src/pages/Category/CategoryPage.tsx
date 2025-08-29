'use client'

import {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useOptimistic,
  Suspense,
} from 'react'
import { useParams, useLocation } from 'react-router-dom'

// Stores and Hooks
import { useCategoryStore, type CategoryState } from '@stores/categoryStore'
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
import debounce from 'lodash/debounce'
import type { ProductTag } from '@utils/tagUtils'
// Styles
import {
  ContentContainer,
  PageContainer,
  FilterControlsWrapper,
} from './CategoryStyles'

import { useToastStore } from '@stores/toastStore'
import type { Product } from 'types/Product'
import { ProductCountSuspense } from './ProductCountSuspense'

/**
 * CategoryPage component displaying product listings with filtering capabilities
 */
const CategoryPage = () => {
  // --------- STATE & STORE ACCESS ---------
  const location = useLocation()
  const { categoryPath } = useParams()

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
    updateFilters,

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
  const prevSubcategoryRef = useRef(subcategory)

  const { selectedTags, clearTags } = useProductTagStore()

  // --------- DATA FETCHING ---------
  // URL synchronization
  useUrlParamSync()

  // API data fetching
  const { data, isLoading, error, refetch } = useProductFetch(true)

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    data?.data ?? [],
    (currentProducts: Product[], predictedProducts: Product[]) => {
      const merged = [
        ...predictedProducts,
        ...currentProducts.filter(
          (p) => !predictedProducts.some((np) => np.id === p.id)
        ),
      ]
      return merged
    }
  )

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
  const totalProductCount = data?.total ?? 0
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
  const updateFiltersFromTags = useCallback(
    (tags: ProductTag[]) => {
      const debouncedUpdate = debounce((tagsToProcess: ProductTag[]) => {
        if (tagsToProcess.length === 0) return

        const updates = {} as Partial<CategoryState>

        const categoryTags = tagsToProcess.filter(
          (tag) => tag.type === 'category'
        )
        const subcategoryTags = tagsToProcess.filter(
          (tag) => tag.type === 'subcategory'
        )
        const brandTags = tagsToProcess.filter((tag) => tag.type === 'brand')

        if (brandTags.length > 0) {
          updates.selectedBrands = brandTags.map((tag) => tag.value)
        }

        if (categoryTags.length > 0) {
          updates.category = categoryTags[0].value
        }

        if (subcategoryTags.length > 0) {
          updates.subcategory = subcategoryTags[0].value
        }

        // Batch update all changes together
        updateFilters(updates)
      }, 200)

      debouncedUpdate(tags)
    },
    [updateFilters]
  )

  // Use effect with the coordinating function
  useEffect(() => {
    updateFiltersFromTags(selectedTags)
  }, [selectedTags, updateFiltersFromTags])

  const prevCategoryRef = useRef(categoryPath)

  // Use effect with the coordinating function
  useEffect(() => {
    // Handle category from route params
    if (categoryPath) {
      // If category has changed, reset filters
      if (prevCategoryRef.current !== categoryPath) {
        resetFilters()
        prevCategoryRef.current = categoryPath
      }
      setCategory(categoryPath)
    }

    // Handle search query changes
    if (searchQuery) {
      setSearchQuery(searchQuery)
    }

    // Handle all-products route
    if (location.pathname === '/all-products') {
      resetFilters()
      setCategory(undefined)
    }
  }, [
    categoryPath,
    searchQuery,
    location.pathname,
    setCategory,
    setSearchQuery,
    resetFilters,
  ])

  // --------- EVENT HANDLERS ---------
  const handlePageChange = (page: number) => {
    setPage(page)
    window.scrollTo(0, 0)
  }

  const handleSubcategoryClick = async (subcategoryName: string) => {
    prevSubcategoryRef.current = subcategory
    const newSubcategory =
      subcategoryName === subcategory ? '' : subcategoryName

    const predictedProducts = (data?.data ?? []).filter((product) =>
      newSubcategory ? product.subcategory === newSubcategory : true
    )

    setOptimisticProducts(predictedProducts)
    setSubcategory(newSubcategory || undefined)

    await new Promise((res) => setTimeout(res, 1200))

    try {
      await refetch()
      // throw new Error('Simulated subcategory filter error')
    } catch (err) {
      // Revert to previous subcategory and products if failed
      setSubcategory(prevSubcategoryRef.current)
      setOptimisticProducts(data?.data ?? [])
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Could not update the product list for this subcategory'
      useToastStore.getState().addToast({
        title: 'Failed to apply subcategory filter',
        description: errorMessage,
        variant: 'error',
        duration: 1500,
      })
    }
  }

  const handleBrandSelect = async (brandName: string, isSelected: boolean) => {
    const prevBrands = selectedBrands
    const newBrands = isSelected
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((brand) => brand !== brandName)

    const predictedProducts = (data?.data ?? []).filter((product) =>
      newBrands.length === 0 ? true : newBrands.includes(product.brand)
    )

    setOptimisticProducts(predictedProducts)
    setBrands(newBrands)

    try {
      await refetch()
      // throw new Error('Simulated brand filter error')
    } catch (err) {
      setBrands(prevBrands)
      setOptimisticProducts(data?.data ?? [])
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Could not update the product list for this brand.'
      useToastStore.getState().addToast({
        title: 'Failed to apply brand filter',
        description: errorMessage,
        variant: 'error',
        duration: 1500,
      })
    }
  }

  const handleRatingSelect = async (rating: number, isSelected: boolean) => {
    const prevRatings = selectedRatings
    const newRatings = isSelected
      ? [...selectedRatings, rating].sort((a, b) => b - a)
      : selectedRatings.filter((r) => r !== rating)

    const predictedProducts = (data?.data ?? []).filter((product) =>
      newRatings.length === 0
        ? true
        : newRatings.includes(Math.floor(product.rating))
    )

    setOptimisticProducts(predictedProducts)
    setRatings(newRatings)

    await new Promise((res) => setTimeout(res, 1200))

    try {
      await refetch()
      throw new Error('Simulated rating filter error')
    } catch (err) {
      setRatings(prevRatings)
      setOptimisticProducts(data?.data ?? [])
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Could not update the product list for this rating.'
      useToastStore.getState().addToast({
        title: 'Failed to apply rating filter',
        description: errorMessage,
        variant: 'error',
        duration: 1500,
      })
    }
  }

  const handlePriceRangeChange = async (min: number, max: number) => {
    const prevPriceRange = priceRange
    const newPriceRange = { min, max }

    const predictedProducts = (data?.data ?? []).filter(
      (product) => product.price >= min && product.price <= max
    )

    setOptimisticProducts(predictedProducts)
    setPriceRange(newPriceRange)

    await new Promise((res) => setTimeout(res, 1200))

    try {
      await refetch()
      // throw new Error('Simulated price filter error')
    } catch (err) {
      setPriceRange(prevPriceRange)
      setOptimisticProducts(data?.data ?? [])
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Could not update the product list for this price range.'
      useToastStore.getState().addToast({
        title: 'Failed to apply price filter',
        description: errorMessage,
        variant: 'error',
        duration: 1500,
      })
    }
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

    if (optimisticProducts && optimisticProducts.length > 0) {
      // If current page is beyond total pages, redirect to page 1
      if (currentPage > totalPages) {
        setTimeout(() => setPage(1), 0)
        return <LoadingSpinner />
      }

      return (
        <ProductListing
          products={optimisticProducts}
          viewMode={viewMode}
          currentPage={currentPage}
          totalProducts={totalProductCount}
          productsPerPage={displayLimit}
          onPageChange={handlePageChange}
        />
      )
    }

    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
        </div>
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
      <Breadcrumbs style={{ padding: '12px 16px' }} />

      <CategoryPageHeader
        title={displayTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        productCount={
          subcategory ? (
            <Suspense fallback={0}>
              <ProductCountSuspense subcategory={subcategory} />
            </Suspense>
          ) : (
            totalProductCount
          )
        }
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
