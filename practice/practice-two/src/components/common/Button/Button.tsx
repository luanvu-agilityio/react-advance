'use client'

import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Button } from '@radix-ui/themes'
// Button variant types
type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'
type ButtonSize = '1' | '2' | '3'

// Button props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  onClick: () => void
}

// Button component
const BaseButton = ({
  variant = 'solid',
  size = '2',
  children,
  onClick,
}: ButtonProps) => {
  return (
    <Button variant={variant} size={size} onClick={onClick}>
      {children}
    </Button>
  )
}

export default BaseButton
export type { ButtonProps, ButtonVariant, ButtonSize }
