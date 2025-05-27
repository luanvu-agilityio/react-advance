import styled from 'styled-components'
import { Theme, Button } from '@radix-ui/themes'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Text from './Text'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--red-1);
  border: 1px solid var(--red-4);
  border-radius: 12px;
  margin-top: 24px;
`

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <ErrorContainer>
    <Theme>
      <AlertTriangle
        size={48}
        color="var(--red-9)"
        style={{ marginBottom: '16px' }}
      />
      <Text
        as="h3"
        text="Failed to Load Products"
        style={{
          fontSize: '20px',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--red-11)',
          margin: '0 0 8px 0',
        }}
      />
      <Text
        as="p"
        text={error}
        style={{
          fontSize: '16px',
          color: 'var(--red-10)',
          margin: '0 0 16px 0',
          maxWidth: '500px',
        }}
      />
      {onRetry && (
        <Button
          variant="solid"
          onClick={onRetry}
          style={{
            backgroundColor: 'var(--red-9)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </Theme>
  </ErrorContainer>
)

export default ErrorDisplay
