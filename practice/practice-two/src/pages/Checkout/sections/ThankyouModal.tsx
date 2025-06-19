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
import { calculateSubtotal, calculateTax } from '@utils/cartCalculation'

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
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { formData, resetForm } = useCheckoutStore()
  const { items, clearCart } = useCartStore()
  const navigate = useNavigate()

  // Calculate order totals accurately using store functions
  const orderCalculations = useMemo(() => {
    const subtotal = calculateSubtotal(items)
    const tax = calculateTax(subtotal)
    const shipping = formData.shipping.price || 0
    const total = subtotal + tax + shipping

    return { subtotal, tax, shipping, total }
  }, [items, formData.shipping.price])

  // Prepare complete customer data for export
  const customerData = useMemo(
    () => ({
      // Billing information
      firstName: formData.billing.firstName,
      lastName: formData.billing.lastName,
      email: formData.billing.email,
      phone: formData.billing.phone,
      address: formData.billing.address,
      city: formData.billing.city,
      country: formData.billing.country,
      zip: formData.billing.zip,

      // Shipping and payment info
      shipping: formData.shipping.price,
      shippingMethod: formData.shipping.method,
      paymentMethod: formData.payment.method,

      // Items with accurate calculations
      items: items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        unit: item.buyUnit,
        total: Number(item.price) * item.quantity,
      })),

      // Order totals
      subtotal: orderCalculations.subtotal,
      tax: orderCalculations.tax,
      shippingCost: orderCalculations.shipping,
      total: orderCalculations.total,
    }),
    [formData, items, orderCalculations]
  )

  // Get export functions
  const { handlePrint, handleDownloadExcel, handleDownloadText } =
    useOrderExport({
      orderDetailsRef,
      customerData,
    })

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
              minHeight="400px"
            />
          </StyledDialog>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <Dialog.Root open={open} modal={true}>
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
            <SecondaryButton onClick={handleModalClose}>Close</SecondaryButton>
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
