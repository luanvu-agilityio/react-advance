import { useCallback, useMemo, useState } from 'react'
import CartItem from '@components/Cart/CartItem/CartItem'
import { useToast } from '@stores/toastStore'
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
} from '../CheckoutStyle'
import { useCartStore } from '@stores/cartStore'
import { useCheckoutStore } from '@stores/checkoutStore'
import { withErrorBoundary } from '@utils/withErrorBoundary'
import { Button } from '@radix-ui/themes'

export const OrderSummarySection = () => {
  const { items, removeItem, getSubtotal, getTax, updateQuantity, updateUnit } =
    useCartStore()

  const { formData } = useCheckoutStore()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState('')
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

  // Handle promo code application
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) {
      toast({
        title: 'Empty Promo Code',
        description: 'Please enter a promo code',
        variant: 'warning',
        duration: 3000,
      })
      return
    }

    // Mock promo code validation - in a real app, you'd check against valid codes
    if (promoCode.toLowerCase() === 'discount10') {
      toast({
        title: 'Promo Code Applied',
        description: 'Your 10% discount has been applied to the order',
        variant: 'success',
        duration: 4000,
      })
    } else {
      toast({
        title: 'Invalid Promo Code',
        description: 'The promo code you entered is not valid',
        variant: 'error',
        duration: 4000,
      })
    }
  }, [promoCode, toast])

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
      const itemToRemove = items.find((item) => item.id === id)
      if (itemToRemove) {
        removeItem(id)
        toast({
          title: 'Item Removed',
          description: `${itemToRemove.title} has been removed from your cart`,
          variant: 'info',
          duration: 3000,
        })
      }
    },
    [removeItem, items, toast]
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
            <Button variant="soft" onClick={handleApplyPromo}>
              Apply now
            </Button>
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
