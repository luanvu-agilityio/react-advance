import type { CSSProperties } from 'react'
import { StyledImage } from './ImageIcon.style'

export interface ImageIconProps {
  src: string
  alt: string
  size?: number
  className?: string
  onError?: (e: HTMLImageElement) => void
  style?: CSSProperties
}

const ImageIcon = ({
  src,
  alt,
  size = 16,
  className = '',
  onError,
  style,
}: ImageIconProps) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`image-icon ${className}`}
      style={style}
      onError={(e) => {
        if (onError) {
          onError(e.currentTarget)
        } else {
          e.currentTarget.style.display = 'none'
        }
      }}
    />
  )
}
export default ImageIcon
