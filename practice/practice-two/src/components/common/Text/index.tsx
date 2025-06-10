import type { HTMLAttributes, CSSProperties } from 'react'

interface TextProps extends HTMLAttributes<HTMLElement> {
  text: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  className?: string
  style?: CSSProperties
}

const Text = ({
  text,
  as = 'p',
  className,
  style,
  children,
  ...rest
}: TextProps) => {
  const Element = as

  return (
    <Element className={className} style={style} {...rest}>
      {text ?? children}
    </Element>
  )
}
export default Text
