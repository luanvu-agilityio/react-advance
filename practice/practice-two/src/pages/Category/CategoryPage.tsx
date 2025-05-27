import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import styled from 'styled-components'
import { Text, RadioGroup } from '@radix-ui/themes'

// Components
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import FilterComponents from '@components/product/Filter/FilteringComponents'
import ProductListing from '@components/product/ProductCard/ProductListing'

// Data
import { navbarData } from '@dummy-data/navbar'
import { productData } from '@dummy-data/product-data'
import productApi from '@services/product'
import type { Product } from 'types/Product'
import type { StarRating } from 'types/Filter'

// Types
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

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 45px;
  }
`

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`
const ViewModeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);

  @media (min-width: 768px) {
    gap: 24px;
  }
`

const ProductCount = styled.span`
  color: var(--black-shade-2);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 32px;
    padding: 0 45px 64px;
  }
`

const CountBadge = styled.span`
  font-family: var(--font-family-primary);
  background-color: var(--green-shade-4);
  color: var(--green-shade-1);
  border-radius: 12px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  padding: 0 8px;
  text-align: center;
`

const NoResultsIcon = styled.div`
  margin-bottom: 16px;
  opacity: 0.5;

  img {
    width: 64px;
    height: 64px;
  }
`

const NoResultsTitle = styled.h3`
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-shade-1);
  margin-bottom: 8px;
`

const NoResultsText = styled.p`
  font-size: 16px;
  color: var(--black-shade-2);
  margin-bottom: 16px;
`

const ResetFiltersButton = styled.button`
  background-color: var(--green-color-default);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;

  &:hover {
    background-color: #5daf34;
  }
`
const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--black-shade-6);
  border-radius: 12px;
  margin-top: 24px;
`

// Components
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

// Main Component
const CategoryPage = () => {
  const { categoryPath } = useParams<{ categoryPath: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''
  const subcategoryParam = searchParams.get('subcategory') ?? ''

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

  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const productsPerPage = 5
  const [apiProducts, setApiProducts] = useState<Product[]>([])

  const useApiData = false

  const resetFilters = useCallback(() => {
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange({ min: 0, max: 1000 })
    setActiveSubcategory('')
    setCurrentPage(1)
  }, [])

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

  // Get products in the current category or search results
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

  // Filter products based on active subcategory, selected brands, and search query
  const filteredProducts = useMemo(() => {
    let filtered = [...productsInCategory]

    // Apply subcategory filter if not in search mode
    if (activeSubcategory && !isSearchMode) {
      filtered = filtered.filter(
        (product) => product.subcategory === activeSubcategory
      )
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      )
    }

    // Apply rating filter - fix the rating comparison
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.includes(Math.round(product.rating))
      )
    }

    // Apply price filter - ensure numeric comparison
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

  // Function to fetch products from API
  const fetchProducts = useCallback(async () => {
    if (!useApiData) return

    setIsLoading(true)
    try {
      const response = await productApi.getProducts({
        page: currentPage,
        limit: productsPerPage,
        category: categoryPath,
        subcategory: activeSubcategory ?? undefined,
        brands: selectedBrands.length ? selectedBrands : undefined,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        ratings: selectedRatings.length ? selectedRatings : undefined,
        search: searchQuery ?? undefined,
      })

      const total =
        response.total ?? (response.data ? response.data.length * 2 : 0) // Assume 2 pages if no total

      setApiProducts(response.data)
      setTotalProducts(total)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoading(false)
    }
  }, [
    currentPage,
    productsPerPage,
    categoryPath,
    activeSubcategory,
    selectedBrands,
    priceRange,
    selectedRatings,
    searchQuery,
    useApiData,
  ])

  // Effect to fetch data when parameters change
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

  // Determine which products to display based on data source
  const displayProducts = useApiData ? apiProducts : filteredProducts

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0) // Scroll to top on page change
  }

  const handleBrandSelect = useCallback(
    (brandName: string, isSelected: boolean) => {
      setSelectedBrands((prev) => {
        if (isSelected) {
          return [...prev, brandName]
        }
        return prev.filter((brand) => brand !== brandName)
      })
      setCurrentPage(1) // Reset pagination when filter changes
    },
    []
  )

  const handleRatingSelect = useCallback(
    (rating: number, isSelected: boolean) => {
      setSelectedRatings((prev) => {
        if (isSelected) {
          return [...prev, rating].sort((a, b) => b - a) // Sort descending
        }
        return prev.filter((r) => r !== rating)
      })
      setCurrentPage(1) // Reset pagination when filter changes
    },
    []
  )

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setPriceRange({ min, max })
    setCurrentPage(1) // Reset pagination when filter changes
  }, [])

  // Add a reset filters function

  useEffect(() => {
    // Reset filters when category changes
    if (categoryPath) {
      resetFilters()
    }
  }, [categoryPath, resetFilters])

  // Get category data based on path
  const currentCategory = useMemo(
    () =>
      navbarData.find(
        (item) => item.label.toLowerCase().replace(/\s+/g, '-') === categoryPath
      ),
    [categoryPath]
  )

  // When component mounts or URL params change, set the active subcategory
  useEffect(() => {
    if (subcategoryParam) {
      // Convert kebab-case to Title Case for matching with product data
      const formattedSubcategory = subcategoryParam
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      setActiveSubcategory(formattedSubcategory)
    } else {
      setActiveSubcategory('')
    }
  }, [subcategoryParam])

  // Handle special "search-results" category for global search
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

  const handleCategoryClick = useCallback((categoryName: string) => {
    setActiveSubcategory(categoryName)
    setSelectedBrands([])
    setCurrentPage(1)
  }, [])

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

  const handleViewModeChange = (value: string) => {
    setViewMode(value)
  }

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [currentPage, productsPerPage, filteredProducts])

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

        {isLoading ? (
          <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
            Loading products...
          </div>
        ) : displayProducts.length > 0 ? (
          <ProductListing
            products={useApiData ? apiProducts : paginatedProducts}
            viewMode={viewMode}
            currentPage={currentPage}
            totalProducts={useApiData ? totalProducts : filteredProducts.length}
            productsPerPage={productsPerPage}
            onPageChange={handlePageChange}
          />
        ) : (
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
            <ResetFiltersButton
              onClick={() => {
                setSelectedBrands([])
                setSelectedRatings([])
                setPriceRange({ min: 0, max: 1000 })
              }}
            >
              Reset Filters
            </ResetFiltersButton>
          </NoResultsContainer>
        )}
      </ContentContainer>
    </PageContainer>
  )
}

export default CategoryPage
