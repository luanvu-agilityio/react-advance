import type { RefObject } from 'react'
import type { CartItem } from './cart-items'

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface CreatedOrder {
  id: string
  customerEmail: string
  customerFirstName: string
  customerLastName: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerCountry: string
  customerZip: string
  paymentMethod: string
  termsConsent: boolean
  items: CartItem[]
  subtotal: number
  tax: number
  shippingCost: number
  total: number
  orderDate: string
  status: string
  formData: Record<string, unknown>
}

export interface OrderSummaryProps {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  phone?: string
  city?: string
  country?: string
  zip?: string
  shippingMethod?: string
  paymentMethod?: string
  items?: OrderItem[]
  subtotal?: number
  tax?: number
  shipping?: number
  total?: number
}

export interface OrderExportConfig {
  orderDetailsRef: RefObject<HTMLDivElement | null>
  customerData: OrderSummaryProps
}

export type OrderState = {
  success: boolean
  orderId?: string
  estimatedDelivery?: string
  processingDate?: string
  data?:
    | { [k: string]: FormDataEntryValue }
    | {
        customerName?: string
        customerEmail?: string
        orderTotal?: number
        itemCount?: number
      }
  error?: string
  message?: string
  errors?: Record<string, string>
}
