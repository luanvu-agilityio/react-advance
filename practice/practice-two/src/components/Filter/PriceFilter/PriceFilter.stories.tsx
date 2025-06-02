import type { Meta, StoryObj } from '@storybook/react'
import { useState, type ChangeEvent } from 'react'
import { PriceFilter } from './PriceFilter'
import type { PriceRangeProps } from 'types/Filter'

const meta: Meta<typeof PriceFilter> = {
  title: 'Components/Filter/PriceFilter',
  component: PriceFilter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PriceFilter>

/**
 * Default PriceFilter with pre-set values
 */
export const Default: Story = {
  args: {
    priceRange: { min: 100, max: 500 },
    sliderValues: [100, 500],
    onSliderChange: (values) => {
      console.log(`Slider values changed: ${values}`)
    },
    onMinInputChange: (e) => {
      console.log(`Min input changed: ${e.target.value}`)
    },
    onMaxInputChange: (e) => {
      console.log(`Max input changed: ${e.target.value}`)
    },
    onApplyFilters: () => {
      console.log('Apply filters clicked')
    },
    onResetFilters: () => {
      console.log('Reset filters clicked')
    },
  },
}

/**
 * PriceFilter with minimum and maximum values set
 */
export const MinMaxValues: Story = {
  args: {
    priceRange: { min: 0, max: 1000 },
    sliderValues: [0, 1000],
    onSliderChange: () => {},
    onMinInputChange: () => {},
    onMaxInputChange: () => {},
    onApplyFilters: () => {},
    onResetFilters: () => {},
  },
}

/**
 * PriceFilter with narrow price range
 */
export const NarrowRange: Story = {
  args: {
    priceRange: { min: 450, max: 550 },
    sliderValues: [450, 550],
    onSliderChange: () => {},
    onMinInputChange: () => {},
    onMaxInputChange: () => {},
    onApplyFilters: () => {},
    onResetFilters: () => {},
  },
}

/**
 * Fully interactive PriceFilter that demonstrates state changes
 */
export const Interactive: Story = {
  render: function InteractivePriceFilter() {
    const [priceRange, setPriceRange] = useState<PriceRangeProps>({
      min: 200,
      max: 800,
    })
    const [sliderValues, setSliderValues] = useState([200, 800])
    const [appliedValues, setAppliedValues] = useState({
      min: 200,
      max: 800,
    })

    const handleSliderChange = (values: number[]) => {
      setSliderValues(values)
      setPriceRange({
        min: values[0],
        max: values[1],
      })
    }

    const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), priceRange.max)
      setPriceRange({
        ...priceRange,
        min: value,
      })
      setSliderValues([value, sliderValues[1]])
    }

    const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), priceRange.min)
      setPriceRange({
        ...priceRange,
        max: value,
      })
      setSliderValues([sliderValues[0], value])
    }

    const handleApplyFilters = () => {
      setAppliedValues({
        min: sliderValues[0],
        max: sliderValues[1],
      })
      alert(`Applied filter: $${sliderValues[0]} - $${sliderValues[1]}`)
    }

    const handleResetFilters = () => {
      setPriceRange({ min: 0, max: 1000 })
      setSliderValues([0, 1000])
      setAppliedValues({ min: 0, max: 1000 })
      alert('Filters reset to default values')
    }

    return (
      <div>
        <PriceFilter
          priceRange={priceRange}
          sliderValues={sliderValues}
          onSliderChange={handleSliderChange}
          onMinInputChange={handleMinInputChange}
          onMaxInputChange={handleMaxInputChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
        <div style={{ marginTop: 20, padding: 10, backgroundColor: '#f5f5f5' }}>
          <h4>Current State:</h4>
          <p>
            Price Range: ${priceRange.min} - ${priceRange.max}
          </p>
          <p>
            Slider Values: ${sliderValues[0]} - ${sliderValues[1]}
          </p>
          <p>
            Applied Values: ${appliedValues.min} - ${appliedValues.max}
          </p>
        </div>
      </div>
    )
  },
}
