// ============================================================================
// IMPORTS
// ============================================================================
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  startTransition,
  useDeferredValue,
} from 'react'
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import { Text, RadioGroup } from '@radix-ui/themes'

// Components
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import FilterComponents from '@components/product/Filter/FilteringComponents'
import ProductListing from '@components/product/ProductCard/ProductListing'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorDisplay from '@components/common/ErrorDisplay'

// Data & Services
import { navbarData } from '@data/navbar'
import { productData } from '@data/product-data'
import productApi from '@services/product'

// Types & Hooks
import type { Product } from 'types/Product'
import type { StarRating } from 'types/Filter'
import { useResetFilters } from '@hooks/useResetFilter'
import {
  ContentContainer,
  CountBadge,
  NoResultsContainer,
  NoResultsIcon,
  NoResultsText,
  NoResultsTitle,
  PageContainer,
  PageHeader,
  PageTitle,
  ProductCount,
  ResetFiltersButton,
  ViewModeContainer,
} from './CategoryStyles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface CategoryPageHeaderProps {
  title: string
  productCount: number
  viewMode: string
  onViewModeChange: (value: string) => void
}

interface ViewModeOptionProps {
  value: string
  label: string
  icon: string
  viewMode: string
}

interface BrandState {
  name: string
  selected: boolean
  count: number
}

interface NoResultsSectionProps {
  searchQuery: string | null
  onResetFilters: () => void
}

// ============================================================================
// COMPONENT HELPERS
// ============================================================================
const ViewModeOption = ({
  value,
  label,
  icon,
  viewMode,
}: ViewModeOptionProps) => (
  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
    <RadioGroup.Item value={value} id={value} />
    <Text
      as="label"
      htmlFor={value}
      size="2"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color:
          viewMode === value
            ? 'var(--black-color-default)'
            : 'var(--black-shade-2)',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
    >
      <img
        src={icon}
        alt={`${label} View`}
        style={{
          opacity: viewMode === value ? 1 : 0.5,
          transition: 'opacity 0.2s ease',
        }}
      />
      {label} view
    </Text>
  </div>
)

const CategoryPageHeader = ({
  title,
  productCount,
  viewMode,
  onViewModeChange,
}: CategoryPageHeaderProps) => (
  <PageHeader>
    <PageTitle>{title}</PageTitle>
    <ViewModeContainer>
      <RadioGroup.Root defaultValue={viewMode} onValueChange={onViewModeChange}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <ViewModeOption
            value="grid"
            label="Grid"
            icon="src/assets/images/icons/grid-view.svg"
            viewMode={viewMode}
          />
          <ViewModeOption
            value="list"
            label="List"
            icon="src/assets/images/icons/list-view.svg"
            viewMode={viewMode}
          />
        </div>
      </RadioGroup.Root>
      <ProductCount>
        <CountBadge>{productCount}</CountBadge> Products
      </ProductCount>
    </ViewModeContainer>
  </PageHeader>
)

const ResetFiltersAction = ({ onReset }: { onReset: () => void }) => (
  <ResetFiltersButton onClick={onReset}>Reset Filters</ResetFiltersButton>
)

