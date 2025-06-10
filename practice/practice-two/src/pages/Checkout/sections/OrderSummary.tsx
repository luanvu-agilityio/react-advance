<<<<<<< HEAD
import { useCallback, useMemo, useState } from 'react'
import CartItem from '@components/Cart/CartItem/CartItem'
=======
import { useCallback, useMemo } from 'react'
import CartItem from '@components/Cart/CartItem/CartItem'
import { useCart } from '@contexts/CartContext'
import { useCheckout } from '@contexts/CheckoutContext'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

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
<<<<<<< HEAD
import { useCartStore } from '@stores/cartStore'
import { useCheckoutStore } from '@stores/checkoutStore'
import { withErrorBoundary } from '@utils/withErrorBoundary'

export const OrderSummarySection = () => {
  const {
    items,
    removeItem,
    getSubtotal,
    getTax,

    updateQuantity,
    updateUnit,
  } = useCartStore()

  const { formData } = useCheckoutStore()

  // Calculate order totals
  const orderCalculations = useMemo(() => {
    const shipping = formData.shipping.price
    const subtotal = getSubtotal()
    const tax = getTax()
=======

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

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    const total = subtotal + tax + shipping

    return {
      subtotal,
      tax,
      shipping,
      total,
    }
<<<<<<< HEAD
  }, [formData.shipping.price, items, getSubtotal, getTax])

  const [promoCode, setPromoCode] = useState('')
=======
  }, [items, formData.shipping.price])
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

  // Handle promo code application
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) return
<<<<<<< HEAD
=======
    // Promo code logic here
    console.log('Apply promo code:', promoCode)
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  }, [promoCode])

  // Handle quantity changes
  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
<<<<<<< HEAD
        removeItem(id)
=======
        removeFromCart(id)
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      } else {
        updateQuantity(id, quantity)
      }
    },
<<<<<<< HEAD
    [updateQuantity, removeItem]
=======
    [updateQuantity, removeFromCart]
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
      removeItem(id)
    },
    [removeItem]
  )

  const isEmpty = items.length === 0
=======
      removeFromCart(id)
    },
    [removeFromCart]
  )
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

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
<<<<<<< HEAD
              <span>
                {isEmpty ? '0.00' : orderCalculations.shipping.toFixed(2)} USD
              </span>
=======
              <span>{orderCalculations.shipping.toFixed(2)} USD</span>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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

<<<<<<< HEAD
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
=======
export default OrderSummarySection
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
