import type { OrderSummaryProps } from 'types/Order'

export const generateTextContent = (
  customerData: OrderSummaryProps
): string => {
  const lines = []
  const separator =
    '---------------------------------------------------------------'

  // Header
  lines.push('ORDER SUMMARY')
  lines.push(separator)
  lines.push(`Order Date: ${new Date().toLocaleDateString()}`)
  lines.push('')

  // Customer Information
  lines.push('CUSTOMER INFORMATION:')
  lines.push(separator)
  lines.push(
    `Name: ${customerData.firstName ?? ''} ${customerData.lastName ?? ''}`
  )
  lines.push(`Email: ${customerData.email ?? 'N/A'}`)
  lines.push(`Phone: ${customerData.phone ?? 'N/A'}`)
  lines.push('')

  // Billing Address
  lines.push('BILLING ADDRESS:')
  lines.push(separator)
  lines.push(`${customerData.address ?? 'N/A'}`)
  lines.push(
    `${customerData.city ?? 'N/A'}, ${customerData.country ?? ''} ${customerData.zip ?? ''}`
  )
  lines.push('')

  // Order Details
  lines.push('ORDER DETAILS:')
  lines.push(separator)
  lines.push(`Payment Method: ${customerData.paymentMethod ?? 'N/A'}`)
  lines.push(`Shipping Method: ${customerData.shippingMethod ?? 'N/A'}`)
  lines.push('')

  // Items
  lines.push('ORDERED ITEMS:')
  lines.push(separator)
  lines.push('Item                           Quantity    Unit Price    Total')
  lines.push(separator)

  if (customerData.items && customerData.items.length > 0) {
    customerData.items.forEach((item) => {
      // Format to create aligned columns
      const itemName = item.name.padEnd(30).substring(0, 30)
      const quantity = String(item.quantity).padEnd(12)
      const unitPrice = `$${item.price.toFixed(2)}`.padEnd(13)
      const total = `$${(item.quantity * item.price).toFixed(2)}`

      lines.push(`${itemName}${quantity}${unitPrice}${total}`)
    })
    lines.push(separator)
  } else {
    lines.push('No items in order')
    lines.push(separator)
  }

  lines.push('')

  // Order Summary
  lines.push('ORDER SUMMARY:')
  lines.push(separator)
  lines.push(
    `Subtotal:                                   $${customerData.subtotal?.toFixed(2) ?? '0.00'}`
  )
  lines.push(
    `Tax:                                         $${customerData.tax?.toFixed(2) ?? '0.00'}`
  )
  lines.push(
    `Shipping:                                    $${customerData.shipping?.toFixed(2) ?? '0.00'}`
  )
  lines.push(separator)
  lines.push(
    `TOTAL:                                       $${customerData.total?.toFixed(2) ?? '0.00'}`
  )
  lines.push(separator)
  lines.push('')
  lines.push('Thank you for your order!')
  lines.push('If you have any questions, please contact customer support.')

  return lines.join('\n')
}
