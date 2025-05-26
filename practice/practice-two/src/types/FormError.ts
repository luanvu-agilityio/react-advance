export interface FormValues {
  [key: string]: string
}

export interface FormErrors {
  [key: string]: string | undefined
}

export interface PaymentFormValues {
  cardNumber?: string
  cardHolder?: string
  expirationDate?: string
  cvc?: string
}
