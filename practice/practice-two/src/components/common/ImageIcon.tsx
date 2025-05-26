import type { CSSProperties } from 'react'

interface ImageIconProps {
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
  style = {
    objectFit: 'contain',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}: ImageIconProps) => {
  return (
    <img
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
