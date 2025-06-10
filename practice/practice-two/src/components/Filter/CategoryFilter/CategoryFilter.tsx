import type { CategoryProps } from 'types/Filter'
import {
  SectionTitle,
  CategorySection,
  CategoryItems,
  CategoryItem,
  CategoryName,
  CategoryCount,
} from '../FilterStyles'

interface CategoryFilterProps {
  categories: CategoryProps[]
  activeCategory: string
  onCategoryClick: (categoryName: string) => void
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryFilterProps) => {
  if (categories.length === 0) return null

  return (
    <CategorySection>
      <SectionTitle>Categories</SectionTitle>
      <CategoryItems>
        {categories.map((category) => {
          const isActive = category.name === activeCategory

          return (
            <CategoryItem
              key={category.name}
              onClick={() => {
                onCategoryClick(category.name)
              }}
              $isActive={isActive}
            >
              <CategoryName $isActive={isActive}>{category.name}</CategoryName>
              <CategoryCount>{category.count}</CategoryCount>
            </CategoryItem>
          )
        })}
      </CategoryItems>
    </CategorySection>
  )
}
