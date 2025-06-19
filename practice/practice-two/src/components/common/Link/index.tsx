import type { CSSProperties } from 'styled-components'
import { StyledLink, StyledRouterLink } from './Link.style'
import type { MouseEvent } from 'react'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  style?: CSSProperties
  disabled?: boolean
}

const Link = ({
  href,
  children,
  className,
  onClick,
  style,
  disabled = false,
}: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    // Only call onClick if not disabled
    onClick?.(e)
  }
  // If it starts with '/' or is a relative path, use RouterLink
  if (href.startsWith('/') || !href.includes('://')) {
    return (
      <StyledRouterLink
        to={href}
        className={className}
        onClick={handleClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </StyledRouterLink>
    )
  }

  // Otherwise, it's an external link, use regular anchor
  return (
    <StyledLink
      href={href}
      className={className}
      onClick={handleClick}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
      disabled={disabled}
    >
      {children}
    </StyledLink>
  )
}

export default Link
