<<<<<<< HEAD
=======
import { Theme } from '@radix-ui/themes'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
    <StyledAlertIcon size={48} />

    <ErrorTitle>{title}</ErrorTitle>

    <ErrorMessage>{error}</ErrorMessage>

    {onRetry && (
      <RetryButton variant="solid" onClick={onRetry}>
        <RefreshIcon size={16} />
        {retryText}
      </RetryButton>
    )}
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  </ErrorContainer>
)

export default ErrorDisplay
