<<<<<<< HEAD
import { useState, useMemo, type RefObject } from 'react'
import { useOrderExport } from '@hooks/useOrderExport'
import { useCheckoutStore } from '@stores/checkoutStore'
import { useCartStore } from '@stores/cartStore'
import { useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import {
  ButtonsContainer,
  PrimaryButton,
  SecondaryButton,
  StyledDescription,
  StyledDialog,
  StyledOverlay,
  StyledTitle,
  CloseButton,
} from '../CheckoutStyle'
import { withErrorBoundary } from '@utils/withErrorBoundary'
=======
import { useMemo, type RefObject } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import { useOrderExport } from '@hooks/useOrderExport'
import { useCheckout } from '@contexts/CheckoutContext'
import { useCart } from '@contexts/CartContext'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

// Styled components using Radix UI

interface ThankYouModalProps {
  open: boolean
  onClose: () => void
  orderDetailsRef: RefObject<HTMLDivElement | null>
}

const ThankYouModal = ({
  open,
  onClose,
  orderDetailsRef,
}: ThankYouModalProps) => {
<<<<<<< HEAD
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { formData, resetForm } = useCheckoutStore()
  const { items, clearCart, getSubtotal, getTax } = useCartStore()
  const navigate = useNavigate()

  // Calculate order totals accurately using store functions
  const orderCalculations = useMemo(() => {
    const subtotal = getSubtotal()
    const tax = getTax()
=======
  // Get all data from contexts - no props needed!
  const { formData, resetForm } = useCheckout()
  const { items, clearCart } = useCart()

  // Calculate order totals (same logic as OrderSummary)
  const orderCalculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity
    }, 0)

    const tax = subtotal * 0.17
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    const shipping = formData.shipping.price || 0
    const total = subtotal + tax + shipping

    return { subtotal, tax, shipping, total }
<<<<<<< HEAD
  }, [items, formData.shipping.price, getSubtotal, getTax])

  // Prepare complete customer data for export
  const customerData = useMemo(
    () => ({
      // Billing information
=======
  }, [items, formData.shipping.price])

  // Prepare customer data for export
  const customerData = useMemo(
    () => ({
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      firstName: formData.billing.firstName,
      lastName: formData.billing.lastName,
      email: formData.billing.email,
      phone: formData.billing.phone,
      address: formData.billing.address,
      city: formData.billing.city,
      country: formData.billing.country,
      zip: formData.billing.zip,

      // Shipping and payment info
<<<<<<< HEAD
      shipping: formData.shipping.price,
      shippingMethod: formData.shipping.method,
      paymentMethod: formData.payment.method,

      // Items with accurate calculations
=======
      shippingMethod: formData.shipping.method,
      paymentMethod: formData.payment.method,

      // Items and calculations
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      items: items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        unit: item.buyUnit,
        total: Number(item.price) * item.quantity,
      })),
<<<<<<< HEAD

      // Order totals
      subtotal: orderCalculations.subtotal,
      tax: orderCalculations.tax,
      shippingCost: orderCalculations.shipping,
      total: orderCalculations.total,
=======
      ...orderCalculations,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    }),
    [formData, items, orderCalculations]
  )

<<<<<<< HEAD
  // Get export functions
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  const { handlePrint, handleDownloadExcel, handleDownloadText } =
    useOrderExport({
      orderDetailsRef,
      customerData,
    })

<<<<<<< HEAD
  // Custom handlers that mark export as completed
  // Custom handlers for export actions
  const handleExportPrint = () => {
    handlePrint()
  }

  const handleExportExcel = () => {
    handleDownloadExcel()
  }

  const handleExportText = () => {
    handleDownloadText()
  }
  // Close modal and only clear data if exports are complete or user is done
  const handleModalClose = () => {
    setIsRedirecting(true)

    // Clean up the data
    setTimeout(() => {
      clearCart()
      resetForm()
      onClose()

      // Navigate home after another delay
      setTimeout(() => {
        navigate('/')
      }, 2500)
    }, 1000)
  }

  if (isRedirecting) {
    return (
      <Dialog.Root open={true}>
        <Dialog.Portal>
          <StyledOverlay />
          <StyledDialog>
            <LoadingSpinner
              message="Redirecting to homepage..."
              size="3"
              minHeight="200px"
            />
          </StyledDialog>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <Dialog.Root open={open} modal={true}>
=======
  const handleClose = () => {
    resetForm()
    clearCart()
    onClose()
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      <Dialog.Portal>
        <StyledOverlay />
        <StyledDialog>
          <CloseButton onClick={handleModalClose} aria-label="Close modal">
            <X />
          </CloseButton>

          <StyledTitle>Thank you for your order!</StyledTitle>
          <StyledDescription>
            Our team is working on your order. You will receive a confirmation
            email soon with all the details.
          </StyledDescription>
          <ButtonsContainer>
            <PrimaryButton onClick={handleExportPrint}>
              Print Order Details
            </PrimaryButton>
            <SecondaryButton onClick={handleExportExcel}>
              Download as Excel
            </SecondaryButton>
            <SecondaryButton onClick={handleExportText}>
              Download as Text
            </SecondaryButton>
<<<<<<< HEAD
            <SecondaryButton onClick={handleModalClose}>Close</SecondaryButton>
=======
            <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
          </ButtonsContainer>
        </StyledDialog>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ThankYouModalWithErrorBoundary = withErrorBoundary(ThankYouModal, {
  fallback: (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledDialog>
          <StyledTitle>Order Completed!</StyledTitle>
          <StyledDescription>
            There was an issue displaying your order details, but your order has
            been received.
          </StyledDescription>
          <ButtonsContainer>
            <SecondaryButton onClick={() => (window.location.href = '/')}>
              Back to Homepage
            </SecondaryButton>
          </ButtonsContainer>
        </StyledDialog>
      </Dialog.Portal>
    </Dialog.Root>
  ),
})
export default ThankYouModalWithErrorBoundary
