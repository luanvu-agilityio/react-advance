import type { CartItem } from 'types/cart-items'

export interface CreateOrderParams {
  customerEmail: string
  customerFirstName: string
  customerLastName: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerCountry: string
  customerZip: string
  termsConsent: boolean
  paymentMethod: string
  items: CartItem[]
  formData: Record<string, unknown>
}

export interface Order {
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
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  formData: Record<string, unknown>
}

export class OrderService {
  // Mock async function to create an order
  static async createOrder(params: CreateOrderParams): Promise<Order> {
    // Fake API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate totals
    const subtotal = params.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.1 // 10% tax rate
    const shippingCost = params.formData['shipping.price']
      ? Number(params.formData['shipping.price'])
      : 0
    const total = subtotal + tax + shippingCost

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    const order: Order = {
      id: orderId,
      customerEmail: params.customerEmail,
      customerFirstName: params.customerFirstName,
      customerLastName: params.customerLastName,
      customerPhone: params.customerPhone,
      customerAddress: params.customerAddress,
      customerCity: params.customerCity,
      customerCountry: params.customerCountry,
      customerZip: params.customerZip,
      paymentMethod: params.paymentMethod,
      termsConsent: params.termsConsent,
      items: params.items,
      subtotal,
      tax,
      shippingCost,
      total,
      orderDate: new Date().toISOString(),
      status: 'pending',
      formData: params.formData,
    }

    console.log('Order created:', order)

    return order
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    // Fake database lookup
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`Looking up order with ID: ${orderId}`)
    return null
  }

  static generateOrderNumber(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
  }
}
