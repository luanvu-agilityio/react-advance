import { Spinner, Theme } from '@radix-ui/themes'
import Text from '../Text'
import { LoadingContainer, SpinnerWrapper } from './LoadingSpinner.style'

export interface LoadingSpinnerProps {
  message?: string
  size?: '1' | '2' | '3'
  minHeight?: string | number
}

export const LoadingSpinner = ({
  message = 'Loading product details...',
  size = '3',
  minHeight = '400px',
}: LoadingSpinnerProps) => (
  <LoadingContainer style={{ minHeight }}>
    <Theme>
      <SpinnerWrapper>
        <Spinner size={size} />
        <Text as="p" text={message} />
      </SpinnerWrapper>
    </Theme>
  </LoadingContainer>
)
