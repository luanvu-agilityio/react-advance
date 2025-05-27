import type { MouseEvent, ReactNode, CSSProperties } from 'react'
import styled from 'styled-components'
import Link from './Link'

// Base props for all tag variants
type BaseTagProps = {
  label: string
  variant?: 'default' | 'selected' | 'disabled'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

// Props specific to button variant
type ButtonTagProps = BaseTagProps & {
  as: 'button'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

// Props specific to link variant
type LinkTagProps = BaseTagProps & {
  as: 'link'
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
}

export type TagProps = ButtonTagProps | LinkTagProps

const StyledButtonTag = styled.button<{
  $variant?: 'default' | 'selected' | 'disabled'
}>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  transition: all 0.2s ease;
  border: none;
  cursor: ${({ $variant }) =>
    $variant === 'disabled' ? 'not-allowed' : 'pointer'};

  /* Variant styles */
  ${({ $variant }) => {
    switch ($variant) {
      case 'selected':
        return `
            background-color:var(--cyan-shade-4);
            color: var(--cyan-shade-1);
            box-shadow: 0 0 0 2px #a8c7fa;
            &:hover {
              background-color:var(--cyan-shade-3);
              text-decoration: none;
          }
        `
      case 'disabled':
        return `
          background-color: var(--black-shade-6);
          color:var(--black-shade-3);
          opacity: 0.7;
        `
      default:
        return `
          background-color: var(--black-shade-6);
          color: var(--black-color-default);
          &:hover {
            background-color: var(--black-shade-5);
          }
        `
    }
  }}
`

const StyledLinkWrapper = styled.span<{
  $variant?: 'default' | 'selected' | 'disabled'
}>`
  display: inline-block;

  /* Reset Link styles when used in a tag */
  a {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
    text-decoration: none;

    /* Variant styles */
    ${({ $variant }) => {
      switch ($variant) {
        case 'selected':
          return `
            background-color: var(--green-shade-3);
            color:var(--green-shade-1);
            box-shadow: 0 0 0 2px #a8c7fa;
            &:hover {
              background-color:var(--green-shade-2);
              text-decoration: none;
            }
          `
        case 'disabled':
          return `
         background-color: var(--black-shade-6);
          color:var(--black-shade-3);
          opacity: 0.7;
          `
        default:
          return `
            background-color: var(--black-shade-5);
            &:hover {
              background-color: var(--black-shade-6);
              text-decoration: none;
            }
          `
      }
    }}
  }
`

export const Tag = (props: TagProps) => {
  const { label, variant = 'default', className = '', style } = props

  // For button variant
  if (props.as === 'button') {
    return (
      <StyledButtonTag
        type="button"
        className={className}
        $variant={variant}
        onClick={props.onClick}
        disabled={props.disabled ?? variant === 'disabled'}
        style={style}
      >
        {props.children ?? label}
      </StyledButtonTag>
    )
  }

  return (
    <StyledLinkWrapper $variant={variant} className={className}>
      <Link
        href={props.href}
        onClick={props.onClick}
        target={props.target ?? '_self'}
        disabled={variant === 'disabled'}
        style={style}
      >
        {props.children ?? label}
      </Link>
    </StyledLinkWrapper>
  )
}

export default Tag
