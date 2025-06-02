import { useEffect, useState, type ChangeEvent } from 'react'
import type {
  FilterComponentsProps,
  BrandProps,
  RatingProps,
  PriceRangeProps,
} from 'types/Filter'
import { MobileFilter } from './MobileFilter/MobileFilter'
import { DesktopFilter } from './DesktopFilter'

const FilterComponents = ({
  categories,
  brands: initialBrands,
  ratings: initialRatings,
  priceRange: initialPriceRange,
  onCategoryClick,
  onBrandSelect,
  onRatingSelect,
  onPriceRangeChange,
  initialActiveCategory = '',
}: FilterComponentsProps) => {
  const [activeCategory, setActiveCategory] = useState(initialActiveCategory)
  const [brands, setBrands] = useState<BrandProps[]>(initialBrands)
  const [ratings, setRatings] = useState<RatingProps[]>(initialRatings)
  const [priceRange, setPriceRange] =
    useState<PriceRangeProps>(initialPriceRange)
  const [sliderValues, setSliderValues] = useState([
    initialPriceRange.min,
    initialPriceRange.max,
  ])

  // Handle category click
  const handleCategoryClick = (categoryName: string) => {
    const newActiveCategory =
      categoryName === activeCategory ? '' : categoryName
    setActiveCategory(newActiveCategory)
    onCategoryClick(newActiveCategory)
  }

  // Update active category when prop changes
  useEffect(() => {
    setActiveCategory(initialActiveCategory)
  }, [initialActiveCategory])

  // Update local state when props change
  useEffect(() => {
    setBrands(initialBrands)
  }, [initialBrands])

  useEffect(() => {
    setRatings(initialRatings)
  }, [initialRatings])

  useEffect(() => {
    setPriceRange(initialPriceRange)
    setSliderValues([initialPriceRange.min, initialPriceRange.max])
  }, [initialPriceRange])

  // Event handlers
  const handleBrandChange = (index: number) => {
    const newBrands = [...brands]
    const isSelected = !newBrands[index].selected
    newBrands[index].selected = isSelected
    setBrands(newBrands)
    onBrandSelect(newBrands[index].name, isSelected)
  }

  const handleRatingChange = (index: number) => {
    const newRatings = [...ratings]
    const isSelected = !newRatings[index].selected
    newRatings[index].selected = isSelected
    setRatings(newRatings)
    onRatingSelect(newRatings[index].rating, isSelected)
  }

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values)
    setPriceRange({ min: values[0], max: values[1] })
  }

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 0) {
      const newMin = Math.min(value, sliderValues[1])
      setPriceRange({ ...priceRange, min: newMin })
      setSliderValues([newMin, sliderValues[1]])
    }
  }

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      const newMax = Math.max(value, sliderValues[0])
      setPriceRange({ ...priceRange, max: newMax })
      setSliderValues([sliderValues[0], newMax])
    }
  }

  const resetFilters = () => {
    setBrands(brands.map((brand) => ({ ...brand, selected: false })))
    setRatings(ratings.map((rating) => ({ ...rating, selected: false })))
    setPriceRange({ min: 0, max: 1000 })
    setSliderValues([0, 1000])

    brands.forEach((brand) => {
      if (brand.selected) {
        onBrandSelect(brand.name, false)
      }
    })

    ratings.forEach((rating) => {
      if (rating.selected) {
        onRatingSelect(rating.rating, false)
      }
    })

    onPriceRangeChange(0, 1000)
  }

  const applyFilters = () => {
    onPriceRangeChange(priceRange.min, priceRange.max)
  }

  const commonProps = {
    categories,
    brands,
    ratings,
    priceRange,
    activeCategory,
    sliderValues,
    onCategoryClick: handleCategoryClick,
    onBrandChange: handleBrandChange,
    onRatingChange: handleRatingChange,
    onSliderChange: handleSliderChange,
    onMinInputChange: handleMinInputChange,
    onMaxInputChange: handleMaxInputChange,
    onApplyFilters: applyFilters,
    onResetFilters: resetFilters,
  }

  return (
    <>
      <MobileFilter
        {...commonProps}
        onBrandSelect={onBrandSelect}
        onRatingSelect={onRatingSelect}
        onPriceRangeChange={onPriceRangeChange}
      />
      <DesktopFilter
        {...commonProps}
        onBrandSelect={onBrandSelect}
        onRatingSelect={onRatingSelect}
        onPriceRangeChange={onPriceRangeChange}
      />
    </>
  )
}

export default FilterComponents
