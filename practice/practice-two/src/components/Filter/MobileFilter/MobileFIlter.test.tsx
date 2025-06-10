import { render, screen, fireEvent } from '@testing-library/react'
import { MobileFilter } from './MobileFilter'
import type {
  CategoryProps,
  BrandProps,
  RatingProps,
  PriceRangeProps,
} from 'types/Filter'
import type { ReactNode } from 'react'

// Mock the Dialog component from Radix
jest.mock('@radix-ui/react-dialog', () => {
  const originalModule = jest.requireActual('@radix-ui/react-dialog')
  return {
    __esModule: true,
    ...originalModule,
    Root: ({ children }: { children: ReactNode }) => (
      <div data-testid="dialog-root">{children}</div>
    ),
    Trigger: ({ children }: { children: ReactNode }) => (
      <button data-testid="dialog-trigger">{children}</button>
    ),
    Portal: ({ children }: { children: ReactNode }) => (
      <div data-testid="dialog-portal">{children}</div>
    ),
<<<<<<< HEAD
    Overlay: ({ children }: { children: ReactNode }) => (
      <div data-testid="dialog-overlay">{children}</div>
    ),
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    Content: ({ children }: { children: ReactNode }) => (
      <div data-testid="dialog-content">{children}</div>
    ),
    Close: ({ children }: { children: ReactNode }) => (
      <button data-testid="dialog-close">{children}</button>
    ),
<<<<<<< HEAD
    Title: ({ children }: { children: ReactNode }) => (
      <h2 data-testid="dialog-title">{children}</h2>
    ),
    Description: ({ children }: { children: ReactNode }) => (
      <p data-testid="dialog-description">{children}</p>
    ),
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  }
})

