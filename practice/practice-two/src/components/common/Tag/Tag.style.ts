import styled, { css } from 'styled-components'

type TagVariant = 'default' | 'selected' | 'disabled'

interface StyleProps {
  $variant: TagVariant
}

const tagVariantStyles = {
  default: css`
    background-color: var(--gray-shade-1, #f3f3f3);
    color: var(--black-shade-1, #1a1a1a);

    &:hover {
      background-color: var(--gray-shade-2, #e6e6e6);
    }
  `,
  selected: css`
    background-color: var(--green-color-default, #6a983c);
    color: var(--white-color, #ffffff);
  `,
  disabled: css`
    background-color: var(--gray-shade-1, #f3f3f3);
    color: var(--black-shade-3, #999999);
    cursor: not-allowed;
    pointer-events: none;
  `,
}

export const StyledButton = styled.button<StyleProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  font-family: var(--font-family-primary, 'Open Sans', sans-serif);
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${({ $variant }) => tagVariantStyles[$variant]};
`

export const StyledContainer = styled.div<StyleProps>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-family: var(--font-family-primary, 'Open Sans', sans-serif);
  font-size: 0.875rem;
  line-height: 1.25rem;

  ${({ $variant }) => tagVariantStyles[$variant]};

  a {
    color: inherit;
    text-decoration: none;
  }
`
