import type { ReactNode } from 'react'
import styled from 'styled-components'

interface BadgeProps {
  children: ReactNode
}

const Badge = styled.span`
  display: inline-block;
  padding: 2.5px 7.5px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  border-radius: 12px;
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
`
export const BadgeComponent = ({ children }: BadgeProps) => {
  return <Badge>{children}</Badge>
}
