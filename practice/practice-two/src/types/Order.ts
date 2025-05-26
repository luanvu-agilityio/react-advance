export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface OrderSummaryProps {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  phone?: string
  city?: string
  state?: string
  zipCode?: string
  shippingMethod?: string
  paymentMethod?: string
  items?: OrderItem[]
  subtotal?: number
  tax?: number
  shipping?: number
  total?: number
}

export interface OrderExportConfig {
  orderDetailsRef: React.RefObject<HTMLDivElement | null>
  customerData: OrderSummaryProps
}
