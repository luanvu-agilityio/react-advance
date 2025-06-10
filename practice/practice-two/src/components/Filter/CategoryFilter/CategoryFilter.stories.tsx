import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CategoryFilter } from './CategoryFilter'
import type { CategoryProps } from 'types/Filter'

const meta: Meta<typeof CategoryFilter> = {
  title: 'Components/Filter/CategoryFilter',
  component: CategoryFilter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CategoryFilter>

const sampleCategories: CategoryProps[] = [
  { name: 'Bakery', count: 12 },
  { name: 'Fruits', count: 24 },
  { name: 'Vegetables', count: 32 },
  { name: 'Dairy', count: 18 },
  { name: 'Meat', count: 16 },
]

/**
 * Default CategoryFilter with multiple categories and "Fruits" as active
 */
export const Default: Story = {
  args: {
    categories: sampleCategories,
    activeCategory: 'Fruits',
    onCategoryClick: (categoryName) => {
      console.log(`Category clicked: ${categoryName}`)
    },
  },
}

/**
 * CategoryFilter with no active category
 */
export const NoActiveCategory: Story = {
  args: {
    categories: sampleCategories,
    activeCategory: '',
    onCategoryClick: (categoryName) => {
      console.log(`Category clicked: ${categoryName}`)
    },
  },
}

/**
 * CategoryFilter with a single item
 */
export const SingleCategory: Story = {
  args: {
    categories: [{ name: 'All Products', count: 120 }],
    activeCategory: 'All Products',
    onCategoryClick: () => {},
  },
}

/**
 * CategoryFilter with many categories to show scrolling behavior
 */
export const ManyCategories: Story = {
  args: {
    categories: Array(15)
      .fill(null)
      .map((_, i) => ({
        name: `Category ${i + 1}`,
        count: Math.floor(Math.random() * 50) + 5,
      })),
    activeCategory: 'Category 5',
    onCategoryClick: () => {},
  },
}

/**
 * Interactive CategoryFilter that demonstrates state changes
 */
export const Interactive: Story = {
  render: function InteractiveCategoryFilter() {
    const [activeCategory, setActiveCategory] = useState('Fruits')

    return (
      <CategoryFilter
        categories={sampleCategories}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
      />
    )
  },
}

/**
 * CategoryFilter with categories that have long names
 */
export const LongCategoryNames: Story = {
  args: {
    categories: [
      {
        name: 'Extremely Long Category Name That Might Break The Layout',
        count: 12,
      },
      { name: 'Another Very Long Category Name To Test Wrapping', count: 24 },
      { name: 'Short', count: 5 },
    ],
    activeCategory: 'Short',
    onCategoryClick: () => {},
  },
}

/**
 * CategoryFilter with large counts
 */
export const LargeCountNumbers: Story = {
  args: {
    categories: [
      { name: 'Popular Category', count: 1250 },
      { name: 'Very Popular', count: 9999 },
      { name: 'Less Popular', count: 42 },
    ],
    activeCategory: 'Popular Category',
    onCategoryClick: () => {},
  },
}

/**
 * CategoryFilter with empty categories array (should not render)
 */
export const EmptyCategories: Story = {
  args: {
    categories: [],
    activeCategory: '',
    onCategoryClick: () => {},
  },
}
