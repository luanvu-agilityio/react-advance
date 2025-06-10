import type { Meta, StoryObj } from '@storybook/react'
import { useState, type ChangeEvent } from 'react'
import { MobileFilter } from './MobileFilter'
import type {
  CategoryProps,
  BrandProps,
  RatingProps,
  PriceRangeProps,
} from 'types/Filter'

const meta: Meta<typeof MobileFilter> = {
  title: 'Components/Filter/MobileFilter',
  component: MobileFilter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component:
          'Mobile filter component with dialog interface for filtering products on mobile devices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeCategory: {
      control: 'text',
      description: 'Currently active category name',
    },
    sliderValues: {
      control: 'object',
      description: 'Current slider values for price range',
    },
    onCategoryClick: {
      action: 'category-clicked',
      description: 'Callback when a category is clicked',
    },
    onBrandChange: {
      action: 'brand-changed',
      description: 'Callback when a brand selection changes',
    },
    onRatingChange: {
      action: 'rating-changed',
      description: 'Callback when a rating selection changes',
    },
    onSliderChange: {
      action: 'slider-changed',
      description: 'Callback when price slider changes',
    },
    onApplyFilters: {
      action: 'filters-applied',
      description: 'Callback when apply filters button is clicked',
    },
    onResetFilters: {
      action: 'filters-reset',
      description: 'Callback when reset filters button is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof MobileFilter>

// Sample data for filters
const sampleCategories: CategoryProps[] = [
  { name: 'Bakery', count: 12 },
  { name: 'Fruits', count: 24 },
  { name: 'Vegetables', count: 32 },
  { name: 'Dairy', count: 18 },
  { name: 'Meat', count: 16 },
]

const sampleBrands: BrandProps[] = [
  { name: 'United Farms', selected: false, count: 15 },
  { name: 'Organic Farms', selected: true, count: 12 },
  { name: 'Fresh Fields', selected: false, count: 8 },
  { name: 'Green Gardens', selected: false, count: 10 },
  { name: "Nature's Best", selected: true, count: 20 },
]

const sampleRatings: RatingProps[] = [
  { rating: 5, selected: false },
  { rating: 4, selected: true },
  { rating: 3, selected: false },
  { rating: 2, selected: false },
  { rating: 1, selected: false },
]

const samplePriceRange: PriceRangeProps = { min: 100, max: 500 }

/**
 * Default MobileFilter with pre-configured filter options
 */
export const Default: Story = {
  args: {
    categories: sampleCategories,
    brands: sampleBrands,
    ratings: sampleRatings,
    priceRange: samplePriceRange,
    activeCategory: 'Fruits',
    sliderValues: [100, 500],
    onCategoryClick: (categoryName) => {
      console.log(`Category clicked: ${categoryName}`)
    },
    onBrandChange: (index) => {
      console.log(`Brand at index ${index} clicked`)
    },
    onRatingChange: (index) => {
      console.log(`Rating at index ${index} clicked`)
    },
    onSliderChange: (values) => {
      console.log(`Slider values changed: ${values}`)
    },
    onMinInputChange: (e) => {
      console.log(`Min input changed: ${e.target.value}`)
    },
    onMaxInputChange: (e) => {
      console.log(`Max input changed: ${e.target.value}`)
    },
    onApplyFilters: () => {
      console.log('Apply filters clicked')
    },
    onResetFilters: () => {
      console.log('Reset filters clicked')
    },
    // Add the missing optional props
    onBrandSelect: (brandName, isSelected) => {
      console.log(`Brand ${brandName} selected: ${isSelected}`)
    },
    onRatingSelect: (rating, isSelected) => {
      console.log(`Rating ${rating} selected: ${isSelected}`)
    },
    onPriceRangeChange: (min, max) => {
      console.log(`Price range changed: ${min} - ${max}`)
    },
  },
}

/**
 * Interactive MobileFilter that demonstrates state changes
 */
export const Interactive: Story = {
  render: function InteractiveMobileFilter() {
    // State for all filter options
    const [activeCategory, setActiveCategory] = useState('Fruits')
    const [brands, setBrands] = useState<BrandProps[]>(sampleBrands)
    const [ratings, setRatings] = useState<RatingProps[]>(sampleRatings)
    const [priceRange, setPriceRange] =
      useState<PriceRangeProps>(samplePriceRange)
    const [sliderValues, setSliderValues] = useState([100, 500])

    // Handler functions
    const handleCategoryClick = (categoryName: string) => {
      const newActiveCategory =
        categoryName === activeCategory ? '' : categoryName
      setActiveCategory(newActiveCategory)
      console.log('Category clicked:', newActiveCategory)
    }

    const handleBrandChange = (index: number) => {
      const newBrands = [...brands]
      newBrands[index].selected = !newBrands[index].selected
      setBrands(newBrands)
      console.log('Brand changed:', newBrands[index])
    }

    const handleRatingChange = (index: number) => {
      const newRatings = [...ratings]
      newRatings[index].selected = !newRatings[index].selected
      setRatings(newRatings)
      console.log('Rating changed:', newRatings[index])
    }

    const handleSliderChange = (values: number[]) => {
      setSliderValues(values)
      setPriceRange({
        min: values[0],
        max: values[1],
      })
      console.log('Slider changed:', values)
    }

    const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), priceRange.max)
      setPriceRange({
        ...priceRange,
        min: value,
      })
      setSliderValues([value, sliderValues[1]])
    }

    const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), priceRange.min)
      setPriceRange({
        ...priceRange,
        max: value,
      })
      setSliderValues([sliderValues[0], value])
    }

    const handleApplyFilters = () => {
      const appliedFilters = {
        activeCategory,
        brands: brands.filter((b) => b.selected).map((b) => b.name),
        ratings: ratings.filter((r) => r.selected).map((r) => r.rating),
        priceRange,
      }
      console.log('Filters applied:', appliedFilters)
      alert(
        `Filters applied! Selected ${appliedFilters.brands.length} brands, ${appliedFilters.ratings.length} ratings. Check console for details.`
      )
    }

    const handleResetFilters = () => {
      setActiveCategory('')
      setBrands(sampleBrands.map((b) => ({ ...b, selected: false })))
      setRatings(sampleRatings.map((r) => ({ ...r, selected: false })))
      setPriceRange({ min: 0, max: 1000 })
      setSliderValues([0, 1000])
      console.log('Filters reset')
      alert('All filters have been reset!')
    }

    // Additional handlers for alternative prop signatures
    const handleBrandSelect = (brandName: string, isSelected: boolean) => {
      const brandIndex = brands.findIndex((brand) => brand.name === brandName)
      if (brandIndex !== -1) {
        const newBrands = [...brands]
        newBrands[brandIndex].selected = isSelected
        setBrands(newBrands)
        console.log(
          `Brand ${brandName} ${isSelected ? 'selected' : 'deselected'}`
        )
      }
    }

    const handleRatingSelect = (rating: number, isSelected: boolean) => {
      const ratingIndex = ratings.findIndex((r) => r.rating === rating)
      if (ratingIndex !== -1) {
        const newRatings = [...ratings]
        newRatings[ratingIndex].selected = isSelected
        setRatings(newRatings)
        console.log(
          `Rating ${rating} ${isSelected ? 'selected' : 'deselected'}`
        )
      }
    }

    const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
      setPriceRange({ min: minPrice, max: maxPrice })
      setSliderValues([minPrice, maxPrice])
      console.log(`Price range changed: ${minPrice} - ${maxPrice}`)
    }

    return (
      <div style={{ width: '100%', maxWidth: '375px', margin: '0 auto' }}>
        <MobileFilter
          categories={sampleCategories}
          brands={brands}
          ratings={ratings}
          priceRange={priceRange}
          activeCategory={activeCategory}
          sliderValues={sliderValues}
          onCategoryClick={handleCategoryClick}
          onBrandChange={handleBrandChange}
          onRatingChange={handleRatingChange}
          onSliderChange={handleSliderChange}
          onMinInputChange={handleMinInputChange}
          onMaxInputChange={handleMaxInputChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          onBrandSelect={handleBrandSelect}
          onRatingSelect={handleRatingSelect}
          onPriceRangeChange={handlePriceRangeChange}
        />
        <div
          style={{
            marginTop: 20,
            padding: 16,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            fontSize: '14px',
            lineHeight: '1.4',
          }}
        >
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
            📱 Interactive Demo
          </p>
          <p style={{ margin: '0 0 4px 0' }}>
            • Click the "Filters" button above to open the mobile filter dialog
          </p>
          <p style={{ margin: '0 0 4px 0' }}>
            • All interactions will update the state and log to console
          </p>
          <p style={{ margin: 0 }}>
            • Try selecting different categories, brands, ratings, and price
            ranges
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version with full state management. Open the filter dialog and try different combinations.',
      },
    },
  },
}

