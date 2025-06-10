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
      { name: 'United Farms', selected: false },
      { name: 'Organic Farms', selected: true },
      { name: 'Fresh Fields', selected: false },
      { name: 'Green Gardens', selected: false },
      { name: "Nature's Best", selected: true },
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
      { name: 'United Farms', selected: false },
      { name: 'Organic Farms', selected: false },
      { name: 'Fresh Fields', selected: false },
      { name: 'Green Gardens', selected: false },
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
      { name: 'United Farms', selected: false },
      { name: 'Organic Farms', selected: false },
      { name: 'Fresh Fields', selected: false },
      { name: 'Green Gardens', selected: false },
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
      },
      {
        name: 'Another Really Long Brand Name To Test Text Wrapping',
        selected: true,
      },
      { name: 'Short Name', selected: false },
    ],
    onBrandChange: () => {},
  },
}
