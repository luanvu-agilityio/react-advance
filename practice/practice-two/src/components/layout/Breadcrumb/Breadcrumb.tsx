import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { SlashIcon } from '@radix-ui/react-icons'
import type { CSSProperties } from 'react'
import { useBreadcrumbs, type BreadcrumbItem } from '@hooks/useBreadcrumbs'

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  style?: CSSProperties
}

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #707070;
  padding: 12px 0;
`

const BreadcrumbsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`

const BreadcrumbListItem = styled.li`
  display: flex;
  align-items: center;
`

const BreadcrumbLink = styled.span`
  color: var(--black-shade-2);
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #333;
    text-decoration: underline;
  }

  &.active {
    color: #333;
    font-weight: 500;
    cursor: default;
  }
`

const Separator = styled.span`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: #c4c4c4;
`

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
