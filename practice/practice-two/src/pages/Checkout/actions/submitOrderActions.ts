'use server'
import { REGEX } from '@constants/regex'
import type { CartItem } from 'types/cart-items'

// mock function
async function createOrder({
  customerEmail,
  items,
}: {
  customerEmail: string
  items: CartItem
}) {
  return {
    id: 'mock-order-id',
    customerEmail,
    items,
  }
}

function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false

  return REGEX.EMAIL.test(email)
}

export async function submitOrderAction(formData: FormData) {
  // This code ONLY runs on the server
  // 1. Validate data
  const email = formData.get('email')
  if (!isValidEmail(email)) {
    return { error: 'Invalid email address' }
  }

  // 2. Process business logic
  const order = await createOrder({
    customerEmail: email as string,
    items: JSON.parse(formData.get('items') as string),
  })

  // 3. Return result
  return {
    success: true,
    orderId: order.id,
    estimatedDelivery: '3-5 business days',
  }
}
