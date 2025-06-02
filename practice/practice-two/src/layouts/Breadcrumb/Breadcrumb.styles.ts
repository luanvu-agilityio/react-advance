import styled from 'styled-components'

export const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #707070;
  padding: 12px 0;
`

export const BreadcrumbsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const BreadcrumbListItem = styled.li`
  display: flex;
  align-items: center;
`

export const BreadcrumbLink = styled.span`
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

export const Separator = styled.span`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: #c4c4c4;
`
