import { render, screen, fireEvent } from '@testing-library/react'
import { PriceFilter } from './PriceFilter'
import type { PriceRangeProps } from 'types/Filter'
import type { ReactNode } from 'react'

// Mock the slider component since it might use complex DOM interactions
jest.mock('../FilterStyles', () => {
  const actual = jest.requireActual('../FilterStyles')
  return {
    ...actual,
    SliderRoot: ({
      children,
      onValueChange,
      value,
    }: {
      children: ReactNode
      onValueChange: (value: number[]) => void
      value: number[]
    }) => (
      <div
        data-testid="slider-root"
        onClick={() => onValueChange([value[0] + 10, value[1] - 10])}
        data-min={value[0]}
        data-max={value[1]}
      >
        {children}
      </div>
    ),
    SliderTrack: ({ children }: { children: ReactNode }) => (
      <div data-testid="slider-track">{children}</div>
    ),
    SliderRange: () => <div data-testid="slider-range" />,
    SliderThumb: () => <div data-testid="slider-thumb" />,
    PriceInput: (props: { 'aria-label'?: string; [key: string]: unknown }) => (
      <input
        data-testid={`price-input-${props['aria-label']?.toLowerCase()}`}
        {...props}
      />
    ),
  }
})

describe('PriceFilter', () => {
  const defaultProps = {
    priceRange: { min: 100, max: 500 } as PriceRangeProps,
    sliderValues: [100, 500],
    onSliderChange: jest.fn(),
    onMinInputChange: jest.fn(),
    onMaxInputChange: jest.fn(),
    onApplyFilters: jest.fn(),
    onResetFilters: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders different states correctly', () => {
      // Default state
      const { container: defaultContainer } = render(
        <PriceFilter {...defaultProps} />
      )
      expect(defaultContainer).toMatchSnapshot('default')

      // With different price range values
      const { container: differentRangeContainer } = render(
        <PriceFilter
          {...defaultProps}
          priceRange={{ min: 50, max: 700 }}
          sliderValues={[50, 700]}
        />
      )
      expect(differentRangeContainer).toMatchSnapshot('different-range')

      // With high range values
      const { container: extremeValuesContainer } = render(
        <PriceFilter
          {...defaultProps}
          priceRange={{ min: 0, max: 1000 }}
          sliderValues={[0, 1000]}
        />
      )
      expect(extremeValuesContainer).toMatchSnapshot('extreme-values')

      // With equal min/max (edge case)
      const { container: equalValuesContainer } = render(
        <PriceFilter
          {...defaultProps}
          priceRange={{ min: 250, max: 250 }}
          sliderValues={[250, 250]}
        />
      )
      expect(equalValuesContainer).toMatchSnapshot('equal-values')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive Behavior', () => {
    it('calls onSliderChange when slider value changes', () => {
      render(<PriceFilter {...defaultProps} />)

      const slider = screen.getByTestId('slider-root')
      fireEvent.click(slider)

      expect(defaultProps.onSliderChange).toHaveBeenCalledTimes(1)
      expect(defaultProps.onSliderChange).toHaveBeenCalledWith([110, 490])
    })

    it('calls onApplyFilters when Apply button is clicked', () => {
      render(<PriceFilter {...defaultProps} />)

      const applyButton = screen.getByText('Apply')
      fireEvent.click(applyButton)

      expect(defaultProps.onApplyFilters).toHaveBeenCalledTimes(1)
    })

    it('calls onResetFilters when Reset button is clicked', () => {
      render(<PriceFilter {...defaultProps} />)

      const resetButton = screen.getByText('Reset')
      fireEvent.click(resetButton)

      expect(defaultProps.onResetFilters).toHaveBeenCalledTimes(1)
    })
  })
})
