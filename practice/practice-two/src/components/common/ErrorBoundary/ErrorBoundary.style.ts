import styled from 'styled-components'
import { Button } from '@radix-ui/themes'
import { ShieldAlert } from 'lucide-react'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 16px;
  padding: 2rem;
  text-align: center;
`

export const ThemeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const StyledShieldIcon = styled(ShieldAlert)`
  color: var(--orange-color-default);
  margin-bottom: 8px;
`

export const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;
  text-align: center;
`

export const ErrorDescription = styled.p`
  font-size: 16px;
  color: var(--black-shade-2);
  margin: 0;
  max-width: 500px;
  text-align: center;
  line-height: 1.5;
`

export const RetryButton = styled(Button)`
  background-color: var(--green-color-default);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);

  &:hover {
    background-color: var(--green-shade-1);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--green-shade-2);
    outline: none;
  }

  &:active {
    transform: translateY(0);
  }
`
