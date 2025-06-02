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
  }
  shipping: {
    method: 'dhl' | 'fedex'
    sameAsBilling: boolean
    price: number

    // These fields are only used when sameAsBilling is false
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    address?: string
    city?: string
    country?: string
    zip?: string
  }
  additional: {
    notes: string
    marketingConsent: boolean
    termsConsent: boolean
    discountCode?: string
  }
}

export interface CheckoutState {
  formData: CheckoutFormData
  errors: Record<string, string>
  currentStep: string
  isLoading: boolean
  promoCode: string
}
