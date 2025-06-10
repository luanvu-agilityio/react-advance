import { render, screen, fireEvent } from '@testing-library/react'
import { BrandFilter } from './BrandFilter'
import type { BrandProps } from 'types/Filter'

describe('BrandFilter Component', () => {
  const mockBrands: BrandProps[] = [
    { name: 'United Farms', selected: false },
    { name: 'Organic Farms', selected: true },
    { name: 'Fresh Fields', selected: false },
  ]

  const mockOnBrandChange = jest.fn()

  beforeEach(() => {
    mockOnBrandChange.mockClear()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders different states correctly', () => {
      // Default state with mixed selections
      const { container: defaultContainer } = render(
        <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
      )
      expect(defaultContainer).toMatchSnapshot('mixed-selections')

      // All selected state
      const allSelected: BrandProps[] = mockBrands.map((brand) => ({
        ...brand,
        selected: true,
      }))
      const { container: allSelectedContainer } = render(
        <BrandFilter brands={allSelected} onBrandChange={mockOnBrandChange} />
      )
      expect(allSelectedContainer).toMatchSnapshot('all-selected')

      // None selected state
      const noneSelected: BrandProps[] = mockBrands.map((brand) => ({
        ...brand,
        selected: false,
      }))
      const { container: noneSelectedContainer } = render(
        <BrandFilter brands={noneSelected} onBrandChange={mockOnBrandChange} />
      )
      expect(noneSelectedContainer).toMatchSnapshot('none-selected')

      // Empty brands array
      const { container: emptyContainer } = render(
        <BrandFilter brands={[]} onBrandChange={mockOnBrandChange} />
      )
      expect(emptyContainer).toMatchSnapshot('empty-brands')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('calls onBrandChange with correct index when checkbox is clicked', () => {
      render(
        <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
      )

      // Click on the first checkbox label
      const firstBrandLabel = screen.getByText('United Farms')
      fireEvent.click(firstBrandLabel)

      // Check if onBrandChange was called with the correct index
      expect(mockOnBrandChange).toHaveBeenCalledWith(0)
    })

    it('handles clicking on already selected checkbox', () => {
      render(
        <BrandFilter brands={mockBrands} onBrandChange={mockOnBrandChange} />
      )

      // Click on the second checkbox which is already selected
      const secondBrandLabel = screen.getByText('Organic Farms')
      fireEvent.click(secondBrandLabel)

      // Check if onBrandChange was called with the correct index
      expect(mockOnBrandChange).toHaveBeenCalledWith(1)
    })
  })
})
