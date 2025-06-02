import { Spinner, Theme } from '@radix-ui/themes'
import styled from 'styled-components'
import Text from './Text'

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 16px;
  padding: 2rem;
`

export const LoadingSpinner = () => (
  <LoadingContainer>
    <Theme>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner size="3" />
        <Text as="p" text="Loading product details..." />
      </div>
    </Theme>
  </LoadingContainer>
)
