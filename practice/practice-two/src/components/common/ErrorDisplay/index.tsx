import { Theme } from '@radix-ui/themes'
import {
  ErrorContainer,
  StyledAlertIcon,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  RefreshIcon,
} from './ErrorDisplay.style'

export interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  title?: string
  retryText?: string
}

const ErrorDisplay = ({
  error,
  onRetry,
  title = 'Failed to Load Products',
  retryText = 'Try Again',
}: ErrorDisplayProps) => (
  <ErrorContainer>
    <Theme
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledAlertIcon size={48} />

      <ErrorTitle>{title}</ErrorTitle>

      <ErrorMessage>{error}</ErrorMessage>

      {onRetry && (
        <RetryButton variant="solid" onClick={onRetry}>
          <RefreshIcon size={16} />
          {retryText}
        </RetryButton>
      )}
    </Theme>
  </ErrorContainer>
)

export default ErrorDisplay
