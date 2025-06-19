import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from '@components/common/Link'
import { StyledButton, StyledContainer } from './Tag.style'

type TagVariant = 'default' | 'selected' | 'disabled'
type TagAs = 'button' | 'link'

interface BaseTagProps {
  variant?: TagVariant
  label?: string
  className?: string
  children?: ReactNode
  as?: TagAs
}

interface ButtonTagProps
  extends BaseTagProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as: 'button'
  onClick: () => void
  href?: never
}

interface LinkTagProps extends BaseTagProps {
  as: 'link'
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

type TagProps = ButtonTagProps | LinkTagProps

const Tag = ({
  variant = 'default',
  label = '',
  className,
  children,
  as = 'button',
  ...props
}: TagProps) => {
  const isDisabled = variant === 'disabled'

  // Render either button or link based on 'as' prop
  if (as === 'button') {
    const { onClick } = props as ButtonTagProps
    return (
      <StyledButton
        $variant={variant}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={className}
      >
        {children || label}
      </StyledButton>
    )
  } else {
    // For link variant
    const { href, onClick } = props as LinkTagProps
    return (
      <StyledContainer $variant={variant} className={className}>
        <Link href={href} onClick={onClick} disabled={isDisabled}>
          {children ?? label}
        </Link>
      </StyledContainer>
    )
  }
}

export default Tag
