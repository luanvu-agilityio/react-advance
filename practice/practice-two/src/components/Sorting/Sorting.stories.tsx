import type { Meta, StoryObj } from '@storybook/react'
import { Sorting } from './Sorting'
import { useCategoryStore } from '@stores/categoryStore'
import { useEffect } from 'react'

// Create a wrapper that sets up the store with initial values
const SortingWithStore = ({
  initialSortBy = 'name',
  initialSortOrder = 'asc' as 'asc' | 'desc',
}: {
  initialSortBy?: string
  initialSortOrder?: 'asc' | 'desc'
}) => {
  const { setSortBy, setSortOrder } = useCategoryStore()

  // Set the initial values when the story loads
  useEffect(() => {
    setSortBy(initialSortBy)
    setSortOrder(initialSortOrder)
  }, [initialSortBy, initialSortOrder, setSortBy, setSortOrder])

  return <Sorting />
}

const meta: Meta<typeof Sorting> = {
  title: 'Components/Sorting',
  component: Sorting,
  parameters: {
    layout: 'centered',
    // Reset store between stories
    zustand: { resetStores: true },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          minWidth: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sorting>

// Default sort by name, ascending
export const Default: Story = {
  render: () => (
    <SortingWithStore initialSortBy="name" initialSortOrder="asc" />
  ),
}

// Sort by price, ascending
export const SortByPrice: Story = {
  render: () => (
    <SortingWithStore initialSortBy="price" initialSortOrder="asc" />
  ),
}

// Sort by rating, ascending
export const SortByRating: Story = {
  render: () => (
    <SortingWithStore initialSortBy="rating" initialSortOrder="asc" />
  ),
}

// Sort by name, descending
export const DescendingOrder: Story = {
  render: () => (
    <SortingWithStore initialSortBy="name" initialSortOrder="desc" />
  ),
}
