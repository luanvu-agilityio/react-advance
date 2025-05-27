import type { CategoryProps } from 'types/Filter'
import {
  SectionTitle,
  CategorySection,
  CategoryItems,
  CategoryItem,
  CategoryName,
  CategoryCount,
} from './FilterStyles'

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
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            onClick={() => onCategoryClick(category.name)}
            $isActive={category.name === activeCategory}
          >
            <CategoryName $isActive={category.name === activeCategory}>
              {category.name}
            </CategoryName>
            <CategoryCount>{category.count}</CategoryCount>
          </CategoryItem>
        ))}
      </CategoryItems>
    </CategorySection>
  )
}
