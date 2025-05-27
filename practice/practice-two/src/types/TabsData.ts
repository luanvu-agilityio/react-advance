export interface ProductTabData {
  description: {
    origins: string
    cookingInfo: string
    vitamins?: Array<{ name: string; quantity: string; dv: string }>
  }
  reviews: {
    count: number
    items: Array<{
      author: string
      rating: number
      date: string
      comment: string
    }>
  }
  questions: {
    count: number
    items: Array<{
      question: string
      answer: string
      author: string
      date: string
    }>
  }
}
