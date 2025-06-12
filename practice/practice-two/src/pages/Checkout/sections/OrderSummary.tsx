import { useCallback, useMemo, useState } from 'react'
import CartItem from '@components/Cart/CartItem/CartItem'

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
import { useCartStore } from '@stores/cartStore'
import { useCheckoutStore } from '@stores/checkoutStore'
import { withErrorBoundary } from '@utils/withErrorBoundary'

export const OrderSummarySection = () => {
  const { items, removeItem, getSubtotal, getTax, updateQuantity, updateUnit } =
    useCartStore()

  const { formData } = useCheckoutStore()

  // Calculate order totals
  const orderCalculations = useMemo(() => {
    const shipping = formData.shipping.price
    const subtotal = getSubtotal()
    const tax = getTax()
    const total = subtotal + tax + shipping

    return {
      subtotal,
      tax,
      shipping,
      total,
    }
  }, [formData.shipping.price, items, getSubtotal, getTax])

  const [promoCode, setPromoCode] = useState('')

  // Handle promo code application
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) return
  }, [promoCode])

  // Handle quantity changes
  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        updateQuantity(id, quantity)
      }
    },
    [updateQuantity, removeItem]
  )

  // Handle unit changes
  const handleUnitChange = useCallback(
    (id: number, buyUnit: string) => {
      updateUnit(id, buyUnit)
    },
    [updateUnit]
  )

  // Handle item removal
  const handleRemove = useCallback(
    (id: number) => {
      removeItem(id)
    },
    [removeItem]
  )

  const isEmpty = items.length === 0

  return (
    <OrderSummaryWrapper>
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
              <span>{orderCalculations.subtotal.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Tax</span>
              <span>17% {orderCalculations.tax.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Shipping</span>
              <span>
                {isEmpty ? '0.00' : orderCalculations.shipping.toFixed(2)} USD
              </span>
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
            {orderCalculations.total.toFixed(2)} USD
          </p>
        </OrderSummaryTotal>
      </OrderSummary>
    </OrderSummaryWrapper>
  )
}

OrderSummarySection.displayName = 'OrderSummarySection'

const OrderSummaryWithErrorBoundary = withErrorBoundary(OrderSummarySection, {
  fallback: (
    <div className="order-summary-error">
      <h3>Unable to display order summary</h3>
      <p>Your checkout can still be completed.</p>
    </div>
  ),
  onError: (error) => console.error('Order Summary Error:', error),
})

export default OrderSummaryWithErrorBoundary
