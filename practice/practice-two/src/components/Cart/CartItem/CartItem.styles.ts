import styled from 'styled-components'

export const CartItemContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const ItemImage = styled.div`
  width: 100px;
  height: 67px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ItemTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-weight-medium);
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
`

export const MetaLabel = styled.span`
  color: var(--black-shade-3);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  width: 70px;
  font-family: var(--font-family-secondary);
`

export const MetaValue = styled.span`
  color: var(--black-color-default);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-secondary);
`

export const PriceDisplay = styled.div`
  font-weight: var(--font-weight-semibold);
  color: var(--green-color-default);
  font-size: 18px;
  display: flex;
  flex-direction: column;

  .original-price {
    text-decoration: line-through;
    color: var(--black-shade-2);
    font-size: 12px;
  }
`

export const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;

  img {
    width: 12px;
    height: 12px;
  }

  &:hover {
    color: var(--black-color-default);
  }
`
