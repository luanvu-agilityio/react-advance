import { render, screen, fireEvent } from '@testing-library/react'
import Tag from './index'

describe('Tag Component', () => {
<<<<<<< HEAD
  const mockOnClick = jest.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering Snapshots', () => {
    it('renders button tag variants correctly', () => {
      // Default button tag
      const { container: defaultButton } = render(
        <Tag as="button" label="Button Tag" onClick={mockOnClick} />
      )
      expect(defaultButton).toMatchSnapshot('default-button')

      // Selected button tag
      const { container: selectedButton } = render(
        <Tag
          as="button"
          label="Selected Button"
          onClick={mockOnClick}
          variant="selected"
        />
      )
      expect(selectedButton).toMatchSnapshot('selected-button')

      // Disabled button tag
      const { container: disabledButton } = render(
        <Tag
          as="button"
          label="Disabled Button"
          onClick={mockOnClick}
          variant="disabled"
        />
      )
      expect(disabledButton).toMatchSnapshot('disabled-button')

      // Button with children instead of label
      const { container: childrenButton } = render(
        <Tag as="button" label="" onClick={mockOnClick}>
          <span>Custom Content</span>
        </Tag>
      )
      expect(childrenButton).toMatchSnapshot('button-with-children')
    })

    it('renders link tag variants correctly', () => {
      // Default link tag
      const { container: defaultLink } = render(
        <Tag as="link" label="Link Tag" href="/test" onClick={mockOnClick} />
      )
      expect(defaultLink).toMatchSnapshot('default-link')

      // Selected link tag
      const { container: selectedLink } = render(
        <Tag
          as="link"
          label="Selected Link"
          href="/test"
          onClick={mockOnClick}
          variant="selected"
        />
      )
      expect(selectedLink).toMatchSnapshot('selected-link')

      // Disabled link tag
      const { container: disabledLink } = render(
        <Tag
          as="link"
          label="Disabled Link"
          href="/test"
          onClick={mockOnClick}
          variant="disabled"
        />
      )
      expect(disabledLink).toMatchSnapshot('disabled-link')

      // Link with target blank
      const { container: targetLink } = render(
        <Tag
          as="link"
          label="External Link"
          href="/test"
          target="_blank"
          onClick={mockOnClick}
        />
      )
      expect(targetLink).toMatchSnapshot('link-with-target')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive Behavior', () => {
    it('calls onClick when button tag is clicked', () => {
      render(<Tag as="button" label="Button Tag" onClick={mockOnClick} />)

=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      fireEvent.click(screen.getByText('Button Tag'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

<<<<<<< HEAD
    it('does not call onClick when disabled button tag is clicked', () => {
      render(
        <Tag
          as="button"
          label="Disabled Button"
          onClick={mockOnClick}
          variant="disabled"
        />
      )

      fireEvent.click(screen.getByText('Disabled Button'))
      expect(mockOnClick).not.toHaveBeenCalled()

      // Verify it's actually disabled
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('calls onClick when link tag is clicked', () => {
      render(
        <Tag as="link" label="Link Tag" href="/test" onClick={mockOnClick} />
      )

      fireEvent.click(screen.getByText('Link Tag'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