/**
 * MobileFilter with minimal options
 */
export const MinimalOptions: Story = {
  args: {
    categories: [{ name: 'All Products', count: 120 }],
    brands: [{ name: 'The Only Brand', selected: false, count: 1 }],
    ratings: [{ rating: 5, selected: false }],
    priceRange: { min: 0, max: 100 },
    activeCategory: '',
    sliderValues: [0, 100],
    onCategoryClick: () => {},
    onBrandChange: () => {},
    onRatingChange: () => {},
    onSliderChange: () => {},
    onMinInputChange: () => {},
    onMaxInputChange: () => {},
    onApplyFilters: () => {},
    onResetFilters: () => {},
    onBrandSelect: () => {},
    onRatingSelect: () => {},
    onPriceRangeChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal configuration with just one option in each filter category.',
      },
    },
  },
}

/**
 * MobileFilter with lots of filter options
 */
export const ManyOptions: Story = {
  args: {
    categories: Array(15)
      .fill(null)
      .map((_, i) => ({
        name: `Category ${i + 1}`,
        count: Math.floor(Math.random() * 50) + 5,
      })),
    brands: Array(20)
      .fill(null)
      .map((_, i) => ({
        name: `Brand ${i + 1}`,
        selected: i % 5 === 0, // Every 5th brand is selected
        count: Math.floor(Math.random() * 50) + 5,
      })),
    ratings: [
      { rating: 5, selected: true },
      { rating: 4, selected: true },
      { rating: 3, selected: false },
      { rating: 2, selected: false },
      { rating: 1, selected: false },
    ],
    priceRange: { min: 25, max: 750 },
    activeCategory: 'Category 5',
    sliderValues: [25, 750],
    onCategoryClick: () => {},
    onBrandChange: () => {},
    onRatingChange: () => {},
    onSliderChange: () => {},
    onMinInputChange: () => {},
    onMaxInputChange: () => {},
    onApplyFilters: () => {},
    onResetFilters: () => {},
    onBrandSelect: () => {},
    onRatingSelect: () => {},
    onPriceRangeChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example with many filter options to test scrolling and performance with large datasets.',
      },
    },
  },
}

/**
 * Empty state when no filter options are available
 */
export const EmptyState: Story = {
  args: {
    categories: [],
    brands: [],
    ratings: [],
    priceRange: { min: 0, max: 0 },
    activeCategory: '',
    sliderValues: [0, 0],
    onCategoryClick: () => {},
    onBrandChange: () => {},
    onRatingChange: () => {},
    onSliderChange: () => {},
    onMinInputChange: () => {},
    onMaxInputChange: () => {},
    onApplyFilters: () => {},
    onResetFilters: () => {},
    onBrandSelect: () => {},
    onRatingSelect: () => {},
    onPriceRangeChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no filter options are available.',
      },
    },
  },
}
