import type { RefObject } from 'react'
import ThankYouModal from './ThankyouModal'
import { useCheckout } from '@contexts/CheckoutContext'
import type { CartItem as CartItemType } from '@contexts/CartContext'

interface ThankYouModalWrapperProps {
  open: boolean
  onClose: () => void
  orderDetailsRef: RefObject<HTMLDivElement | null>
  paymentMethod: string
  items: CartItemType[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

const ThankYouModalWrapper = ({
  open,
  onClose,
  orderDetailsRef,
  paymentMethod,
  items,
  subtotal,
  tax,
  shipping,
  total,
}: ThankYouModalWrapperProps) => {
  const { billingInfo, shippingMethod } = useCheckout()

  return (
    <ThankYouModal
      open={open}
      onClose={onClose}
      orderDetailsRef={orderDetailsRef}
      customerData={{
        ...billingInfo,
        shippingMethod,
        paymentMethod,
        items: items.map((item) => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        tax,
        shipping,
        total,
      }}
    />
  )
}

export default ThankYouModalWrapper
