import styled from 'styled-components'
import { Button } from '@radix-ui/themes'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export const ErrorContainer = styled.div`
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

export const StyledAlertIcon = styled(AlertTriangle)`
  margin-bottom: 16px;
  color: var(--coral-shade-1);
`

export const ErrorTitle = styled.h3`
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0 0 8px 0;
`

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: var(--black-color-default);
  margin: 0 0 16px 0;
  max-width: 500px;
`

export const RetryButton = styled(Button)`
  background-color: var(--coral-color-default);
  color: white;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--coral-shade-2);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--coral-shade-1);
  }
`

export const RefreshIcon = styled(RefreshCw)`
  color: inherit;
`
