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

export const ProductCountDisplay = styled.span`
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  display: none;

  @media (min-width: 768px) {
    display: block;
    order: 3;
  }

  span:first-child {
    font-family: var(--font-family-primary);
    background-color: var(--green-shade-4);
    color: var(--green-shade-1);
    border-radius: 12px;
    font-size: 12px;
    font-weight: var(--font-weight-semibold);
    padding: 0 8px;
    text-align: center;
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

// Filter components styles

export const FilterControlContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 9px 16px;
  gap: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`

export const FilterLabel = styled.span`
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`

export const FilterCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: var(--green-color-default);
  cursor: pointer;
  margin: 0;
`

export const FilterRadio = styled.input.attrs({ type: 'radio' })`
  width: 18px;
  height: 18px;
  accent-color: var(--green-color-default);
  cursor: pointer;
  margin: 0;
`

export const FilterControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`

export const FilterValue = styled.span<{ $isActive?: boolean }>`
  background-color: ${(props) =>
    props.$isActive ? 'var(--green-shade-4)' : 'transparent'};
  color: ${(props) =>
    props.$isActive ? 'var(--green-color-default)' : 'inherit'};
  padding: 0 8px;
  border-radius: 4px;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  font-size: 14px;
  display: flex;
  align-items: center;
`

export const CheckmarkIcon = styled.span`
  color: var(--green-color-default);
  font-weight: bold;
  margin-right: 4px;
`

export const SelectedCount = styled.span`
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
  font-weight: 600;
  padding: 0 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
`
