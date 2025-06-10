import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'
import type { ReactNode } from 'react'

// Mock the styled components
<<<<<<< HEAD
jest.mock('./ErrorBoundary.style', () => ({
=======
jest.mock('./ErrorBoundary.styles', () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  ErrorContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="error-container">{children}</div>
  ),
  ThemeWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="theme-wrapper">{children}</div>
  ),
  StyledShieldIcon: ({ size }: { size: number }) => (
    <div data-testid="shield-icon" data-size={size}>
      ShieldIcon
    </div>
  ),
  ErrorTitle: ({ children }: { children: ReactNode }) => (
    <h2 data-testid="error-title">{children}</h2>
  ),
  ErrorDescription: ({ children }: { children: ReactNode }) => (
    <p data-testid="error-description">{children}</p>
  ),
  RetryButton: ({
    children,
    onClick,
    variant,
  }: {
    children: ReactNode
    onClick: () => void
    variant?: string
  }) => (
    <button data-testid="retry-button" onClick={onClick} data-variant={variant}>
      {children}
    </button>
  ),
}))

// Mock Radix UI Theme
jest.mock('@radix-ui/themes', () => ({
  Theme: ({ children }: { children: ReactNode }) => (
    <div data-testid="radix-theme">{children}</div>
  ),
}))

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div data-testid="working-component">Working component</div>
}

// Suppress console.error for tests
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
<<<<<<< HEAD
  // SNAPSHOT TESTS FOR RENDERING STATES
  describe('Rendering States', () => {
    it('renders correctly when there is no error', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      expect(container).toMatchSnapshot('no-error')
    })

    it('renders error UI correctly when error occurs', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      expect(container).toMatchSnapshot('with-error')
    })

    it('renders custom fallback correctly', () => {
      const customFallback = (
        <div data-testid="custom-fallback">Custom Error UI</div>
      )
      const { container } = render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      expect(container).toMatchSnapshot('custom-fallback')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive Behavior', () => {
    it('retries when retry button is clicked', () => {
      let shouldThrow = true

      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Test error')
        }
        return <div data-testid="recovered-component">Component recovered</div>
      }

      render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      )

      // Error UI should be shown
      expect(screen.getByTestId('error-container')).toBeInTheDocument()

      // Prepare for retry - this will make the component render without error next time
      shouldThrow = false

      // Click retry button
      fireEvent.click(screen.getByTestId('retry-button'))

      // Component should recover
      expect(screen.getByTestId('recovered-component')).toBeInTheDocument()
      expect(screen.queryByTestId('error-container')).not.toBeInTheDocument()
    })

    it('calls onError callback when error occurs', () => {
      const onError = jest.fn()

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      // Verify onError was called with correct parameters
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      )
    })
=======
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('working-component')).toBeInTheDocument()
    expect(screen.queryByTestId('error-container')).not.toBeInTheDocument()
  })

  it('catches errors and displays error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('error-container')).toBeInTheDocument()
    expect(screen.getByTestId('error-title')).toHaveTextContent(
      'Something went wrong'
    )
    expect(screen.queryByTestId('working-component')).not.toBeInTheDocument()
  })

  it('displays error description', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('error-description')).toHaveTextContent(
      'Failed to load the page. This might be due to a network issue or temporary problem.'
    )
  })

  it('renders shield icon with correct size', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const icon = screen.getByTestId('shield-icon')
    expect(icon).toHaveAttribute('data-size', '48')
  })

  it('renders retry button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('retry-button')).toBeInTheDocument()
    expect(screen.getByTestId('retry-button')).toHaveTextContent('Try Again')
  })

  it('retries when retry button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Error UI should be shown
    expect(screen.getByTestId('error-container')).toBeInTheDocument()

    // Click retry button
    fireEvent.click(screen.getByTestId('retry-button'))

    // Re-render with working component
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('working-component')).toBeInTheDocument()
    expect(screen.queryByTestId('error-container')).not.toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = (
      <div data-testid="custom-fallback">Custom Error UI</div>
    )

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.queryByTestId('error-container')).not.toBeInTheDocument()
  })

  it('calls onError callback when error occurs', () => {
    const onError = jest.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    )
  })

  it('maintains component structure in error state', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const container = screen.getByTestId('error-container')
    const themeWrapper = screen.getByTestId('theme-wrapper')
    const icon = screen.getByTestId('shield-icon')
    const title = screen.getByTestId('error-title')
    const description = screen.getByTestId('error-description')
    const button = screen.getByTestId('retry-button')

    expect(container).toContainElement(screen.getByTestId('radix-theme'))
    expect(themeWrapper).toContainElement(icon)
    expect(themeWrapper).toContainElement(title)
    expect(themeWrapper).toContainElement(description)
    expect(themeWrapper).toContainElement(button)
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
