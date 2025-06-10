import styled from 'styled-components'

export const Card = styled.div<{ $variant?: 'grid' | 'list' }>`
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 269px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  cursor: pointer;

  @media (min-width: 901px) {
    flex-direction: ${(props) =>
      props.$variant === 'list' ? 'row' : 'column'};
    padding: ${(props) => (props.$variant === 'list' ? '0' : '16px')};
    gap: ${(props) => (props.$variant === 'list' ? '24px' : '0')};
    max-width: ${(props) => (props.$variant === 'list' ? '100%' : '269px')};
  }
`

export const CardImage = styled.div<{ $variant?: 'grid' | 'list' }>`
  width: ${(props) => (props.$variant === 'list' ? '268px' : '100%')};
  height: ${(props) => (props.$variant === 'list' ? 'auto' : '180px')};
  position: relative;
  background-color: #f8f8f8;
  border-radius: ${(props) =>
    props.$variant === 'list' ? '12px 0 0 12px' : '12px'};
  margin-bottom: ${(props) => (props.$variant === 'list' ? '0' : '16px')};
  flex-shrink: 0;
`

export const DiscountBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--green-shade-4);
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--green-color-default);
`

export const CardContent = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  ${(props) =>
    props.$variant === 'list'
      ? `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 0 ;
  `
      : ''}
`

export const ProductTitle = styled.h3<{ $variant?: 'grid' | 'list' }>`
  margin: 0;
  font-size: ${(props) => (props.$variant === 'list' ? '22px' : '15px')};
  font-weight: var(--font-weight-medium);
  color: var(--black-color-default);
  margin-bottom: ${(props) => (props.$variant === 'list' ? '8px' : '0')};
`

export const ProductDescription = styled.p`
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-1);
  margin-bottom: 8px;
`

export const RatingContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
`

export const PriceContainer = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  ${(props) =>
    props.$variant === 'list'
      ? `
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 32px;
    `
      : `
  
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    `}
`

export const Price = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.$variant === 'list' ? 'align-items: flex-start;' : '')}
  margin-bottom: ${(props) => (props.$variant === 'list' ? '12px' : '0')};
`

export const CurrentPrice = styled.span<{ $variant?: 'grid' | 'list' }>`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: #111827;
`

export const OriginalPrice = styled.span<{ $variant?: 'grid' | 'list' }>`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-shade-2);
  text-decoration: line-through;
  text-align: ${(props) => (props.$variant === 'list' ? 'right' : 'left')};
`

export const ProductInfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
`

export const InfoLabel = styled.span`
  color: var(--black-shade-1);
  font-size: 14px;
`

export const InfoValue = styled.span<{ $highlight?: boolean }>`
  font-size: 14px;
  color: ${(props) =>
    props.$highlight ? '#65a30d' : 'var(--black-color-default)'};
  font-weight: ${(props) =>
    props.$highlight
      ? 'var(--font-weight-medium)'
      : 'var(--font-weight-regular)'};
`

export const ButtonsContainer = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${(props) => (props.$variant === 'list' ? 'align-items: flex-end;' : '')}
`
export const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
`

export const FreeShippingText = styled.span`
  font-size: 12px;
  color: var(--black-shade-2);
`

export const DeliveryTimeText = styled.span`
  font-size: 12px;
  color: var(--black-shade-2);
`
export const commonButtonStyles = {
  backgroundColor: 'var(--green-color-default)',
  color: 'var(--white-color)',
  fontSize: '15px',
  fontWeight: 'var(--font-weight-bold)',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '2px solid var(--green-shade-1)',
  cursor: 'pointer',
}
