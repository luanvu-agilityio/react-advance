import { useState } from 'react'

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateCardNumber = (cardNumber: string): boolean => {
  // Simple validation - card number should be 16 digits without spaces
  const cardNumberRegex = /^\d{16}$/
  return cardNumberRegex.test(cardNumber.replace(/\s/g, ''))
}

const validateExpirationDate = (date: string): boolean => {
  // Format should be MM/YY
  const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
  if (!dateRegex.test(date)) return false

  const [month, year] = date.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100 // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1

  const expiryYear = parseInt(year)
  const expiryMonth = parseInt(month)

  // Check if card is expired
  return (
    expiryYear > currentYear ||
    (expiryYear === currentYear && expiryMonth >= currentMonth)
  )
}

const validateCVC = (cvc: string): boolean => {
  // CVC should be 3 or 4 digits
  const cvcRegex = /^\d{3,4}$/
  return cvcRegex.test(cvc)
}

const validatePhone = (phone: string): boolean => {
  // Simple phone validation - at least 10 digits
  const phoneRegex = /^\d{10,}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

const validateZip = (zip: string): boolean => {
  // Simple ZIP code validation - 5 digits or 5+4 format
  const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  return zipRegex.test(zip)
}

interface CheckoutFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zip: string
  cardNumber: string
  cardHolder: string
  expirationDate: string
  cvc: string
  notes: string
}

interface CheckoutFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  zip?: string
  cardNumber?: string
  cardHolder?: string
  expirationDate?: string
  cvc?: string
}

interface CheckoutFormState {
  sameAddressChecked: boolean
  shippingMethod: string
  paymentMethod: string
  marketingConsent: boolean
  termsConsent: boolean
  promoCode: string
}

type CheckoutFormData = CheckoutFormValues & CheckoutFormState
export const useCheckoutForm = (onSubmit: (data: CheckoutFormData) => void) => {
  // Form values
  const [formValues, setFormValues] = useState<CheckoutFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvc: '',
    notes: '',
  })

  // Form errors
  const [formErrors, setFormErrors] = useState<CheckoutFormErrors>({})

  // Form state
  const [formState, setFormState] = useState<CheckoutFormState>({
    sameAddressChecked: true,
    shippingMethod: 'fedex',
    paymentMethod: 'credit-card',
    marketingConsent: false,
    termsConsent: false,
    promoCode: '',
  })

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (formErrors[name as keyof CheckoutFormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Update form state (checkboxes, radio buttons)
  const updateFormState = (
    field: keyof CheckoutFormState,
    value: CheckoutFormState[keyof CheckoutFormState]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Validate a specific field
  const validateNameField = (
    name: string,
    value: string
  ): string | undefined => {
    if (!value) {
      const label = name === 'firstName' ? 'First' : 'Last'
      return `${label} name is required`
    }
    return undefined
  }

  const validateEmailField = (value: string): string | undefined => {
    if (!value) return 'Email is required'
    if (!validateEmail(value)) return 'Please enter a valid email address'
    return undefined
  }

  const validatePhoneField = (value: string): string | undefined => {
    if (!value) return 'Phone number is required'
    if (!validatePhone(value)) return 'Please enter a valid phone number'
    return undefined
  }

  const validateRequiredField = (
    value: string,
    fieldName: string
  ): string | undefined => {
    return value ? undefined : `${fieldName} is required`
  }

  const validateZipField = (value: string): string | undefined => {
    if (!value) return 'ZIP code is required'
    if (!validateZip(value)) return 'Please enter a valid ZIP code'
    return undefined
  }

  const validateCardNumberField = (value: string): string | undefined => {
    if (!value) return 'Card number is required'
    if (!validateCardNumber(value))
      return 'Please enter a valid 16-digit card number'
    return undefined
  }

  const validateExpirationDateField = (value: string): string | undefined => {
    if (!value) return 'Expiration date is required'
    if (!validateExpirationDate(value))
      return 'Please enter a valid date (MM/YY)'
    return undefined
  }

  const validateCVCField = (value: string): string | undefined => {
    if (!value) return 'CVC is required'
    if (!validateCVC(value)) return 'Please enter a valid 3 or 4 digit CVC'
    return undefined
  }

  const validateField = (name: string, value: string): string | undefined => {
    if (
      formState.paymentMethod !== 'credit-card' &&
      ['cardNumber', 'cardHolder', 'expirationDate', 'cvc'].includes(name)
    ) {
      return undefined
    }

    switch (name) {
      case 'firstName':
      case 'lastName':
        return validateNameField(name, value)
      case 'email':
        return validateEmailField(value)
      case 'phone':
        return validatePhoneField(value)
      case 'address':
        return validateRequiredField(value, 'Address')
      case 'city':
        return validateRequiredField(value, 'City')
      case 'country':
        return validateRequiredField(value, 'Country')
      case 'zip':
        return validateZipField(value)
      case 'cardNumber':
        return validateCardNumberField(value)
      case 'cardHolder':
        return validateRequiredField(value, 'Card holder name')
      case 'expirationDate':
        return validateExpirationDateField(value)
      case 'cvc':
        return validateCVCField(value)
      default:
        return undefined
    }
  }

  // Validate field on blur
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    if (error) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  // Validate all fields before submission
  const validateForm = (): boolean => {
    const newErrors: CheckoutFormErrors = {}
    let isValid = true

    // Validate all fields
    Object.entries(formValues).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const error = validateField(key, value)
        if (error) {
          newErrors[key as keyof CheckoutFormErrors] = error
          isValid = false
        }
      }
    })

    // Check terms consent
    if (!formState.termsConsent) {
      isValid = false
      alert('You must accept the terms and conditions')
    }

    setFormErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        ...formValues,
        ...formState,
      })
    } else {
      // Focus the first field with an error
      const firstErrorField = Object.keys(formErrors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element) (element as HTMLElement).focus()
    }
  }

  return {
    formValues,
    formErrors,
    formState,
    handleInputChange,
    handleBlur,
    updateFormState,
    handleSubmit,
  }
}
