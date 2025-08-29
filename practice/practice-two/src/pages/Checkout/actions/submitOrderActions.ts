'use server'

export async function submitOrderAction(formData: FormData) {
  // Convert FormData to object
  const data = Object.fromEntries(formData)
  // Simulate order processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    orderId: `ORD-${Date.now()}`,
    estimatedDelivery: '3-5 business days',
    processingDate: new Date().toISOString(),
    data,
  }
}
