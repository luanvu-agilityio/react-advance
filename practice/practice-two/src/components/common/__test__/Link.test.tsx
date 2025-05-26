import { render, screen, fireEvent } from '@testing-library/react'
import Link from '../Link'

describe('Link Component', () => {
  const defaultProps = {
    href: 'https://example.com',
    children: 'Click me',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    render(<Link {...defaultProps} />)
    const link = screen.getByText('Click me')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).not.toHaveAttribute('rel')
  })

  test('handles click events when not disabled', () => {
    render(<Link {...defaultProps} />)
    const link = screen.getByText('Click me')

    fireEvent.click(link)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  test('prevents click events when disabled', () => {
    render(<Link {...defaultProps} disabled />)
    const link = screen.getByText('Click me')

    fireEvent.click(link)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })

  test('applies custom styles', () => {
    const customStyle = { color: 'red', fontSize: '16px' }
    render(<Link {...defaultProps} style={customStyle} />)
    const link = screen.getByText('Click me')

    expect(link).toHaveStyle(customStyle)
  })

  test('applies disabled styles', () => {
    render(<Link {...defaultProps} disabled />)
    const link = screen.getByText('Click me')

    expect(link).toHaveStyle({
      cursor: 'not-allowed',
      opacity: '0.5',
    })
  })

  test('handles different target values', () => {
    const targets = ['_self', '_blank', '_parent', '_top'] as const

    targets.forEach((target) => {
      const { rerender } = render(<Link {...defaultProps} target={target} />)
      const link = screen.getByText('Click me')

      expect(link).toHaveAttribute('target', target)
      rerender(<Link {...defaultProps} />)
    })
  })
})
