import type { ReactNode, MouseEvent, CSSProperties } from 'react'
import styled from 'styled-components'

interface LinkProps {
  href: string
  children: ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
  className?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
  style?: CSSProperties
}

const StyledLink = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  color: var(--green-color-default);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    text-decoration: ${({ disabled }) => (disabled ? 'none' : 'underline')};
  }
`

const Link = ({
  href = '#',
  children,
  onClick,
  className,
  target = '_self',
  disabled = false,
  style,
}: LinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    onClick(event)
  }

  return (
    <StyledLink
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      disabled={disabled}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={style}
    >
      {children}
    </StyledLink>
  )
}

export default Link
