import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;
`

export const ViewMoreLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--black-color-default);
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  text-decoration: none;

  &:hover {
    color: var(--green-color-default);
  }
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`
