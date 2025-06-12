import Select from '@components/common/Select/index'
import TextField from '@components/common/TextField/index'
import ImageIcon from '@components/common/ImageIcon'
import { categories } from '@constants/category'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import type { Product } from 'types/Product'
import { ChevronLeft } from 'lucide-react'
import { productData } from '@data/product-data'
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

interface SearchBarProps {
  onSearch?: (query: string) => void
}

const SearchBar = memo(({ onSearch }: SearchBarProps) => {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const handleSelectCategory = useCallback((categoryValue: string) => {
    setCategory(categoryValue)
  }, [])

  const handleMobileSearchOpen = () => {
    setIsMobileSearchActive(true)
    setShowResults(true)
  }

  const handleMobileSearchClose = () => {
    setIsMobileSearchActive(false)
    setShowResults(false)
  }

  const performSearch = useCallback(() => {
    if (!query.trim()) return

    // Only perform search if we're not already on a product detail page
    if (!location.pathname.includes('/product/')) {
      setShowResults(false)
      const searchPath = '/search-results'
      const searchParams = new URLSearchParams()
      searchParams.set('search', query.trim())
      searchParams.set('category', category)
      navigate(`${searchPath}?${searchParams.toString()}`)

      if (onSearch) {
        onSearch(query.trim())
      }
    }
  }, [query, category, navigate, onSearch, location.pathname])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const searchResults = query
    ? productData.filter((product: Product) => {
        const matchesQuery = product.title
          .toLowerCase()
          .includes(query.toLowerCase())

        const matchesCategory =
          category === 'all' ||
          product.category.toLowerCase().replace(/\s+/g, '-') === category

        return matchesQuery && matchesCategory
      })
    : []

  const handleProductClick = useCallback(
    (product: Product) => {
      setShowResults(false)
      setQuery('')

      // Construct the URL path
      const categoryPath = product.category.toLowerCase().replace(/\s+/g, '-')
      const subcategoryPath = product.subcategory
        .toLowerCase()
        .replace(/\s+/g, '-')

      setTimeout(() => {
        navigate(`/${categoryPath}/${subcategoryPath}/${product.id}`)
      }, 0)
    },
    [navigate]
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowResults(true)
  }, [])
  return (
    <>
      {/* Mobile Search Header */}
      {isMobileSearchActive && (
        <MobileSearchHeader>
          <button onClick={handleMobileSearchClose}>
            <ChevronLeft size={20} color="var(--black-color-default)" />
          </button>
          <SearchBarContainer>
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

                {/* Search Input  */}
                <SearchContainer>
                  <TextField
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleMobileSearchOpen}
                    placeholder="Search Products, categories ..."
                    icon={
                      <SearchButton
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          performSearch()
                        }}
                        aria-label="Search"
                      >
                        <ImageIcon
                          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg"
                          alt="Search icon"
                        />
                      </SearchButton>
                    }
                    iconPosition="right"
                    variant="search"
                  />
                </SearchContainer>
              </SearchBarWrapper>
            </SearchForm>
          </SearchBarContainer>
        </MobileSearchHeader>
      )}

      <SearchBarContainer>
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

            {/* Search Input  */}
            <SearchContainer>
              <TextField
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleMobileSearchOpen}
                placeholder="Search Products, categories ..."
                icon={
                  <SearchButton
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      performSearch()
                    }}
                    aria-label="Search"
                  >
                    <ImageIcon
                      src="https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg"
                      alt="Search icon"
                    />
                  </SearchButton>
                }
                iconPosition="right"
                variant="search"
              />
            </SearchContainer>
          </SearchBarWrapper>
        </SearchForm>

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

export default SearchBar
