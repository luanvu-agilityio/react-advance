import { Button } from '@radix-ui/themes'
import styled from 'styled-components'

// Styled Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.6rem 1.5rem;
  }
`

export const ProductOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 992px) {
    flex-direction: row;
    gap: 32px;
  }
`

export const ImageContainer = styled.div`
  width: 569px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const DiscountBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
`

export const ShippingBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 80px;
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
`
export const ProductImageContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;

  @media (min-width: 992px) {
    height: 436px;
    margin-bottom: 1rem;
  }
`

export const ProductImage = styled.div`
  height: 100%;
  width: 100%;

  img {
    border-radius: 12px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

export const ProductDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 992px) {
    gap: 40px;
  }
`

export const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
  margin-top: 0;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ReviewCount = styled.span`
  color: var(--black-shade-2);
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
`

export const ProductDescription = styled.p`
  color: var(--black-color-default);
  font-family: var(--font-family-secondary);
  font-size: 15px;
  font-weight: var(--font-weight-regular);
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`

export const ProductInfoTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

export const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: baseline;
`

export const InfoLabel = styled.div`
  color: var(--black-shade-2);
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  min-width: 100px;
`

export const InfoValue = styled.div<{ $inStock?: boolean }>`
  color: ${(props) =>
    props.$inStock
      ? 'var(--green-color-default)'
      : 'var(--black-color-default)'};
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
`

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--black-shade-5);
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 534px;
  }
`

export const PriceInfo = styled.div``

export const CurrentPrice = styled.div`
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
  color: var(--green-color-default);
`

export const OriginalPrice = styled.div`
  font-size: 12px;
  color: var(--black-shade-2);
  font-weight: var(--font-weight-semibold);
  text-decoration: line-through;
`

export const AddToCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
    width: auto;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  width: 100%;

  @media (min-width: 576px) {
    width: auto;
    font-size: 15px;
    justify-content: flex-start;
  }

  &:hover {
    color: var(--green-color-default);
  }
`

export const BuyButton = styled(Button)`
  width: 100%;

  @media (min-width: 576px) {
    width: auto;
  }
`
