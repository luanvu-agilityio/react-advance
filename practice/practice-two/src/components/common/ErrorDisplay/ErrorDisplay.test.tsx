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
    style?: CSSProperties
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
jest.mock('../Text/index', () => ({
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
  })
})
