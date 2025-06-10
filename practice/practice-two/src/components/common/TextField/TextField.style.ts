import styled from 'styled-components'
import type { IconPosition } from './index'

export const TextFieldContainer = styled.div<{
  $variant?: 'default' | 'search'
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.$variant === 'search' ? 'transparent' : 'var(--black-shade-4)'};
  padding: 10px 16px;
  border-radius: 12px;
`

export const StyledInput = styled.input<{
  $hasLeftIcon?: boolean
  $hasRightIcon?: boolean
}>`
  width: 100%;
  height: 100%;
  padding-left: ${(props) => (props.$hasLeftIcon ? '2.5rem' : '0')};
  padding-right: ${(props) => (props.$hasRightIcon ? '2.5rem' : '0')};
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family-secondary);
  background-color: transparent;
  border: none;
  color: var(--black-color-default);

  &::placeholder {
    color: var(--black-shade-2);
  }

  &:focus {
    outline: none;
  }
`

export const IconContainer = styled.div<{
  $position: IconPosition
}>`
  position: absolute;
  ${(props) => (props.$position === 'left' ? 'left: 0.75rem;' : 'right: 0;')}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  color: #000;
`
