import { ValidationMessages } from '@constants/validation-message'

interface ValidationResult {
  isValid: boolean
  errorMessage: string | null
}

export const validateCardNumber = (value: string): ValidationResult => {
  if (!value.trim()) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cardNumber.required,
    }
  }

  const digitsOnly = value.replace(/\s/g, '')
  if (digitsOnly.length !== 16 ?? !/^\d+$/.test(digitsOnly)) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cardNumber.invalid,
    }
  }

  return { isValid: true, errorMessage: null }
}

export const validateCardHolder = (value: string): ValidationResult => {
  if (!value.trim()) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cardHolder.required,
    }
  }

  // Check if name only contains letters and spaces
  if (!/^[A-Za-z\s]+$/.test(value)) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cardHolder.invalid,
    }
  }

  return { isValid: true, errorMessage: null }
}

export const validateExpirationDate = (value: string): ValidationResult => {
  if (!value.trim()) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.expirationDate.required,
    }
  }

  // Check format MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.expirationDate.invalid,
    }
  }

  // Check if card is expired
  const [month, year] = value.split('/')
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1)
  const today = new Date()

  if (expiryDate < today) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.expirationDate.expired,
    }
  }

  return { isValid: true, errorMessage: null }
}

export const validateCVC = (value: string): ValidationResult => {
  if (!value.trim()) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cvc.required,
    }
  }

  if (!/^\d{3,4}$/.test(value)) {
    return {
      isValid: false,
      errorMessage: ValidationMessages.payment.cvc.invalid,
    }
  }

  return { isValid: true, errorMessage: null }
}

export const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '')

  // Add spaces after every 4 digits
  const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ')

  return formatted
}

export const formatExpirationDate = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '')

  // Format as MM/YY
  if (digitsOnly.length <= 2) {
    return digitsOnly
  }

  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`
}
