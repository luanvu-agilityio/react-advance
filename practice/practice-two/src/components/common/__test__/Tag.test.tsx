import { render, screen, fireEvent } from '@testing-library/react'
import Tag from '../Tag'

describe('Tag Component', () => {
  // Button variant tests
  describe('Button Tag', () => {
    const mockOnClick = jest.fn()
    const defaultButtonProps = {
      as: 'button' as const,
      label: 'Button Tag',
      onClick: mockOnClick,
    }

    beforeEach(() => {
      mockOnClick.mockClear()
    })

    test('renders button tag with label', () => {
      render(<Tag {...defaultButtonProps} />)
      expect(screen.getByText('Button Tag')).toBeInTheDocument()
    })

    test('calls onClick when clicked', () => {
      render(<Tag {...defaultButtonProps} />)
      fireEvent.click(screen.getByText('Button Tag'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    test('applies disabled styles when variant is disabled', () => {
      render(<Tag {...defaultButtonProps} variant="disabled" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ cursor: 'not-allowed' })
      expect(button).toBeDisabled()
    })

    test('applies selected variant styles', () => {
      render(<Tag {...defaultButtonProps} variant="selected" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ backgroundColor: 'var(--cyan-shade-4)' })
    })
  })

  // Link variant tests
  describe('Link Tag', () => {
    const mockOnClick = jest.fn()
    const defaultLinkProps = {
      as: 'link' as const,
      label: 'Link Tag',
      href: '/test',
      onClick: mockOnClick,
    }

    beforeEach(() => {
      mockOnClick.mockClear()
    })

    test('renders link tag with label', () => {
      render(<Tag {...defaultLinkProps} />)
      const link = screen.getByText('Link Tag')
      expect(link).toBeInTheDocument()
      expect(link.closest('a')).toHaveAttribute('href', '/test')
    })

    test('calls onClick when clicked', () => {
      render(<Tag {...defaultLinkProps} />)
      fireEvent.click(screen.getByText('Link Tag'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    test('renders with custom target', () => {
      render(<Tag {...defaultLinkProps} target="_blank" />)
      expect(screen.getByText('Link Tag').closest('a')).toHaveAttribute(
        'target',
        '_blank'
      )
    })

    test('applies disabled styles when variant is disabled', () => {
      render(<Tag {...defaultLinkProps} variant="disabled" />)
      const link = screen.getByText('Link Tag').closest('a')
      expect(link?.parentElement).toHaveStyle({ opacity: 0.7 })
    })

    test('applies selected variant styles', () => {
      render(<Tag {...defaultLinkProps} variant="selected" />)
      const link = screen.getByText('Link Tag').closest('a')
      expect(link).toHaveStyle({ backgroundColor: 'var(--green-shade-3)' })
    })
  })
})
