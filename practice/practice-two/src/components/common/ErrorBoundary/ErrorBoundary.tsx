import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'
import {
  ErrorContainer,
  ThemeWrapper,
  StyledShieldIcon,
  ErrorTitle,
  ErrorDescription,
  RetryButton,
} from './ErrorBoundary.style'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <ErrorContainer>
          <Theme>
            <ThemeWrapper>
              <StyledShieldIcon size={48} />

              <ErrorTitle>Something went wrong</ErrorTitle>

              <ErrorDescription>
                Failed to load the page. This might be due to a network issue or
                temporary problem.
              </ErrorDescription>

              <RetryButton variant="solid" onClick={this.handleRetry}>
                Try Again
              </RetryButton>
            </ThemeWrapper>
          </Theme>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
