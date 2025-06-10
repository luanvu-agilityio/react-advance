<<<<<<< HEAD
=======
import { CheckoutProvider } from '@contexts/CheckoutContext'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
import CheckoutContent from './sections/CheckoutContent'
import { useCheckoutStore } from '@stores/checkoutStore'
import { useEffect, useRef, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useCartStore } from '@stores/cartStore'
import type { CheckoutFormData } from 'types/checkout' // Import the type directly
import { withErrorBoundary } from '@utils/withErrorBoundary'
import CheckoutErrorFallback from './CheckoutFallback'

const CheckoutPage = () => {
<<<<<<< HEAD
  // Create ref for order details export functionality
  const orderDetailsRef = useRef<HTMLDivElement>(null)

  // Get form data and setter from checkout store
  const { formData, setFormData } = useCheckoutStore()

  // Initialize React Hook Form with Zod validation
  const methods = useForm<CheckoutFormData>({
    defaultValues: formData,
    mode: 'onBlur',
  })

  useEffect(() => {
    // Only reset on initial mount, not on every formData change
    const initialReset = () => {
      methods.reset(formData)
    }
    initialReset()
    // Empty dependency array - only runs on mount
  }, [])

  useEffect(() => {
    // Update specific payment fields without resetting the entire form
    methods.setValue('payment.method', formData.payment.method)

    // Only sync shipping method data
    methods.setValue('shipping.method', formData.shipping.method)
    methods.setValue('shipping.price', formData.shipping.price)
  }, [
    formData.payment.method,
    formData.shipping.method,
    formData.shipping.price,
    methods,
  ])

  // Handle form submission
  const onSubmit = useCallback(
    async (data: CheckoutFormData) => {
      // Check if cart has items
      const { items } = useCartStore.getState()
      if (items.length === 0) return false

      try {
        // Save form data to store
        setFormData(data)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        console.error('Error submitting form:', error)
        return false
      }
    },
    [setFormData]
  )

  // Handle successful checkout
  const handleCheckoutSuccess = useCallback(() => {
    console.log('Order completed successfully!')
  }, [])

  return (
    <FormProvider {...methods}>
      <CheckoutContent
        orderDetailsRef={orderDetailsRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
    </FormProvider>
  )
}

// Handle checkout page reload
const handleRetry = () => {
  window.location.reload()
}

// Log checkout errors to monitoring service
const handleCheckoutError = (error: Error) => {
  console.error('Checkout Error:', error)
}

// Export the enhanced component
const CheckoutPageWithErrorBoundary = withErrorBoundary(CheckoutPage, {
  fallback: <CheckoutErrorFallback onRetry={handleRetry} />,
  onError: handleCheckoutError,
})

export default CheckoutPageWithErrorBoundary
=======
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}

export default CheckoutPage
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
