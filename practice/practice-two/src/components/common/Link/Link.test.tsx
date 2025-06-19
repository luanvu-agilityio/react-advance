import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder

import { render, screen, fireEvent } from '@testing-library/react'
import Link from './index'

describe('Link Component', () => {
  const defaultProps = {
    href: 'https://example.com',
    children: 'Click me',
    onClick: jest.fn(),
    disabled: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

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
        <Link href="https://example.com">External Link</Link>
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
    })
  })
})
