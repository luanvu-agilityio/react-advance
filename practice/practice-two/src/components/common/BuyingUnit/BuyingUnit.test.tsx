import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BuyingUnit from './BuyingUnit'

const defaultProps = {
  quantity: 1,
  unit: 'pcs',
  onQuantityChange: jest.fn(),
  onUnitChange: jest.fn(),
}

describe.skip('BuyingUnit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING
  it('matches snapshots for different states', () => {
    // Default state
    const { container: defaultContainer } = render(
      <BuyingUnit {...defaultProps} />
    )
    expect(defaultContainer).toMatchSnapshot('default')

    // Different quantity and unit
    const { container: customContainer } = render(
      <BuyingUnit {...defaultProps} quantity={5} unit="kgs" />
    )
    expect(customContainer).toMatchSnapshot('custom-values')

    // Small size
    const { container: smallContainer } = render(
      <BuyingUnit {...defaultProps} size="small" />
    )
    expect(smallContainer).toMatchSnapshot('small-size')

    // Large size
    const { container: largeContainer } = render(
      <BuyingUnit {...defaultProps} size="large" />
    )
    expect(largeContainer).toMatchSnapshot('large-size')
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Quantity Input Behavior', () => {
    it('calls onQuantityChange when valid number is entered', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      await user.clear(input)
      await user.type(input, '5')

      expect(defaultProps.onQuantityChange).toHaveBeenCalledWith(5)
    })

    it('does not call onQuantityChange for invalid input', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      await user.clear(input)
      await user.type(input, 'abc')

      expect(defaultProps.onQuantityChange).not.toHaveBeenCalled()
    })
  })

  describe('Dropdown Behavior', () => {
    it('toggles dropdown visibility when clicking the select button', async () => {
      render(<BuyingUnit {...defaultProps} />)

      // Check dropdown is initially closed/hidden
      const dropdownList = screen.getByTestId('dropdown-list')
      expect(dropdownList).not.toHaveClass('$isOpen')

      // Open dropdown
      const selectButton = screen.getByRole('button', { name: /pcs/i })
      fireEvent.click(selectButton)

      // Check dropdown is open
      expect(dropdownList).toBeVisible()

      // Close dropdown by clicking button again
      fireEvent.click(selectButton)

      // Verify dropdown is closed
      expect(dropdownList).not.toHaveClass('$isOpen')
    })

    it('calls onUnitChange when selecting a unit option', () => {
      render(<BuyingUnit {...defaultProps} />)

      // Open dropdown
      const selectButton = screen.getByRole('button')
      fireEvent.click(selectButton)

      // Select a different option
      const kgsOption = screen.getByText('kgs')
      fireEvent.click(kgsOption)

      // Verify callback was called correctly
      expect(defaultProps.onUnitChange).toHaveBeenCalledWith('kgs')

      // Verify dropdown closed after selection
      const dropdownList = screen.getByTestId('dropdown-list')
      expect(dropdownList).not.toHaveClass('$isOpen')
    })

    it('closes dropdown when clicking outside', () => {
      render(
        <div>
          <BuyingUnit {...defaultProps} />
          <div data-testid="outside-area">Outside Area</div>
        </div>
      )

      // Open dropdown
      const selectButton = screen.getByRole('button')
      fireEvent.click(selectButton)

      // Verify dropdown is open
      const dropdownList = screen.getByTestId('dropdown-list')
      expect(dropdownList).toBeVisible()

      // Simulate click outside
      const outsideArea = screen.getByTestId('outside-area')
      fireEvent.mouseDown(outsideArea)

      // Verify dropdown closed
      expect(dropdownList).not.toHaveClass('$isOpen')
    })
  })
})
