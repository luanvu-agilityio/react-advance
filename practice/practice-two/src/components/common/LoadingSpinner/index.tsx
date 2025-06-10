<<<<<<< HEAD
import { Spinner } from '@radix-ui/themes'
=======
import { Spinner, Theme } from '@radix-ui/themes'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
    <SpinnerWrapper>
      <Spinner size={size} />
      <Text as="p" text={message} />
    </SpinnerWrapper>
=======
    <Theme>
      <SpinnerWrapper>
        <Spinner size={size} />
        <Text as="p" text={message} />
      </SpinnerWrapper>
    </Theme>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  </LoadingContainer>
)
