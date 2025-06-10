import { render, screen, fireEvent } from '@testing-library/react'
import Link from './index'

describe('Link Component', () => {
  const defaultProps = {
    href: 'https://example.com',
    children: 'Click me',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

<<<<<<< HEAD
  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('matches snapshots for various configurations', () => {
      // Default link
      const { container: defaultContainer } = render(<Link {...defaultProps} />)
      expect(defaultContainer).toMatchSnapshot('default-link')

      // Disabled link
      const { container: disabledContainer } = render(
        <Link {...defaultProps} disabled />
      )
      expect(disabledContainer).toMatchSnapshot('disabled-link')

      // Custom styled link
      const customStyle = { color: 'red', fontSize: '16px' }
      const { container: styledContainer } = render(
        <Link {...defaultProps} style={customStyle} />
      )
      expect(styledContainer).toMatchSnapshot('custom-styled-link')

      // External link (opens in new tab)
      const { container: externalContainer } = render(
        <Link href="https://example.com" target="_blank">
          External Link
        </Link>
      )
      expect(externalContainer).toMatchSnapshot('external-link')

      // Link with className
      const { container: classContainer } = render(
        <Link {...defaultProps} className="custom-class">
          Classy Link
        </Link>
      )
      expect(classContainer).toMatchSnapshot('link-with-class')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive Behavior', () => {
    it('handles click events when not disabled', () => {
      render(<Link {...defaultProps} />)
      const link = screen.getByText('Click me')

      fireEvent.click(link)
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('prevents click events when disabled', () => {
      render(<Link {...defaultProps} disabled />)
      const link = screen.getByText('Click me')

      fireEvent.click(link)
      expect(defaultProps.onClick).not.toHaveBeenCalled()

      const preventDefaultSpy = jest.spyOn(Event.prototype, 'preventDefault')
      fireEvent.click(link)
      expect(preventDefaultSpy).toHaveBeenCalled()

      preventDefaultSpy.mockRestore()
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    })
  })
})
