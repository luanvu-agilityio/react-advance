import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BrandFilter } from './BrandFilter'
import type { BrandProps } from 'types/Filter'

const meta: Meta<typeof BrandFilter> = {
  title: 'Components/Filter/BrandFilter',
  component: BrandFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BrandFilter>

/**
 * Default BrandFilter with multiple brand options
 */
export const Default: Story = {
  args: {
    brands: [
      { name: 'United Farms', selected: false, count: 12 },
      { name: 'Organic Farms', selected: true, count: 8 },
      { name: 'Fresh Fields', selected: false, count: 5 },
      { name: 'Green Gardens', selected: false, count: 3 },
      { name: "Nature's Best", selected: true, count: 7 },
    ],
    onBrandChange: (index) => {
      console.log(`Brand at index ${index} clicked`)
    },
  },
}

/**
 * BrandFilter with no selected brands
 */
export const NoSelectedBrands: Story = {
  args: {
    brands: [
      { name: 'United Farms', selected: false, count: 4 },
      { name: 'Organic Farms', selected: false, count: 6 },
      { name: 'Fresh Fields', selected: false, count: 2 },
      { name: 'Green Gardens', selected: false, count: 9 },
    ],
    onBrandChange: (index) => {
      console.log(`Brand at index ${index} clicked`)
    },
  },
}

/**
 * BrandFilter with interactive state
 */
export const Interactive: Story = {
  render: function InteractiveBrandFilter() {
    const [brands, setBrands] = useState<BrandProps[]>([
      { name: 'United Farms', selected: false, count: 5 },
      { name: 'Organic Farms', selected: false, count: 7 },
      { name: 'Fresh Fields', selected: false, count: 3 },
      { name: 'Green Gardens', selected: false, count: 10 },
    ])

    const handleBrandChange = (index: number) => {
      const newBrands = [...brands]
      newBrands[index].selected = !newBrands[index].selected
      setBrands(newBrands)
    }

    return <BrandFilter brands={brands} onBrandChange={handleBrandChange} />
  },
}

/**
 * BrandFilter with many brands to show scrolling behavior
 */
export const ManyBrands: Story = {
  args: {
    brands: Array(15)
      .fill(null)
      .map((_, i) => ({
        name: `Brand ${i + 1}`,
        selected: i % 3 === 0, // Every third brand is selected
        count: Math.floor(Math.random() * 20) + 1, // Random count between 1-20
      })),
    onBrandChange: (index) => {
      console.log(`Brand at index ${index} clicked`)
    },
  },
}

/**
 * BrandFilter with empty brands array (should not render)
 */
export const EmptyBrands: Story = {
  args: {
    brands: [],
    onBrandChange: () => {},
  },
}

/**
 * BrandFilter with really long brand names
 */
export const LongBrandNames: Story = {
  args: {
    brands: [
      {
        name: 'Super Long Brand Name That Might Overflow Containers And Cause Layout Issues',
        selected: false,
        count: 3,
      },
      {
        name: 'Another Really Long Brand Name To Test Text Wrapping',
        selected: true,
        count: 6,
      },
      { name: 'Short Name', selected: false, count: 12 },
    ],
    onBrandChange: () => {},
  },
}
