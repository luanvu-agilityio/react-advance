import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

interface StyledLinkProps {
  disabled?: boolean
}

export const StyledLink = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  color: var(--green-color-default);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    text-decoration: ${({ disabled }) => (disabled ? 'none' : 'underline')};
  }
`
export const StyledRouterLink = styled(RouterLink)<StyledLinkProps>`
  color: var(--green-color-default);
  text-decoration: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--green-shade-1);
  }
`
