export interface CategoryProps {
  name: string
  count: number
  isActive?: boolean
}

export interface BrandProps {
  name: string
  selected: boolean
  count?: number
}

export type StarRating = 1 | 2 | 3 | 4 | 5

export interface RatingProps {
  rating: StarRating
  selected: boolean
}

export interface PriceRangeProps {
  min: number
  max: number
}

export interface FilterComponentsProps {
  categories: CategoryProps[]
  brands: BrandProps[]
  ratings: RatingProps[]
  priceRange: PriceRangeProps
  onCategoryClick: (categoryName: string) => void
  onBrandSelect: (brandName: string, isSelected: boolean) => void
  onRatingSelect: (rating: number, isSelected: boolean) => void
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void
  initialActiveCategory?: string
}
