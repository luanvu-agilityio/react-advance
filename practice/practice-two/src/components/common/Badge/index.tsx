import type { ReactNode } from 'react'
import { BadgeContainer } from './Badge.style'

export interface BadgeProps {
  children: ReactNode
}

const Badge = ({ children }: BadgeProps) => {
  return <BadgeContainer>{children}</BadgeContainer>
}
export default Badge
