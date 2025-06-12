export interface CheckoutFormData {
  billing: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    zip: string
  }
  payment: {
    method: 'credit-card' | 'paypal' | 'bitcoin'
    cardNumber?: string
    cardHolder?: string
    expirationDate?: string
    cvc?: string
    processingFee?: number
  }
  shipping: {
    method: 'fedex' | 'dhl'
    price: number
    sameAsBilling: boolean

    address?: string
    city?: string
    zip?: string
    country?: string
  }
  additional: {
    notes?: string
    marketingConsent?: boolean
    termsConsent: boolean
  }
}
export interface CheckoutState {
  formData: CheckoutFormData
  errors: Record<string, string>
  currentStep: string
  isLoading: boolean
  promoCode: string
}
