import styled from 'styled-components'
import { type ReactNode } from 'react'

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

const Container = styled.div<{
  $maxWidth?: string
  $padding?: string
  $direction?: string
  $gap?: string
  $alignItems?: string
  $justifyContent?: string
}>`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: ${(props) => props.$direction ?? 'row'};
  gap: ${(props) => props.$gap ?? '0'};
  align-items: ${(props) => props.$alignItems ?? 'stretch'};
  justify-content: ${(props) => props.$justifyContent ?? 'flex-start'};

  @media (max-width: 768px) {
    flex-direction: ${(props) =>
      props.$direction === 'row' ? 'column' : props.$direction};
    padding: ${(props) => props.$padding ?? '0 16px'};
    gap: ${(props) => (props.$gap ? `calc(${props.$gap} * 0.75)` : '0')};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${(props) => props.$padding ?? '0 24px'};
  }

  @media (min-width: 1260px) {
    padding: 0;
  }

  @media (min-width: 1460px) {
    width: 90%;
    max-width: 1460px;
  }
`

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
