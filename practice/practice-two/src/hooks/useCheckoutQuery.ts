import { useMutation, useQuery } from '@tanstack/react-query'
import { useToast } from '@stores/toastStore'
import { useCartStore } from '@stores/cartStore'
import { useCheckoutStore } from '@stores/checkoutStore'
import type { CheckoutFormData } from 'types/checkout'
import type { CartItem } from 'types/cart-items'
import {
  calculateShippingCost,
  calculateSubtotal,
  calculateTax,
} from '@utils/cartCalculation'

// Mock API functions
const checkoutApi = {
  validateShippingMethod: async (method: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const price = calculateShippingCost(method)

    return {
      valid: true,
      price: price,
      estimatedDelivery: method === 'fedex' ? '1-2 days' : '3-5 days',
    }
  },

  validatePaymentMethod: async (method: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Calculate processing fee based on payment method
    let processingFee = 0
    if (method === 'paypal') {
      processingFee = 1.5
    }

    return {
      valid: true,
      processingFee: processingFee,
    }
  },

  validatePromoCode: async (code: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Mock promo validation
    if (code.toLowerCase() === 'discount10') {
      return {
        valid: true,
        discount: 10,
        type: 'percentage',
        description: '10% off your order',
      }
    }

    return { valid: false }
  },

  submitOrder: async (orderData: {
    formData: CheckoutFormData
    items: CartItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Processing order with data:', orderData)

    // Mock successful order submission
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      estimatedDelivery: '3-5 business days',
      processingDate: new Date().toISOString(),
    }
  },
}

/**
 * Hook for shipping method selection and validation
 */
export const useShippingMethodMutation = () => {
  const { updateField } = useCheckoutStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (method: 'fedex' | 'dhl') => {
      return await checkoutApi.validateShippingMethod(method)
    },
    onSuccess: (data, method) => {
      // Update checkout store
      updateField('shipping', 'method', method)
      updateField('shipping', 'price', data.price)

      // Show toast notification
      toast({
        title: 'Shipping Method Updated',
        description: `${method.toUpperCase()} shipping selected ($${data.price})`,
        variant: 'info',
      })
    },
    onError: (error) => {
      toast({
        title: 'Shipping Method Error',
        description: error.message || 'Failed to update shipping method',
        variant: 'error',
      })
    },
  })
}

/**
 * Hook for payment method selection and validation
 */
export const usePaymentMethodMutation = () => {
  const { updateField } = useCheckoutStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (method: 'credit-card' | 'paypal' | 'bitcoin') => {
      return await checkoutApi.validatePaymentMethod(method)
    },
    onSuccess: (data, method) => {
      // Update checkout store
      updateField('payment', 'method', method)
      // Add processing fee from data if it exists
      if (data.processingFee) {
        updateField('payment', 'processingFee', data.processingFee)
      }

      // Format method name for display
      let methodName = 'Credit Card'
      if (method === 'paypal') methodName = 'PayPal'
      if (method === 'bitcoin') methodName = 'Bitcoin'

      // Show toast notification
      toast({
        title: 'Payment Method Updated',
        description: `${methodName} selected as your payment method`,
        variant: 'info',
      })
    },
    onError: (error) => {
      toast({
        title: 'Payment Method Error',
        description: error.message || 'Failed to update payment method',
        variant: 'error',
      })
    },
  })
}

/**
 * Hook to validate promo codes
 */
export const usePromoCodeQuery = (code: string) => {
  const { toast } = useToast()

  const query = useQuery({
    queryKey: ['promoCode', code],
    queryFn: () => checkoutApi.validatePromoCode(code),
    enabled: code.length > 0,
    staleTime: 5 * 60 * 1000, // Cache promo validation for 5 minutes
  })

  // Handle success with the query result
  if (query.isSuccess && query.data) {
    if (query.data.valid) {
      toast({
        title: 'Promo Code Applied',
        description: query.data.description,
        variant: 'success',
      })
    } else {
      toast({
        title: 'Invalid Promo Code',
        description: 'The promo code you entered is not valid',
        variant: 'error',
      })
    }
  }

  return query
}

/**
 * Hook for order submission
 */
export const useOrderSubmitMutation = () => {
  const { formData } = useCheckoutStore()
  const { items } = useCartStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async () => {
      const subtotal = calculateSubtotal(items)
      const tax = calculateTax(subtotal)
      const shipping = calculateShippingCost(formData.shipping.method)
      const total = subtotal + tax + shipping

      return await checkoutApi.submitOrder({
        formData,
        items,
        subtotal,
        tax,
        shipping,
        total,
      })
    },
    onMutate: () => {
      // Show processing toast when mutation starts
      toast({
        title: 'Processing Order',
        description: 'Your order is being processed...',
        variant: 'info',
        duration: 2000,
      })
    },
    onSuccess: (data) => {
      // Show success toast
      toast({
        title: 'Order Successful',
        description: `Order #${data.orderId} has been placed successfully!`,
        variant: 'success',
        duration: 5000,
      })

      return data
    },
    onError: (error) => {
      toast({
        title: 'Order Failed',
        description:
          error.message || 'There was a problem processing your order',
        variant: 'error',
        duration: 5000,
      })
    },
  })
}
