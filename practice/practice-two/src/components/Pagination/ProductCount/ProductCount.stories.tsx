import type { Meta, StoryObj } from '@storybook/react'
import { ProductCount } from './ProductCount'

const meta: Meta<typeof ProductCount> = {
  title: 'Components/Pagination/ProductCount',
  component: ProductCount,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalProducts: {
      control: 'number',
      description: 'Total number of products to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProductCount>

export const Default: Story = {
  args: {
    totalProducts: 42,
  },
}

export const SingleProduct: Story = {
  args: {
    totalProducts: 1,
  },
}

export const NoProducts: Story = {
  args: {
    totalProducts: 0,
  },
}

export const ManyProducts: Story = {
  args: {
    totalProducts: 1000,
  },
}
