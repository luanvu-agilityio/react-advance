import { type ReactNode } from 'react'
import { Container } from './ContentContainer.styles'

interface ContentContainerProps {
  children: ReactNode
  maxWidth?: string
  padding?: string
  className?: string
  direction?: 'row' | 'column'
  gap?: string
  alignItems?: string
  justifyContent?: string
}

const ContentContainer = ({
  children,
  maxWidth,
  padding,
  className,
  direction,
  gap,
  alignItems,
  justifyContent,
}: ContentContainerProps) => {
  return (
    <Container
      $maxWidth={maxWidth}
      $padding={padding}
      $direction={direction}
      $gap={gap}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      className={className}
    >
      {children}
    </Container>
  )
}

export default ContentContainer
