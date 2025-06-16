export interface ProductImage {
  main: string
  gallery: string[]
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  discountPercentage?: number
  rating: number
  delivery: {
    time: string
    location: string
  }
  freshness: string
  farm: string
  stock: string
  freeShipping: boolean
  imageUrl: string
  brand: string
  category: string
  subcategory: string
  tags: string[]
  variant?: string
  images: ProductImage
  section?: string[]
}
