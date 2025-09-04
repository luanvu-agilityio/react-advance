'use server'

import { OrderService } from '@services/order'

import type { OrderState } from 'types/Order'

export async function submitOrderAction(
  formData: FormData
): Promise<OrderState> {
  try {
    // Extract all form data
    const billingEmail = formData.get('billing.email')
    const billingFirstName = formData.get('billing.firstName')
    const billingLastName = formData.get('billing.lastName')
    const billingPhone = formData.get('billing.phone')
    const billingAddress = formData.get('billing.address')
    const billingCity = formData.get('billing.city')
    const billingCountry = formData.get('billing.country')
    const billingZip = formData.get('billing.zip')
    const termsConsent = formData.get('additional.termsConsent')
    const paymentMethod = formData.get('payment.method')
    const items = formData.get('cart.items')

    // Process the order
    const order = await OrderService.createOrder({
      customerEmail: billingEmail as string,
      customerFirstName: billingFirstName as string,
      customerLastName: billingLastName as string,
      customerPhone: billingPhone as string,
      customerAddress: billingAddress as string,
      customerCity: billingCity as string,
      customerCountry: billingCountry as string,
      customerZip: billingZip as string,
      termsConsent: termsConsent === 'true',
      paymentMethod: paymentMethod as string,
      items: items ? JSON.parse(items as string) : [],
      formData: Object.fromEntries(formData.entries()),
    })

    return {
      success: true,
      message: 'Order submitted successfully!',
      orderId: order.id,
      estimatedDelivery: '3-5 business days',
    }
  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      errors: { general: 'Server error occurred' },
    }
  }
}
