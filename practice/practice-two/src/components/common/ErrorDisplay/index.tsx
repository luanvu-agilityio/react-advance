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
    <StyledAlertIcon size={48} />

    <ErrorTitle>{title}</ErrorTitle>

    <ErrorMessage>{error}</ErrorMessage>

    {onRetry && (
      <RetryButton variant="solid" onClick={onRetry}>
        <RefreshIcon size={16} />
        {retryText}
      </RetryButton>
    )}
  </ErrorContainer>
)

export default ErrorDisplay
