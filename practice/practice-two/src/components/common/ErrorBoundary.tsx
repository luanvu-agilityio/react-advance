import React, { Component, type ReactNode } from 'react'
import styled from 'styled-components'
import { Theme, Button } from '@radix-ui/themes'
import { ShieldAlert } from 'lucide-react'
import Text from './Text'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 16px;
  padding: 2rem;
  text-align: center;
`

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorContainer>
          <Theme>
            <ShieldAlert size={10} />
            <Text
              as="h2"
              text="Something went wrong"
              style={{
                fontSize: '24px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--black-color-default)',
                margin: 0,
              }}
            />
            <Text
              as="p"
              text="Failed to load the page. This might be due to a network issue or temporary problem."
              style={{
                fontSize: '16px',
                color: 'var(--black-shade-2)',
                margin: 0,
                maxWidth: '500px',
              }}
            />
            <Button
              variant="solid"
              onClick={this.handleRetry}
              style={{
                backgroundColor: 'var(--green-color-default)',
                color: 'white',
              }}
            >
              Try Again
            </Button>
          </Theme>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