// Mock child filter components
<<<<<<< HEAD
jest.mock('../CategoryFilter/CategoryFilter', () => ({
=======
jest.mock('./CategoryFilter/CategoryFilter', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  CategoryFilter: ({
    categories,
    activeCategory,
    onCategoryClick,
  }: {
    categories: CategoryProps[]
    activeCategory: string
    onCategoryClick: (category: string) => void
  }) => (
    <div data-testid="category-filter">
      <span>Categories: {categories.length}</span>
      <span>Active: {activeCategory}</span>
      <button onClick={() => onCategoryClick('Vegetables')}>
        Click Category
      </button>
    </div>
  ),
}))

<<<<<<< HEAD
jest.mock('../BrandFIlter/BrandFilter', () => ({
=======
jest.mock('./BrandFIlter/BrandFilter', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  BrandFilter: ({
    brands,
    onBrandChange,
  }: {
    brands: BrandProps[]
    onBrandChange: (index: number) => void
  }) => (
    <div data-testid="brand-filter">
      <span>Brands: {brands.length}</span>
      <button onClick={() => onBrandChange(0)}>Click Brand</button>
    </div>
  ),
}))

<<<<<<< HEAD
jest.mock('../RatingFilter/RatingFilter', () => ({
=======
jest.mock('./RatingFilter/RatingFilter', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  RatingFilter: ({
    ratings,
    onRatingChange,
  }: {
    ratings: RatingProps[]
    onRatingChange: (index: number) => void
  }) => (
    <div data-testid="rating-filter">
      <span>Ratings: {ratings.length}</span>
      <button onClick={() => onRatingChange(0)}>Click Rating</button>
    </div>
  ),
}))

<<<<<<< HEAD
jest.mock('../PriceFilter/PriceFilter', () => ({
=======
jest.mock('./PriceFilter/PriceFilter', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  PriceFilter: ({
    priceRange,
    sliderValues,
    onSliderChange,
    onMinInputChange,
    onMaxInputChange,
    onApplyFilters,
    onResetFilters,
  }: {
    priceRange: PriceRangeProps
    sliderValues: number[]
    onSliderChange: (values: number[]) => void
    onMinInputChange: (e: { target: { value: string } }) => void
    onMaxInputChange: (e: { target: { value: string } }) => void
    onApplyFilters: () => void
    onResetFilters: () => void
  }) => (
    <div data-testid="price-filter">
      <span>
        Price: ${priceRange.min} - ${priceRange.max}
      </span>
      <span>
        Slider: ${sliderValues[0]} - ${sliderValues[1]}
      </span>
      <button onClick={() => onSliderChange([200, 300])}>Change Slider</button>
      <button onClick={() => onMinInputChange({ target: { value: '150' } })}>
        Change Min
      </button>
      <button onClick={() => onMaxInputChange({ target: { value: '450' } })}>
        Change Max
      </button>
      <button onClick={onApplyFilters}>Apply</button>
      <button onClick={onResetFilters}>Reset</button>
    </div>
  ),
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Filter: () => <div data-testid="filter-icon">Filter Icon</div>,
  X: () => <div data-testid="close-icon">X Icon</div>,
<<<<<<< HEAD
  Star: () => <div data-testid="star-icon">Star Icon</div>,
  CheckIcon: () => <div data-testid="check-icon">Check Icon</div>,
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}))

describe('MobileFilter', () => {
  // Sample filter data for tests
  const sampleCategories: CategoryProps[] = [
    { name: 'Bakery', count: 12 },
    { name: 'Fruits', count: 24 },
    { name: 'Vegetables', count: 32 },
  ]

  const sampleBrands: BrandProps[] = [
<<<<<<< HEAD
    { name: 'United Farms', selected: false },
    { name: 'Organic Farms', selected: true },
=======
    { name: 'United Farms', selected: false, count: 15 },
    { name: 'Organic Farms', selected: true, count: 20 },
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  ]

  const sampleRatings: RatingProps[] = [
    { rating: 5, selected: false },
    { rating: 4, selected: true },
  ]

  const samplePriceRange: PriceRangeProps = { min: 100, max: 500 }

  const mockProps = {
    categories: sampleCategories,
    brands: sampleBrands,
    ratings: sampleRatings,
    priceRange: samplePriceRange,
    activeCategory: 'Fruits',
    sliderValues: [100, 500],
    onCategoryClick: jest.fn(),
    onBrandChange: jest.fn(),
    onRatingChange: jest.fn(),
    onSliderChange: jest.fn(),
    onMinInputChange: jest.fn(),
    onMaxInputChange: jest.fn(),
    onApplyFilters: jest.fn(),
    onResetFilters: jest.fn(),
    onBrandSelect: jest.fn(),
    onRatingSelect: jest.fn(),
    onPriceRangeChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the mobile filter button correctly', () => {
    render(<MobileFilter {...mockProps} />)

    const filterButton = screen.getByTestId('dialog-trigger')
    expect(filterButton).toBeInTheDocument()
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument()
    expect(filterButton).toHaveTextContent('Filters')
  })

  it('renders filter components inside dialog content', () => {
    render(<MobileFilter {...mockProps} />)

    // Dialog content should be rendered (even if not visible in actual DOM)
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()

    // Check that all filter components are rendered
    expect(screen.getByTestId('category-filter')).toBeInTheDocument()
    expect(screen.getByTestId('brand-filter')).toBeInTheDocument()
    expect(screen.getByTestId('rating-filter')).toBeInTheDocument()
    expect(screen.getByTestId('price-filter')).toBeInTheDocument()
  })

  it('passes correct props to child filter components', () => {
    render(<MobileFilter {...mockProps} />)

    // Check that CategoryFilter received correct props
    expect(screen.getByText('Categories: 3')).toBeInTheDocument()
    expect(screen.getByText('Active: Fruits')).toBeInTheDocument()

    // Check that BrandFilter received correct props
    expect(screen.getByText('Brands: 2')).toBeInTheDocument()

    // Check that RatingFilter received correct props
    expect(screen.getByText('Ratings: 2')).toBeInTheDocument()

    // Check that PriceFilter received correct props
    expect(screen.getByText('Price: $100 - $500')).toBeInTheDocument()
    expect(screen.getByText('Slider: $100 - $500')).toBeInTheDocument()
  })

  it('calls category click handler when category is clicked', () => {
    render(<MobileFilter {...mockProps} />)

    // Click the category button in the mocked CategoryFilter
    fireEvent.click(screen.getByText('Click Category'))

    // Check that the onCategoryClick handler was called with the correct argument
    expect(mockProps.onCategoryClick).toHaveBeenCalledTimes(1)
    expect(mockProps.onCategoryClick).toHaveBeenCalledWith('Vegetables')
  })

  it('calls brand change handler when brand is clicked', () => {
    render(<MobileFilter {...mockProps} />)

    // Click the brand button in the mocked BrandFilter
    fireEvent.click(screen.getByText('Click Brand'))

    // Check that the onBrandChange handler was called with the correct argument
    expect(mockProps.onBrandChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onBrandChange).toHaveBeenCalledWith(0)
  })

  it('calls rating change handler when rating is clicked', () => {
    render(<MobileFilter {...mockProps} />)

    // Click the rating button in the mocked RatingFilter
    fireEvent.click(screen.getByText('Click Rating'))

    // Check that the onRatingChange handler was called with the correct argument
    expect(mockProps.onRatingChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onRatingChange).toHaveBeenCalledWith(0)
  })

  it('calls price filter handlers when price filter actions are taken', () => {
    render(<MobileFilter {...mockProps} />)

    // Click the slider change button in the mocked PriceFilter
    fireEvent.click(screen.getByText('Change Slider'))

    // Check that the onSliderChange handler was called with the correct argument
    expect(mockProps.onSliderChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onSliderChange).toHaveBeenCalledWith([200, 300])

    // Click the min input change button
    fireEvent.click(screen.getByText('Change Min'))

    // Check that the onMinInputChange handler was called with the correct argument
    expect(mockProps.onMinInputChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onMinInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: '150' },
      })
    )

    // Click the max input change button
    fireEvent.click(screen.getByText('Change Max'))

    // Check that the onMaxInputChange handler was called with the correct argument
    expect(mockProps.onMaxInputChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onMaxInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: '450' },
      })
    )

    // Click the apply button
    fireEvent.click(screen.getByText('Apply'))

    // Check that the onApplyFilters handler was called
    expect(mockProps.onApplyFilters).toHaveBeenCalledTimes(1)

    // Click the reset button
    fireEvent.click(screen.getByText('Reset'))

    // Check that the onResetFilters handler was called
    expect(mockProps.onResetFilters).toHaveBeenCalledTimes(1)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<MobileFilter {...mockProps} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
