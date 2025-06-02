import { useCallback, useMemo } from 'react'
import CartItem from '@components/Cart/CartItem/CartItem'
import { useCart } from '@contexts/CartContext'
import { useCheckout } from '@contexts/CheckoutContext'

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

export const OrderSummarySection = () => {
  const { items, updateQuantity, updateUnit, removeFromCart } = useCart()
  const { formData, promoCode, setPromoCode, orderDetailsRef } = useCheckout()

  // Calculate order totals
  const orderCalculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity
    }, 0)

    // Calculate tax (17%)
    const tax = subtotal * 0.17

    // Get shipping cost from form data
    const shipping = formData.shipping.price || 0

    const total = subtotal + tax + shipping

    return {
      subtotal,
      tax,
      shipping,
      total,
    }
  }, [items, formData.shipping.price])

  // Handle promo code application
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) return
    // Promo code logic here
    console.log('Apply promo code:', promoCode)
  }, [promoCode])

  // Handle quantity changes
  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        updateQuantity(id, quantity)
      }
    },
    [updateQuantity, removeFromCart]
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
      removeFromCart(id)
    },
    [removeFromCart]
  )

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
              <span>{orderCalculations.subtotal.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Tax</span>
              <span>17% {orderCalculations.tax.toFixed(2)} USD</span>
            </OrderSummaryRow>

            <OrderSummaryRow>
              <span>Shipping</span>
              <span>{orderCalculations.shipping.toFixed(2)} USD</span>
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

export default OrderSummarySection
