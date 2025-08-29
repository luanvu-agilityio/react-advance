'use client'

import { renderStars } from '@helpers/renderStar'
import BuyingUnit from '@components/common/BuyingUnit/BuyingUnit'
import type { CartItem as CartItemType } from 'types/cart-items'
import {
  ActionButton,
  ActionButtons,
  CartItemContainer,
  ItemActions,
  ItemDetails,
  ItemImage,
  ItemTitle,
  MetaLabel,
  MetaRow,
  MetaValue,
  PriceDisplay,
} from './CartItem.styles'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: number, quantity: number) => void
  onUnitChange: (id: number, buyUnit: string) => void
  onRemove: (id: number) => void
}

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
          {renderStars(item.rating ?? 0)}
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
