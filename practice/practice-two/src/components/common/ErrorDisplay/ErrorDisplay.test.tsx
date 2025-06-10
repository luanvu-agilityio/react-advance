import { render, screen, fireEvent } from '@testing-library/react'
import ErrorDisplay from './index'
import type { CSSProperties, ReactNode } from 'react'

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  AlertTriangle: ({
    size,
    color,
    style,
  }: {
    size?: number | string
    color?: string
<<<<<<< HEAD
    style?: CSSProperties
=======
    style?: React.CSSProperties
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  }) => (
    <div
      data-testid="alert-triangle-icon"
      data-size={size}
      data-color={color}
      style={style}
    >
      AlertTriangle
    </div>
  ),
  RefreshCw: ({ size }: { size?: number | string }) => (
    <div data-testid="refresh-icon" data-size={size}>
      RefreshCw
    </div>
  ),
}))

// Mock Radix UI components
jest.mock('@radix-ui/themes', () => ({
  Theme: ({ children }: { children: ReactNode }) => (
    <div data-testid="theme-wrapper">{children}</div>
  ),
  Button: ({
    children,
    onClick,
    variant,
    style,
  }: {
    children: ReactNode
    onClick?: () => void
    variant?: string
    style?: CSSProperties
  }) => (
    <button
      data-testid="retry-button"
      onClick={onClick}
      data-variant={variant}
      style={style}
    >
      {children}
    </button>
  ),
}))

// Mock the Text component
<<<<<<< HEAD
jest.mock('../Text/index', () => ({
=======
jest.mock('./Text/index', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  __esModule: true,
  default: ({
    text,
    as,
    style,
  }: {
    text: string
    as: string
    style: CSSProperties
  }) => (
    <div data-testid={`text-${as}`} data-as={as} style={style}>
      {text}
    </div>
  ),
}))

describe('ErrorDisplay', () => {
  const defaultProps = {
    error: 'Test error message',
  }

<<<<<<< HEAD
  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders all variants correctly', () => {
      // Default error display
      const { container: defaultContainer } = render(
        <ErrorDisplay {...defaultProps} />
      )
      expect(defaultContainer).toMatchSnapshot('default-error-display')

      // With retry button
      const onRetry = jest.fn()
      const { container: withRetryContainer } = render(
        <ErrorDisplay {...defaultProps} onRetry={onRetry} />
      )
      expect(withRetryContainer).toMatchSnapshot('with-retry-button')

      // With custom title
      const { container: customTitleContainer } = render(
        <ErrorDisplay {...defaultProps} title="Custom Error Title" />
      )
      expect(customTitleContainer).toMatchSnapshot('custom-title')

      // With custom retry text
      const { container: customRetryTextContainer } = render(
        <ErrorDisplay
          {...defaultProps}
          onRetry={() => {}}
          retryText="Custom Retry"
        />
      )
      expect(customRetryTextContainer).toMatchSnapshot('custom-retry-text')

      // With long error message
      const longError =
        'This is a very long error message that should be displayed properly without breaking the layout. It includes many words to ensure that text wrapping and other layout considerations are properly tested in the snapshot.'
      const { container: longErrorContainer } = render(
        <ErrorDisplay error={longError} />
      )
      expect(longErrorContainer).toMatchSnapshot('long-error-message')
    })
  })

  // INTERACTIVE BEHAVIOR TEST
  describe('Interactive behavior', () => {
    it('calls onRetry when retry button is clicked', () => {
      const onRetry = jest.fn()
      render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

      const retryButton = screen.getByTestId('retry-button')
      fireEvent.click(retryButton)

      expect(onRetry).toHaveBeenCalledTimes(1)
    })
=======
  it('renders without crashing', () => {
    render(<ErrorDisplay {...defaultProps} />)

    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument()
  })

  it('displays the error message', () => {
    render(<ErrorDisplay {...defaultProps} />)

    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('displays the default title', () => {
    render(<ErrorDisplay {...defaultProps} />)

    expect(screen.getByText('Failed to Load Products')).toBeInTheDocument()
  })

  it('renders AlertTriangle icon with correct props', () => {
    render(<ErrorDisplay {...defaultProps} />)

    const icon = screen.getByTestId('alert-triangle-icon')
    expect(icon).toHaveAttribute('data-size', '48')
    expect(icon).toHaveAttribute('data-color', 'var(--red-9)')
  })

  it('renders title as h3 element', () => {
    render(<ErrorDisplay {...defaultProps} />)

    const titleElement = screen.getByTestId('text-h3')
    expect(titleElement).toHaveAttribute('data-as', 'h3')
    expect(titleElement).toHaveTextContent('Failed to Load Products')
  })

  it('renders error message as p element', () => {
    render(<ErrorDisplay {...defaultProps} />)

    const errorElement = screen.getByTestId('text-p')
    expect(errorElement).toHaveAttribute('data-as', 'p')
    expect(errorElement).toHaveTextContent('Test error message')
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorDisplay {...defaultProps} />)

    expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const onRetry = jest.fn()
    render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

    expect(screen.getByTestId('retry-button')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = jest.fn()
    render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

    const retryButton = screen.getByTestId('retry-button')
    fireEvent.click(retryButton)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders refresh icon in retry button', () => {
    const onRetry = jest.fn()
    render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument()
  })

  it('applies correct styling to retry button', () => {
    const onRetry = jest.fn()
    render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

    const retryButton = screen.getByTestId('retry-button')
    expect(retryButton).toHaveAttribute('data-variant', 'solid')
  })

  it('wraps content in Theme component', () => {
    render(<ErrorDisplay {...defaultProps} />)

    expect(screen.getByTestId('theme-wrapper')).toBeInTheDocument()
  })

  it('handles long error messages', () => {
    const longError =
      'This is a very long error message that should be displayed properly without breaking the layout'
    render(<ErrorDisplay error={longError} />)

    expect(screen.getByText(longError)).toBeInTheDocument()
  })

  it('handles empty error message', () => {
    render(<ErrorDisplay error="" />)

    const errorElement = screen.getByTestId('text-p')
    expect(errorElement).toHaveTextContent('')
  })

  it('maintains component structure', () => {
    const onRetry = jest.fn()
    render(<ErrorDisplay {...defaultProps} onRetry={onRetry} />)

    // Check that all elements are present in correct order
    const themeWrapper = screen.getByTestId('theme-wrapper')
    const icon = screen.getByTestId('alert-triangle-icon')
    const title = screen.getByTestId('text-h3')
    const errorText = screen.getByTestId('text-p')
    const retryButton = screen.getByTestId('retry-button')

    expect(themeWrapper).toContainElement(icon)
    expect(themeWrapper).toContainElement(title)
    expect(themeWrapper).toContainElement(errorText)
    expect(themeWrapper).toContainElement(retryButton)
  })

  it('applies correct styling to title', () => {
    render(<ErrorDisplay {...defaultProps} />)

    const titleElement = screen.getByTestId('text-h3')
    const styles = titleElement.style

    expect(styles.fontSize).toBe('20px')
    expect(styles.fontWeight).toBe('var(--font-weight-semibold)')
    expect(styles.color).toBe('var(--red-11)')
  })

  it('applies correct styling to error text', () => {
    render(<ErrorDisplay {...defaultProps} />)

    const errorElement = screen.getByTestId('text-p')
    const styles = errorElement.style

    expect(styles.fontSize).toBe('16px')
    expect(styles.color).toBe('var(--red-10)')
    expect(styles.maxWidth).toBe('500px')
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
