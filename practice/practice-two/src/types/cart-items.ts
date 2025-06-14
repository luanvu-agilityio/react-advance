import type { Product } from './Product'

export interface CartItem
  extends Partial<Omit<Product, 'id' | 'price' | 'title'>> {
  id: number
  title: string
  price: number
  quantity: number
  buyUnit: string
  originalPrice?: number
  imageUrl?: string
  farm?: string
  freshness?: string
  rating?: number
}
