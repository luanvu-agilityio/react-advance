import styled from 'styled-components'
import { renderStars } from '@helpers/renderStar'
import BuyingUnit from '@components/common/BuyingUnit/BuyingUnit'
import type { CartItem as CartItemType } from '@contexts/CartContext'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: number, quantity: number) => void
  onUnitChange: (id: number, buyUnit: string) => void
  onRemove: (id: number) => void
}

const CartItemContainer = styled.div`
  display: flex;
  gap: 16px;
`

const ItemImage = styled.div`
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

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ItemTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-weight-medium);
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
`

const MetaLabel = styled.span`
  color: var(--black-shade-3);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  width: 70px;
  font-family: var(--font-family-secondary);
`

const MetaValue = styled.span`
  color: var(--black-color-default);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-secondary);
`

const PriceDisplay = styled.div`
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

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ActionButton = styled.button`
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

const CartItem = ({
  item,
  onQuantityChange,
  onUnitChange,
  onRemove,
}: CartItemProps) => {
  return (
    <CartItemContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <ItemImage>
          <img src={item.imageUrl} alt={item.title} />
        </ItemImage>
        <ActionButtons>
          <ActionButton>
            <img
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372436/wishlist_cltlcf.svg"
              alt="Wishlist"
            />
            Wishlist
          </ActionButton>
          <ActionButton>
            <img
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372430/compare_oeiv1m.svg"
              alt="Compare"
            />
            Compare
          </ActionButton>
          <ActionButton onClick={() => onRemove(item.id)}>
            <img
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372432/remove_gbwco0.svg"
              alt="Remove"
            />
            Remove
          </ActionButton>
        </ActionButtons>
      </div>

      <ItemDetails>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <ItemTitle>{item.title}</ItemTitle>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <MetaRow>
              <MetaLabel>Farm:</MetaLabel>
              <MetaValue>{item.farm}</MetaValue>
            </MetaRow>

            <MetaRow>
              <MetaLabel>Freshness:</MetaLabel>
              <MetaValue>{item.freshness}</MetaValue>
            </MetaRow>
          </div>
          {renderStars(item.rating ?? 4)}
        </div>
        <ItemActions>
          <PriceDisplay>
            {item.price.toFixed(2)} USD
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="original-price">
                {item.originalPrice.toFixed(2)} USD
              </span>
            )}
          </PriceDisplay>

          <BuyingUnit
            quantity={item.quantity}
            unit={item.buyUnit}
            onQuantityChange={(value) => onQuantityChange(item.id, value)}
            onUnitChange={(value) => onUnitChange(item.id, value)}
            size="small"
          />
        </ItemActions>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem
