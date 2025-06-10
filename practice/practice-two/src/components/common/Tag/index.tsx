import type { MouseEvent, ReactNode, CSSProperties } from 'react'
import Link from '../Link/index'
import { StyledButtonTag, StyledLinkWrapper } from './Tag.style'

// Base props for all tag variants
type BaseTagProps = {
  label: string
  variant?: 'default' | 'selected' | 'disabled'
  className?: string
  style?: CSSProperties
  children?: ReactNode
  'data-tag-type'?: string
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
        data-tag-type={props['data-tag-type']}
      >
        {props.children ?? label}
      </StyledButtonTag>
    )
  }

  return (
    <StyledLinkWrapper
      $variant={variant}
      className={className}
      data-tag-type={props['data-tag-type']}
    >
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
