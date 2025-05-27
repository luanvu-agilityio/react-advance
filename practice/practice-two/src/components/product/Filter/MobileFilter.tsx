import { Filter, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  MobileFilter as MobileFilterWrapper,
  MobileFilterButton,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  CloseButton,
  FilterContainer,
} from './FilterStyles'
import { CategoryFilter } from './CategoryFilter'
import { BrandFilter } from './BrandFilter'
import { RatingFilter } from './RatingFilter'
import { PriceFilter } from './PriceFilter'
import type { FilterComponentsProps } from 'types/Filter'
import type { ChangeEvent } from 'react'

interface MobileFilterProps
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

export const MobileFilter = ({
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
}: MobileFilterProps) => {
  return (
    <MobileFilterWrapper>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <MobileFilterButton>
            <Filter size={16} />
            Filters
          </MobileFilterButton>
        </Dialog.Trigger>

        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
              <CloseButton>
                <X size={20} />
              </CloseButton>
            </DialogHeader>

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
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </MobileFilterWrapper>
  )
}
