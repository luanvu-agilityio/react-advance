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
<<<<<<< HEAD
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
=======
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

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
export interface CheckoutState {
  formData: CheckoutFormData
  errors: Record<string, string>
  currentStep: string
  isLoading: boolean
  promoCode: string
}
