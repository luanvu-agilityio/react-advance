import { useNavigate } from 'react-router-dom'
import { SlashIcon } from '@radix-ui/react-icons'
import type { CSSProperties } from 'react'
import { useBreadcrumbs, type BreadcrumbItem } from '@hooks/useBreadcrumbs'
import {
  BreadcrumbLink,
  BreadcrumbListItem,
  BreadcrumbsContainer,
  BreadcrumbsList,
  Separator,
} from './Breadcrumb.styles'

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  style?: CSSProperties
}

export const Breadcrumbs = ({ items, className, style }: BreadcrumbsProps) => {
  const navigate = useNavigate()
  const breadcrumbItems = useBreadcrumbs(items)

  const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
    // Don't do anything for the active (last) breadcrumb
    if (index === breadcrumbItems.length - 1) return

    // Navigate to the breadcrumb path
    navigate(item.path)
  }

  return (
    <BreadcrumbsContainer className={className} style={style}>
      <BreadcrumbsList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbListItem key={`${item.path}-${index}`}>
            {index > 0 && (
              <Separator>
                <SlashIcon />
              </Separator>
            )}
            <BreadcrumbLink
              onClick={() => handleBreadcrumbClick(item, index)}
              className={index === breadcrumbItems.length - 1 ? 'active' : ''}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbListItem>
        ))}
      </BreadcrumbsList>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
