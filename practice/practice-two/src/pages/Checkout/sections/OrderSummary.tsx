import type { CartItem as CartItemType } from '@contexts/CartContext'
import CartItem from '@components/Cart/CartItem'

import {
  OrderSummaryWrapper,
  OrderSummary,
  OrderSummaryTitle,
  OrderSummarySubtitle,
  CartItemsContainer,
  OrderSummaryRow,
  OrderSummaryTotal,
  PromoForm,
  PromoInput,
  PromoButton,
} from '../CheckoutStyle'
import { useCheckout } from '@contexts/CheckoutContext'

interface OrderSummarySectionProps {
  items: CartItemType[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  promoCode: string
  setPromoCode: (value: string) => void
  handleApplyPromo: () => void
  handleQuantityChange: (id: number, quantity: number) => void
  handleUnitChange: (id: number, buyUnit: string) => void
  handleRemove: (id: number) => void
}

export const OrderSummarySection = ({
  items,
  subtotal,
  tax,
  shipping,
  total,
  promoCode,
  setPromoCode,
  handleApplyPromo,
  handleQuantityChange,
  handleUnitChange,
  handleRemove,
}: OrderSummarySectionProps) => {
  const { orderDetailsRef } = useCheckout()
  return (
    <OrderSummaryWrapper ref={orderDetailsRef}>
      <OrderSummary>
        <div>
          <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
          <OrderSummarySubtitle>
            Price can change depending on shipping method and taxes of your
            state.
          </OrderSummarySubtitle>
        </div>

        <CartItemsContainer>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              Your cart is empty
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.buyUnit}`}
                style={{
                  borderBottom: '1px solid var(--black-shade-6)',
                  paddingBottom: '16px',
                }}
              >
                <CartItem
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onUnitChange={handleUnitChange}
                  onRemove={handleRemove}
                />
              </div>
            ))
          )}
        </CartItemsContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <OrderSummaryRow>
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Tax</span>
              <span>17% {tax.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Shipping</span>
              <span>{shipping.toFixed(2)} USD</span>
            </OrderSummaryRow>
          </div>

          <PromoForm>
            <PromoInput
              type="text"
              placeholder="Apply promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <PromoButton type="button" onClick={handleApplyPromo}>
              Apply now
            </PromoButton>
          </PromoForm>
        </div>

        <OrderSummaryTotal>
          <p style={{ display: 'flex', flexDirection: 'column' }}>
            Total Order
            <span>Guaranteed delivery day: June 12, 2020</span>
          </p>
          <p
            style={{
              fontSize: '22px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--green-color-default)',
            }}
          >
            {total.toFixed(2)} USD
          </p>
        </OrderSummaryTotal>
      </OrderSummary>
    </OrderSummaryWrapper>
  )
}

export default OrderSummarySection
