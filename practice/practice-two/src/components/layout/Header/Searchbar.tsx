import styled from 'styled-components'
import Select from '@components/common/Select'
import TextField from '@components/common/TextField'
import ImageIcon from '@components/common/ImageIcon.tsx'
import { categories } from '@constants/category'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react'
import type { Product } from 'types/Product'
import { productData } from '@dummy-data/product-data'
import { ChevronLeft } from 'lucide-react'

const SearchBarContainer = styled.div`
  position: relative;
  max-width: 100%;
  width: 500px;
  height: 42px;

  @media (max-width: 767px) {
    position: static;
    width: 100%;
  }
`

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: var(--black-shade-5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 767px) {
    border-radius: 8px;
    background-color: var(--black-shade-6);
    border: none;
  }
`
const CategorySelectContainer = styled.div`
  min-width: 11rem;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    display: none; // Hide category selector on mobile
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    height: 60%;
    width: 1px;
    background-color: #e5e7eb;
  }
`

const SelectWrapper = styled.div`
  width: 100%;
  padding: 10px 16px;
`

const SearchContainer = styled.div`
  flex-grow: 1;
  position: relative;
  height: 42px;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    height: 40px;

    input {
      background: transparent;
      font-size: 16px; /* Better for mobile readability */
      padding-left: 12px;
    }
  }
`

const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  background-color: transparent;
  border: none;
  border-radius: 50%;

  @media (max-width: 767px) {
    height: 2rem;
    width: 2rem;
    right: 0.5rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const SearchForm = styled.form`
  width: 100%;
  display: flex;
`

const SearchResultsDropdown = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 767px) {
    position: fixed;
    top: 57px; /* Adjusted to match header height */
    left: 0;
    right: 0;
    max-height: calc(100vh - 57px);
    border-radius: 0;
    border: none;
    border-top: 1px solid #e5e7eb;
  }
`

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--black-shade-5);
  }
`

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
`

const ProductInfo = styled.div`
  flex: 1;
`

const ProductTitle = styled.div`
  font-size: 14px;
  color: var(--text-color-heading);
  margin-bottom: 4px;
`

const ProductPrice = styled.div`
  font-size: 12px;
  color: var(--text-color-body);
  font-weight: var(--font-weight-medium);
`

const MobileSearchHeader = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    button {
      padding: 8px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background: var(--black-shade-6);
      }
    }
  }
`

interface SearchBarProps {
  onSearch?: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const handleSelectCategory = (categoryValue: string) => {
    setCategory(categoryValue)
  }

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
      if (category !== 'all') {
        searchParams.set('category', category)
      }
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
    ? productData.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleProductClick = (product: Product) => {
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
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowResults(true)
  }
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
}

export default SearchBar
