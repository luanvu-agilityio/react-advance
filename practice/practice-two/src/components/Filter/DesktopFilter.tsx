import {
  DesktopFilter as DesktopFilterWrapper,
  FilterContainer,
} from './FilterStyles'
import { CategoryFilter } from './CategoryFilter/CategoryFilter'
import { BrandFilter } from './BrandFIlter/BrandFilter'
import { RatingFilter } from './RatingFilter/RatingFilter'
import { PriceFilter } from './PriceFilter/PriceFilter'
import type { FilterComponentsProps } from 'types/Filter'
import type { ChangeEvent } from 'react'

interface DesktopFilterProps
  extends Omit<FilterComponentsProps, 'initialActiveCategory'> {
  activeCategory: string
  sliderValues: number[]
  onCategoryClick: (categoryName: string) => void
  onBrandChange: (index: number) => void
  onRatingChange: (index: number) => void
  onSliderChange: (values: number[]) => void
  onMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const DesktopFilter = ({
  categories,
  brands,
  ratings,
  priceRange,
  activeCategory,
  sliderValues,
  onCategoryClick,
  onBrandChange,
  onRatingChange,
  onSliderChange,
  onMinInputChange,
  onMaxInputChange,
  onApplyFilters,
  onResetFilters,
}: DesktopFilterProps) => {
  return (
    <DesktopFilterWrapper>
      <FilterContainer>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={onCategoryClick}
        />

        <BrandFilter brands={brands} onBrandChange={onBrandChange} />

        <RatingFilter ratings={ratings} onRatingChange={onRatingChange} />

        <PriceFilter
          priceRange={priceRange}
          sliderValues={sliderValues}
          onSliderChange={onSliderChange}
          onMinInputChange={onMinInputChange}
          onMaxInputChange={onMaxInputChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </FilterContainer>
    </DesktopFilterWrapper>
  )
}
