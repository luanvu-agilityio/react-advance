export interface TabData {
  id: number
  description?: {
    origins: string
    cookingInfo: string
    vitamins?: Array<{
      name: string
      quantity: string
      dv: string
    }>
  }
  specifications?: Record<string, string>
  reviews?: {
    count: number
    items: Array<{
      author: string
      rating: number
      date: string
      comment: string
    }>
  }
  questions?: {
    count: number
    items: Array<{
      question: string
      answer: string
      author: string
      date: string
    }>
  }
}
