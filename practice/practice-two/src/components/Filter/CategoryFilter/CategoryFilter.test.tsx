import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryFilter } from './CategoryFilter'
import type { CategoryProps } from 'types/Filter'

describe('CategoryFilter', () => {
  const mockCategories: CategoryProps[] = [
    { name: 'Bakery', count: 12 },
    { name: 'Fruits', count: 24 },
    { name: 'Vegetables', count: 32 },
  ]

  const mockOnCategoryClick = jest.fn()

  beforeEach(() => {
    mockOnCategoryClick.mockClear()
  })

  // SNAPSHOT TESTS FOR RENDERING STATES
  describe('Rendering States', () => {
    it('renders different states correctly', () => {
      // Default state with active category
      const { container: defaultContainer } = render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="Fruits"
          onCategoryClick={mockOnCategoryClick}
        />
      )
      expect(defaultContainer).toMatchSnapshot('with-active-category')

      // No active category
      const { container: noActiveContainer } = render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory=""
          onCategoryClick={mockOnCategoryClick}
        />
      )
      expect(noActiveContainer).toMatchSnapshot('no-active-category')

      // Empty categories array
      const { container: emptyContainer } = render(
        <CategoryFilter
          categories={[]}
          activeCategory=""
          onCategoryClick={mockOnCategoryClick}
        />
      )
      expect(emptyContainer).toMatchSnapshot('empty-categories')

      // Single category
      const { container: singleCategoryContainer } = render(
        <CategoryFilter
          categories={[{ name: 'Solo Category', count: 5 }]}
          activeCategory="Solo Category"
          onCategoryClick={mockOnCategoryClick}
        />
      )
      expect(singleCategoryContainer).toMatchSnapshot('single-category')

      // Many categories
      const manyCategories: CategoryProps[] = Array(10)
        .fill(null)
        .map((_, i) => ({
          name: `Category ${i + 1}`,
          count: (i + 1) * 10,
        }))
      const { container: manyCategoriesContainer } = render(
        <CategoryFilter
          categories={manyCategories}
          activeCategory="Category 5"
          onCategoryClick={mockOnCategoryClick}
        />
      )
      expect(manyCategoriesContainer).toMatchSnapshot('many-categories')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive Behavior', () => {
    it('calls onCategoryClick with correct category name when clicked', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="Fruits"
          onCategoryClick={mockOnCategoryClick}
        />
      )

      // Click on the first category (Bakery)
      const bakeryCategory = screen.getByText('Bakery')
      fireEvent.click(bakeryCategory)

      // Check if onCategoryClick was called with the correct category name
      expect(mockOnCategoryClick).toHaveBeenCalledWith('Bakery')
    })

    it('allows clicking on the already active category', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="Fruits"
          onCategoryClick={mockOnCategoryClick}
        />
      )

      // Click on the active category (Fruits)
      const fruitsCategory = screen.getByText('Fruits')
      fireEvent.click(fruitsCategory)

      // Verify that onCategoryClick is still called even if category is already active
      expect(mockOnCategoryClick).toHaveBeenCalledWith('Fruits')
    })
  })
})
