import type { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

export type IconPosition = 'left' | 'right'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: ReactNode
  iconPosition?: IconPosition
  variant?: 'default' | 'search'
}

const TextFieldContainer = styled.div<{
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

const StyledInput = styled.input<{
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

const IconContainer = styled.div<{
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

const TextField = ({
  icon,
  iconPosition = 'right',
  variant = 'default',
  ...inputProps
}: TextFieldProps) => {
  return (
    <TextFieldContainer $variant={variant}>
      {icon && iconPosition === 'left' && (
        <IconContainer $position="left">{icon}</IconContainer>
      )}
      <StyledInput
        $hasLeftIcon={icon !== undefined && iconPosition === 'left'}
        $hasRightIcon={icon !== undefined && iconPosition === 'right'}
        {...inputProps}
      />
      {icon && iconPosition === 'right' && (
        <IconContainer $position="right">{icon}</IconContainer>
      )}
    </TextFieldContainer>
  )
}

export default TextField
