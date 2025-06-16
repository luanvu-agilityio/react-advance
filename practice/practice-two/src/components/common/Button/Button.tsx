import { Button as RadixButton } from '@radix-ui/themes'
import { forwardRef } from 'react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
}

// Maps our size values to the data-size attribute values in your CSS
const mapSizeToRadixSize = (size: ButtonSize): '1' | '2' | '3' | '4' => {
  switch (size) {
    case 'small':
      return '1'
    case 'medium':
      return '2'
    case 'large':
      return '3'
    case 'xlarge':
      return '4'
    default:
      return '2'
  }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'right',
    className = '',
  }) => {
    // Convert our size to the size that matches your CSS
    const radixSize = mapSizeToRadixSize(size)

    return (
      <RadixButton
        data-variant={variant}
        size={radixSize}
        className={`custom-button ${className}`}
      >
        {icon && iconPosition === 'left' && (
          <span style={{ marginRight: '8px', display: 'inline-flex' }}>
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span style={{ marginLeft: '8px', display: 'inline-flex' }}>
            {icon}
          </span>
        )}
      </RadixButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
