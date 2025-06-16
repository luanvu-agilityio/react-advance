import Select from '@components/common/Select/index'
import TextField from '@components/common/TextField/index'
import ImageIcon from '@components/common/ImageIcon'
import { categories } from '@constants/category'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  memo,
  useCallback,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from 'react'
import type { Product } from 'types/Product'
import { ChevronLeft } from 'lucide-react'
import {
  CategorySelectContainer,
  MobileSearchHeader,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductTitle,
  SearchBarContainer,
  SearchBarWrapper,
  SearchButton,
  SearchContainer,
  SearchForm,
  SearchResultItem,
  SearchResultsDropdown,
  SelectWrapper,
} from './Searchbar.styles'
import { useProductSearch } from '@hooks/useProductSearch'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

// Memoized search button icon
const MemoizedSearchIcon = memo(() => (
  <ImageIcon
    src="https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg"
    alt="Search icon"
  />
))

const SearchBar = memo(({ onSearch }: SearchBarProps) => {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false)

  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  const location = useLocation()

  // Update ref when navigate changes
  useEffect(() => {
    navigateRef.current = navigate
  }, [navigate])

  const handleSelectCategory = useCallback((categoryValue: string) => {
    setCategory(categoryValue)
  }, [])

  const handleMobileSearchOpen = useCallback(() => {
    setIsMobileSearchActive(true)
    setShowResults(true)
  }, [])

  const handleMobileSearchClose = useCallback(() => {
    setIsMobileSearchActive(false)
    setShowResults(false)
  }, [])

  const performSearch = useCallback(() => {
    if (!query.trim()) return

    // Only perform search if we're not already on a product detail page
    if (!location.pathname.includes('/product/')) {
      setShowResults(false)
      const searchPath = '/search-results'
      const searchParams = new URLSearchParams()
      searchParams.set('search', query.trim())
      searchParams.set('category', category)
      navigateRef.current(`${searchPath}?${searchParams.toString()}`)

      if (onSearch) {
        onSearch(query.trim())
      }
    }
  }, [query, category, location.pathname, onSearch])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      performSearch()
    },
    [performSearch]
  )

  const handleSearchButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      performSearch()
    },
    [performSearch]
  )

  // Memoize expensive filtering operation
  const searchResults = useProductSearch(query, category)

  const handleProductClick = useCallback((product: Product) => {
    setShowResults(false)
    setQuery('')

    // Construct the URL path
    const categoryPath = product.category.toLowerCase().replace(/\s+/g, '-')
    const subcategoryPath = product.subcategory
      .toLowerCase()
      .replace(/\s+/g, '-')

    setTimeout(() => {
      navigateRef.current(`/${categoryPath}/${subcategoryPath}/${product.id}`)
    }, 0)
  }, [])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowResults(true)
  }, [])

  // Memoize search form content to avoid duplication
  const renderSearchForm = useCallback(
    (hideBorder = false) => (
      <SearchForm onSubmit={handleSubmit}>
        <SearchBarWrapper>
          {/* Select */}
          <CategorySelectContainer>
            <SelectWrapper>
              <Select
                options={categories}
                value={category}
                onChange={handleSelectCategory}
                placeholder="All categories"
                variant="search"
              />
            </SelectWrapper>
          </CategorySelectContainer>

          {/* Search Input */}
          <SearchContainer>
            <TextField
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleMobileSearchOpen}
              placeholder="Search Products, categories ..."
              style={hideBorder ? { border: 'none' } : undefined}
              icon={
                <SearchButton
                  type="submit"
                  onClick={handleSearchButtonClick}
                  aria-label="Search"
                >
                  <MemoizedSearchIcon />
                </SearchButton>
              }
              iconPosition="right"
              variant="search"
            />
          </SearchContainer>
        </SearchBarWrapper>
      </SearchForm>
    ),
    [
      category,
      query,
      handleSelectCategory,
      handleInputChange,
      handleMobileSearchOpen,
      handleSubmit,
      handleSearchButtonClick,
    ]
  )

  return (
    <>
      {/* Mobile Search Header */}
      {isMobileSearchActive && (
        <MobileSearchHeader>
          <button onClick={handleMobileSearchClose}>
            <ChevronLeft size={20} color="var(--black-color-default)" />
          </button>
          <SearchBarContainer>{renderSearchForm(true)}</SearchBarContainer>
        </MobileSearchHeader>
      )}

      <SearchBarContainer>
        {renderSearchForm()}

        {showResults && searchResults.length > 0 && (
          <SearchResultsDropdown>
            {searchResults.slice(0, 5).map((product) => (
              <SearchResultItem
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                <ProductImage src={product.imageUrl} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>${product.price}</ProductPrice>
                </ProductInfo>
              </SearchResultItem>
            ))}
          </SearchResultsDropdown>
        )}
      </SearchBarContainer>
    </>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
