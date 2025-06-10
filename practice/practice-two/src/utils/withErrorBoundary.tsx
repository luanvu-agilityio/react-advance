import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'
import { type ComponentType, type ReactNode, type ErrorInfo } from 'react'

interface WithErrorBoundaryOptions {
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  // You can add more options as needed
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 * @param Component - The component to wrap
 * @param options - Configuration options for the ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) {
  const { fallback, onError } = options

  // Create the wrapped component
  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  // Set display name for better debugging
  const displayName = Component.displayName ?? Component.name
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`

  return WrappedComponent
}
