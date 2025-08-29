'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import {
  IconContainer,
  StyledInput,
  TextFieldContainer,
} from './TextField.style'

export type IconPosition = 'left' | 'right'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: ReactNode
  iconPosition?: IconPosition
  variant?: 'default' | 'search'
}

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
