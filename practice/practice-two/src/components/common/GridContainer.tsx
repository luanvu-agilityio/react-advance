import styled from 'styled-components'
import { type ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  columns?: { mobile?: number; tablet?: number; desktop?: number }
  gap?: string
  className?: string
}

const GridContainer = styled.div<{
  $columns: { mobile?: number; tablet?: number; desktop?: number }
  $gap?: string
}>`
  display: grid;
  gap: ${(props) => props.$gap || '16px'};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      ${(props) => props.$columns.mobile || 1},
      1fr
    );
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(
      ${(props) => props.$columns.tablet || 2},
      1fr
    );
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(
      ${(props) => props.$columns.desktop || 4},
      1fr
    );
  }
`

export const Grid = ({ children, columns, gap, className }: GridProps) => {
  return (
    <GridContainer $columns={columns || {}} $gap={gap} className={className}>
      {children}
    </GridContainer>
  )
}
