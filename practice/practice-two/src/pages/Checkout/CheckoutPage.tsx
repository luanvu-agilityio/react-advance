'use client'
import { useEffect, useRef, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { withErrorBoundary } from '@utils/withErrorBoundary'

// Components
import CheckoutContent from './sections/CheckoutContent'
import CheckoutErrorFallback from './CheckoutFallback'

// Stores & Types
import { useCheckoutStore } from '@stores/checkoutStore'
import { useCartStore } from '@stores/cartStore'
import type { CheckoutFormData } from 'types/checkout'
import { useToast } from '@stores/toastStore'
/**
 * Custom hook to manage checkout form logic
 */
const useCheckoutForm = () => {
  const { formData, setFormData } = useCheckoutStore()
  const { toast } = useToast()

  // Initialize form with react-hook-form
  const methods = useForm<CheckoutFormData>({
    defaultValues: formData,
    mode: 'onBlur',
  })

  // Initialize form only once on mount
  useEffect(() => {
    methods.reset(formData)
  }, []) // Empty dependency array - only runs on mount

  // Sync specific form fields when they change in store
  useEffect(() => {
    // Update payment method without triggering validation
    methods.setValue('payment.method', formData.payment.method)

    // Update shipping information
    methods.setValue('shipping.method', formData.shipping.method)
    methods.setValue('shipping.price', formData.shipping.price)
  }, [
    formData.payment.method,
    formData.shipping.method,
    formData.shipping.price,
    methods,
  ])

  // Form submission handler
  const handleSubmit = useCallback(
    async (data: CheckoutFormData): Promise<boolean> => {
      // Validate cart has items
      const { items } = useCartStore.getState()
      if (items.length === 0) {
        toast({
          title: 'Empty Cart',
          description: 'You cannot proceed with an empty cart',
          variant: 'error',
          duration: 2500,
        })
        return false
      }

      try {
        // Save form data to store
        setFormData(data)

        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        console.error('Error submitting checkout form:', error)
        toast({
          title: 'Submission Error',
          description: 'There was a problem processing your order',
          variant: 'error',
          duration: 3000,
        })
        return false
      }
    },
    [setFormData, toast]
  )

  return {
    methods,
    handleSubmit,
  }
}

/**
 * Checkout page component with form management
 */
const CheckoutPage = () => {
  // Reference for order details export functionality
  const orderDetailsRef = useRef<HTMLDivElement>(null)

  // Get form handling logic
  const { methods, handleSubmit } = useCheckoutForm()

  // Success callback when checkout completes
  const handleCheckoutSuccess = useCallback(() => {
    console.log('Order completed successfully!')
  }, [])

  return (
    <FormProvider {...methods}>
      <CheckoutContent
        orderDetailsRef={orderDetailsRef}
        onSubmit={methods.handleSubmit(handleSubmit)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
    </FormProvider>
  )
}

/**
 * Error handling functions
 */

const handleCheckoutError = (error: Error) => {
  console.error('Checkout Error:', error)
}

/**
 * Wrap the component with error boundary
 */
const CheckoutPageWithErrorBoundary = withErrorBoundary(CheckoutPage, {
  fallback: <CheckoutErrorFallback />,
  onError: handleCheckoutError,
})

export default CheckoutPageWithErrorBoundary
