import styled from 'styled-components'

export const StyledLink = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  color: var(--green-color-default);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    text-decoration: ${({ disabled }) => (disabled ? 'none' : 'underline')};
  }
`
