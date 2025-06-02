import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import BuyingUnit from './BuyingUnit'

const defaultProps = {
  quantity: 1,
  unit: 'pcs',
  onQuantityChange: vi.fn(),
  onUnitChange: vi.fn(),
}

describe('BuyingUnit Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<BuyingUnit {...defaultProps} />)

      expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      expect(screen.getByText('pcs')).toBeInTheDocument()
    })

    it('renders with custom quantity and unit', () => {
      render(<BuyingUnit {...defaultProps} quantity={5} unit="kgs" />)

      expect(screen.getByDisplayValue('5')).toBeInTheDocument()
      expect(screen.getByText('kgs')).toBeInTheDocument()
    })
  })

  describe('Quantity Input', () => {
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

    it('updates input value when quantity prop changes', () => {
      const { rerender } = render(<BuyingUnit {...defaultProps} quantity={1} />)

      rerender(<BuyingUnit {...defaultProps} quantity={10} />)

      expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    })
  })

  describe('Unit Dropdown', () => {
    it('opens dropdown when button is clicked', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(screen.getByRole('listbox')).toBeVisible()
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('closes dropdown when option is selected', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const kgsOption = screen.getByText('kgs')
      await user.click(kgsOption)

      expect(defaultProps.onUnitChange).toHaveBeenCalledWith('kgs')
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('displays all available units', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(screen.getByText('pcs')).toBeInTheDocument()
      expect(screen.getByText('kgs')).toBeInTheDocument()
      expect(screen.getByText('box')).toBeInTheDocument()
      expect(screen.getByText('pack')).toBeInTheDocument()
    })

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <BuyingUnit {...defaultProps} />
          <div data-testid="outside">Outside element</div>
        </div>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      expect(screen.getByRole('listbox')).toBeVisible()

      const outsideElement = screen.getByTestId('outside')
      await user.click(outsideElement)

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      const button = screen.getByRole('button')

      expect(input).toHaveAttribute('aria-label', 'Quantity')
      expect(button).toHaveAttribute('aria-haspopup', 'listbox')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('has proper keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      // Tab to input
      await user.tab()
      expect(screen.getByRole('spinbutton')).toHaveFocus()

      // Tab to button
      await user.tab()
      expect(screen.getByRole('button')).toHaveFocus()

      // Enter to open dropdown
      await user.keyboard('{Enter}')
      expect(screen.getByRole('listbox')).toBeVisible()
    })
  })

  describe('Edge Cases', () => {
    it('handles negative numbers correctly', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      await user.clear(input)
      await user.type(input, '-5')
      await user.tab()

      expect(input).toHaveValue(1)
      expect(defaultProps.onQuantityChange).toHaveBeenCalledWith(1)
    })

    it('handles decimal numbers correctly', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      await user.clear(input)
      await user.type(input, '2.5')

      expect(defaultProps.onQuantityChange).toHaveBeenCalledWith(2)
    })

    it('handles empty input correctly', async () => {
      const user = userEvent.setup()
      render(<BuyingUnit {...defaultProps} />)

      const input = screen.getByRole('spinbutton')
      await user.clear(input)
      await user.tab()

      expect(input).toHaveValue(1)
      expect(defaultProps.onQuantityChange).toHaveBeenCalledWith(1)
    })
  })
})
