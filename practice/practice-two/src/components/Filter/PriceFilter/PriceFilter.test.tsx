import { render, screen, fireEvent } from '@testing-library/react'
import { PriceFilter } from './PriceFilter'
import type { PriceRangeProps } from 'types/Filter'
import type { ReactNode } from 'react'

// Mock the slider component since it might use complex DOM interactions
jest.mock('./FilterStyles', () => {
  const actual = jest.requireActual('./FilterStyles')
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
      >
        {children}
      </div>
    ),
    SliderTrack: ({ children }: { children: ReactNode }) => (
      <div data-testid="slider-track">{children}</div>
    ),
    SliderRange: () => <div data-testid="slider-range" />,
    SliderThumb: () => <div data-testid="slider-thumb" />,
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

  it('renders the component correctly', () => {
    render(<PriceFilter {...defaultProps} />)

    // Check title
    expect(screen.getByText('Price')).toBeInTheDocument()

    // Check inputs
    expect(screen.getByText('Min')).toBeInTheDocument()
    expect(screen.getByText('Max')).toBeInTheDocument()

    // Check buttons
    expect(screen.getByText('Apply')).toBeInTheDocument()
    expect(screen.getByText('Reset')).toBeInTheDocument()

    // Check slider elements
    expect(screen.getByTestId('slider-root')).toBeInTheDocument()
    expect(screen.getByTestId('slider-track')).toBeInTheDocument()
    expect(screen.getByTestId('slider-range')).toBeInTheDocument()

    // Check for two thumbs
    const thumbs = screen.getAllByTestId('slider-thumb')
    expect(thumbs).toHaveLength(2)
  })

  it('displays the correct price range values', () => {
    render(<PriceFilter {...defaultProps} />)

    const minInput = screen.getByLabelText('Min') as HTMLInputElement
    const maxInput = screen.getByLabelText('Max') as HTMLInputElement

    expect(minInput.value).toBe('100')
    expect(maxInput.value).toBe('500')
  })

  it('calls onMinInputChange when min input changes', () => {
    render(<PriceFilter {...defaultProps} />)

    const minInput = screen.getByLabelText('Min')
    fireEvent.change(minInput, { target: { value: '200' } })

    expect(defaultProps.onMinInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls onMaxInputChange when max input changes', () => {
    render(<PriceFilter {...defaultProps} />)

    const maxInput = screen.getByLabelText('Max')
    fireEvent.change(maxInput, { target: { value: '600' } })

    expect(defaultProps.onMaxInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls onSliderChange when slider value changes', () => {
    render(<PriceFilter {...defaultProps} />)

    const slider = screen.getByTestId('slider-root')
    fireEvent.click(slider)

    expect(defaultProps.onSliderChange).toHaveBeenCalledTimes(1)
    // Our mock implementation adds/subtracts 10 from values
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
