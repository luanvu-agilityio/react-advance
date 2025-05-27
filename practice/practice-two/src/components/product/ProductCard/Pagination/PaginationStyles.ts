import styled from 'styled-components'

export const ProductListingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ProductsGrid = styled.div<{ $viewMode: string }>`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;

  @media (min-width: 576px) {
    gap: 24px;
    grid-template-columns: ${(props) =>
      props.$viewMode === 'grid'
        ? 'repeat(auto-fill, minmax(240px, 1fr))'
        : '1fr'};
  }

  @media (min-width: 992px) {
    gap: 32px;
    grid-template-columns: ${(props) =>
      props.$viewMode === 'grid'
        ? 'repeat(auto-fill, minmax(269px, 1fr))'
        : '1fr'};
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 32px;
  }
`

export const PageNumbersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  order: 2;

  @media (min-width: 768px) {
    order: 1;
  }
`

export const PageLabel = styled.span`
  color: var(--black-shade-2);
  font-size: 14px;
`

export const PageButton = styled.button<{ $isActive?: boolean }>`
  color: ${(props) =>
    props.$isActive
      ? 'var(--green-color-default)'
      : 'var(--black-color-default)'};
  background-color: ${(props) =>
    props.$isActive ? 'var(--green-shade-4)' : 'transparent'};
  border: none;
  border-radius: 6px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: ${(props) =>
    props.$isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? 'var(--green-shade-3)' : 'var(--black-shade-6)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Ellipsis = styled.span`
  color: var(--black-shade-2);
  font-size: 12px;
  padding: 0 4px;
`

export const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green-color-default);
  color: var(--white-color);
  border: 2px solid var(--green-shade-1);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  order: 1;
  transition: all 0.2s ease;
  min-width: 160px;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: var(--green-shade-1);

    svg {
      transform: translateY(2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover svg {
      transform: none;
    }
  }

  @media (min-width: 768px) {
    width: auto;
    order: 2;
  }
`

export const ProductCountDisplay = styled.span`
  color: var(--black-shade-2);
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  display: none;

  @media (min-width: 768px) {
    display: block;
    order: 3;
  }
`

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
  min-height: 300px;
`

export const EmptyStateText = styled.p`
  font-size: 16px;
  color: var(--black-shade-2);
  margin: 0;
`