const NoResultsSection = ({
  searchQuery,
  onResetFilters,
}: NoResultsSectionProps) => (
  <NoResultsContainer>
    <NoResultsIcon>
      <img
        src="/src/assets/images/icons/no-results.svg"
        alt="No results"
        onError={(e) => {
          e.currentTarget.src =
            'https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg'
        }}
      />
    </NoResultsIcon>
    <NoResultsTitle>No products found</NoResultsTitle>
    <NoResultsText>
      {searchQuery
        ? 'No products match your search query and applied filters.'
        : 'No products match your selected filters.'}
    </NoResultsText>
    <ResetFiltersAction onReset={onResetFilters} />
  </NoResultsContainer>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const CategoryPage = () => {
  // --------------------------------------------------------------------------
  // HOOKS & ROUTER
  // --------------------------------------------------------------------------
  const { categoryPath } = useParams<{ categoryPath: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''
  const subcategoryParam = searchParams.get('subcategory') ?? ''

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [viewMode, setViewMode] = useState('grid')
  const [categoryTitle, setCategoryTitle] = useState('')
  const [activeSubcategory, setActiveSubcategory] = useState<string>('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  })

  // API & Loading States
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [apiProducts, setApiProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  // --------------------------------------------------------------------------
  // PERFORMANCE OPTIMIZATIONS
  // --------------------------------------------------------------------------
  const deferredSelectedBrands = useDeferredValue(selectedBrands)
  const deferredSelectedRatings = useDeferredValue(selectedRatings)
  const deferredPriceRange = useDeferredValue(priceRange)

  // --------------------------------------------------------------------------
  // CONSTANTS & CUSTOM HOOKS
  // --------------------------------------------------------------------------
  const productsPerPage = 5
  const useApiData = false
  const handleResetFilters = useResetFilters(
    setSelectedBrands,
    setSelectedRatings,
    setPriceRange
  )

  // --------------------------------------------------------------------------
  // CALLBACK FUNCTIONS
  // --------------------------------------------------------------------------
  const resetFilters = useCallback(() => {
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange({ min: 0, max: 1000 })
    setActiveSubcategory('')
    setCurrentPage(1)
  }, [])

  const handleBrandSelect = useCallback(
    (brandName: string, isSelected: boolean) => {
      startTransition(() => {
        setSelectedBrands((prev) => {
          if (isSelected) {
            return [...prev, brandName]
          }
          return prev.filter((brand) => brand !== brandName)
        })
        setCurrentPage(1)
      })
    },
    []
  )

  const handleRatingSelect = useCallback(
    (rating: number, isSelected: boolean) => {
      startTransition(() => {
        setSelectedRatings((prev) => {
          if (isSelected) {
            const updatedRatings = [...prev, rating]
            return updatedRatings.sort((a, b) => b - a)
          }
          return prev.filter((r) => r !== rating)
        })
        setCurrentPage(1)
      })
    },
    []
  )

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    startTransition(() => {
      setPriceRange({ min, max })
      setCurrentPage(1)
    })
  }, [])

  const handleCategoryClick = useCallback((categoryName: string) => {
    setActiveSubcategory(categoryName)
    setSelectedBrands([])
    setCurrentPage(1)
  }, [])

  const handleViewModeChange = (value: string) => {
    setViewMode(value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // --------------------------------------------------------------------------
  // API FUNCTIONS
  // --------------------------------------------------------------------------
  const fetchProducts = useCallback(async () => {
    if (!useApiData) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await productApi.getProducts({
        page: currentPage,
        limit: productsPerPage,
        category: categoryPath,
        subcategory: activeSubcategory ?? undefined,
        brands: deferredSelectedBrands.length
          ? deferredSelectedBrands
          : undefined,
        minPrice: deferredPriceRange.min,
        maxPrice: deferredPriceRange.max,
        ratings: deferredSelectedRatings.length
          ? deferredSelectedRatings
          : undefined,
        search: searchQuery ?? undefined,
      })

      const total =
        response.total ?? (response.data ? response.data.length * 2 : 0)

      startTransition(() => {
        setApiProducts(response.data)
        setTotalProducts(total)
        setIsLoading(false)
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch products'
      console.error('Failed to fetch products:', error)

      startTransition(() => {
        setError(errorMessage)
        setIsLoading(false)
      })
    } finally {
      setIsPending(false)
    }
  }, [
    currentPage,
    productsPerPage,
    categoryPath,
    activeSubcategory,
    deferredSelectedBrands,
    deferredPriceRange,
    deferredSelectedRatings,
    searchQuery,
    useApiData,
  ])

  // --------------------------------------------------------------------------
  // COMPUTED VALUES (MEMOIZED)
  // --------------------------------------------------------------------------
  const currentCategory = useMemo(
    () =>
      navbarData.find(
        (item) => item.label.toLowerCase().replace(/\s+/g, '-') === categoryPath
      ),
    [categoryPath]
  )

  const productsInCategory = useMemo(() => {
    if (location.pathname === '/search-results' && searchQuery) {
      return productData.filter((product) => {
        const query = searchQuery.toLowerCase()
        const searchableFields = [
          product.title,
          product.description,
          product.category,
          product.subcategory,
          product.brand,
          ...(product.tags ?? []),
        ].map((field) => (field ?? '').toLowerCase())

        return searchableFields.some((field) => field.includes(query))
      })
    }

    if (!categoryPath || location.pathname === '/all-products') {
      return productData
    }

    return productData.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, '-') === categoryPath
    )
  }, [categoryPath, searchQuery, location.pathname])

  const filteredProducts = useMemo(() => {
    let filtered = [...productsInCategory]

    if (activeSubcategory && !isSearchMode) {
      filtered = filtered.filter(
        (product) => product.subcategory === activeSubcategory
      )
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      )
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.includes(Math.round(product.rating))
      )
    }

    filtered = filtered.filter((product) => {
      const price = Number(product.price)
      return price >= priceRange.min && price <= priceRange.max
    })

    return filtered
  }, [
    productsInCategory,
    activeSubcategory,
    selectedBrands,
    selectedRatings,
    priceRange,
    isSearchMode,
  ])

  const subcategories = useMemo(
    () =>
      currentCategory?.categories?.map((cat) => ({
        name: cat.title,
        count: productsInCategory.filter(
          (product) => product.subcategory === cat.title
        ).length,
        onClick: () => handleCategoryClick(cat.title),
        isActive: activeSubcategory === cat.title,
      })) ?? [],
    [
      currentCategory,
      productsInCategory,
      activeSubcategory,
      handleCategoryClick,
    ]
  )

  const categoryBrands = useMemo(() => {
    if (!categoryPath) return []

    const relevantProducts = activeSubcategory
      ? productsInCategory.filter(
          (product) => product.subcategory === activeSubcategory
        )
      : productsInCategory

    const brandsInCategory = relevantProducts.reduce<BrandState[]>(
      (acc, product) => {
        const existingBrand = acc.find((b) => b.name === product.brand)
        if (existingBrand) {
          existingBrand.count++
        } else {
          acc.push({
            name: product.brand,
            selected: selectedBrands.includes(product.brand),
            count: 1,
          })
        }
        return acc
      },
      []
    )

    return brandsInCategory
  }, [categoryPath, productsInCategory, activeSubcategory, selectedBrands])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [currentPage, productsPerPage, filteredProducts])

  const displayProducts = useApiData ? apiProducts : filteredProducts

  // --------------------------------------------------------------------------
  // SIDE EFFECTS
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleSearchAndCategory = () => {
      if (location.pathname === '/search-results' && searchQuery) {
        setIsSearchMode(true)
        setCategoryTitle('Search Results')
        resetFilters()
        return
      }

      if (location.pathname === '/all-products') {
        setIsSearchMode(true)
        setCategoryTitle('All Products')
        return
      }

      setIsSearchMode(false)

      if (!categoryPath) return

      const category = navbarData.find(
        (item) => item.label.toLowerCase().replace(/\s+/g, '-') === categoryPath
      )

      if (!category) {
        navigate('/')
        return
      }

      setCategoryTitle(category.label)
    }

    handleSearchAndCategory()
  }, [location.pathname, categoryPath, searchQuery, navigate, resetFilters])

  useEffect(() => {
    if (subcategoryParam) {
      const formattedSubcategory = subcategoryParam
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      setActiveSubcategory(formattedSubcategory)
    } else {
      setActiveSubcategory('')
    }
  }, [subcategoryParam])

  useEffect(() => {
    if (location.pathname === '/all-products') {
      setIsSearchMode(true)
      setCategoryTitle('All Products')
      return
    }

    if (categoryPath === 'all-products') {
      setIsSearchMode(true)
      setCategoryTitle('All Products')
      return
    }

    if (categoryPath === 'search-results') {
      setIsSearchMode(true)
      setCategoryTitle('Search Results')
      return
    }

    setIsSearchMode(false)

    if (!categoryPath) return

    const category = navbarData.find(
      (item) => item.label.toLowerCase().replace(/\s+/g, '-') === categoryPath
    )

    if (!category) {
      navigate('/')
      return
    }

    setCategoryTitle(category.label)
    setActiveSubcategory('')
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange({ min: 0, max: 1000 })
    setCurrentPage(1)
  }, [categoryPath, location.pathname, navigate])

  useEffect(() => {
    fetchProducts()
  }, [
    fetchProducts,
    currentPage,
    categoryPath,
    activeSubcategory,
    selectedBrands,
    priceRange,
    selectedRatings,
    searchQuery,
  ])

  useEffect(() => {
    if (categoryPath) {
      resetFilters()
    }
  }, [categoryPath, resetFilters])

  // --------------------------------------------------------------------------
  // RENDER METHODS
  // --------------------------------------------------------------------------
  const renderContentArea = () => {
    if (error) {
      return <ErrorDisplay error={error} onRetry={() => fetchProducts()} />
    }

    if (isLoading || isPending) {
      return (
        <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
        </div>
      )
    }

    if (displayProducts.length > 0) {
      return (
        <ProductListing
          products={useApiData ? apiProducts : paginatedProducts}
          viewMode={viewMode}
          currentPage={currentPage}
          totalProducts={useApiData ? totalProducts : filteredProducts.length}
          productsPerPage={productsPerPage}
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

  // --------------------------------------------------------------------------
  // MAIN RENDER
  // --------------------------------------------------------------------------
  return (
    <PageContainer>
      <Breadcrumbs style={{ padding: '12px 45px' }} />

      <CategoryPageHeader
        title={
          searchQuery
            ? `Search Results for "${searchQuery}" (${filteredProducts.length})`
            : categoryTitle
        }
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        productCount={filteredProducts.length}
      />

      <ContentContainer>
        <FilterComponents
          categories={subcategories}
          brands={categoryBrands.map((brand) => ({
            name: brand.name,
            selected: selectedBrands.includes(brand.name),
          }))}
          ratings={[5, 4, 3, 2, 1].map((rating) => ({
            rating: rating as StarRating,
            selected: selectedRatings.includes(rating),
          }))}
          priceRange={priceRange}
          onCategoryClick={handleCategoryClick}
          onBrandSelect={handleBrandSelect}
          onRatingSelect={handleRatingSelect}
          onPriceRangeChange={handlePriceRangeChange}
          initialActiveCategory={activeSubcategory}
        />

        {renderContentArea()}
      </ContentContainer>
    </PageContainer>
  )
}

export default CategoryPage
