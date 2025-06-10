import { render, screen, fireEvent } from '@testing-library/react'
import { BrandFilter } from './BrandFilter'
import type { BrandProps } from 'types/Filter'

describe('BrandFilter', () => {
  const mockBrands: BrandProps[] = [
    { name: 'United Farms', selected: false, count: 0 },
    { name: 'Organic Farms', selected: true, count: 0 },
    { name: 'Fresh Fields', selected: false, count: 0 },
  ]

  const mockOnBrandChange = jest.fn()

  beforeEach(() => {
    mockOnBrandChange.mockClear()
  })

  it('renders all brand options correctly', () => {
    render(
      <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
    )

    // Check if title is rendered
    expect(screen.getByText('Brands')).toBeInTheDocument()

    // Check if all brands are rendered
    expect(screen.getByText('United Farms')).toBeInTheDocument()
    expect(screen.getByText('Organic Farms')).toBeInTheDocument()
    expect(screen.getByText('Fresh Fields')).toBeInTheDocument()
  })

  it('shows selected checkboxes correctly', () => {
    render(
      <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
    )

    const checkboxes = screen.getAllByRole('checkbox')

    // Only the second checkbox (Organic Farms) should be checked
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()
  })

  it('calls onBrandChange with correct index when checkbox is clicked', () => {
    render(
      <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
    )

    // Click on the first checkbox
    const firstBrandLabel = screen.getByText('United Farms')
    fireEvent.click(firstBrandLabel)

    // Check if onBrandChange was called with the correct index
    expect(mockOnBrandChange).toHaveBeenCalledWith(0)
  })

  it('renders nothing when brands array is empty', () => {
    const { container } = render(
      <BrandFilter brands={[]} onBrandChange={mockOnBrandChange} />
    )
    expect(container.firstChild).toBeNull()
  })
})
