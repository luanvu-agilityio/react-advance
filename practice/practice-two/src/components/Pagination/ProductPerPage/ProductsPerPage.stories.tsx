import type { Meta, StoryObj } from '@storybook/react'
import { ProductsPerPage } from './ProductsPerPage'
import { useCategoryStore } from '@stores/categoryStore'
import { useEffect } from 'react'

// Create a wrapper component that initializes the store
const ProductsPerPageWithStore = ({ initialLimit = 5 }) => {
  // Use the actual store but initialize it with our value
  const { setLimit } = useCategoryStore()

  // Set the initial limit when the story loads
  useEffect(() => {
    setLimit(initialLimit)
  }, [initialLimit, setLimit])

  return <ProductsPerPage />
}

const meta = {
  title: 'Components/Pagination/ProductsPerPage',
  component: ProductsPerPage,
  parameters: {
    layout: 'centered',
    // Disable store persistence between stories
    zustand: { resetStores: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductsPerPage>

export default meta
type Story = StoryObj<typeof ProductsPerPage>

export const Default: Story = {
  render: () => <ProductsPerPageWithStore initialLimit={5} />,
}

export const TenPerPage: Story = {
  render: () => <ProductsPerPageWithStore initialLimit={10} />,
}

export const FifteenPerPage: Story = {
  render: () => <ProductsPerPageWithStore initialLimit={15} />,
}

export const TwentyPerPage: Story = {
  render: () => <ProductsPerPageWithStore initialLimit={20} />,
}
