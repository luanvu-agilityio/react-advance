import type { CheckoutFormData, CheckoutState } from 'types/checkout'
import { useState, useCallback, useRef } from 'react'
import { validateField } from '@utils/validateField'

const initialFormData: CheckoutFormData = {
  billing: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  },
  payment: {
    method: 'credit-card',
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvc: '',
  },
  shipping: {
    method: 'fedex',
    price: 32,
    sameAsBilling: true,
  },
  additional: {
    notes: '',
    marketingConsent: false,
    termsConsent: false,
  },
}

export const useCheckoutForm = () => {
  const [state, setState] = useState<CheckoutState>({
    formData: initialFormData,
    errors: {},
    currentStep: 'billing',
    isLoading: false,
    promoCode: '',
  })
  const orderDetailsRef = useRef<HTMLDivElement>(null)

  // Update specific field in nested object
  const updateField = useCallback(
    <T extends keyof CheckoutFormData, K extends keyof CheckoutFormData[T]>(
      section: T,
      field: K & string,
      value: CheckoutFormData[T][K]
    ) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [section]: {
            ...prev.formData[section],
            [field]: value,
          },
        },
      }))
    },
    []
  )

  // Update entire section
  const updateSection = useCallback(
    (
      section: keyof CheckoutFormData,
      data: Partial<CheckoutFormData[typeof section]>
    ) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [section]: {
            ...prev.formData[section],
            ...data,
          },
        },
      }))
    },
    []
  )

  // Set field error
  const setFieldError = useCallback((field: string, error: string) => {
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }))
  }, [])

  // Clear field error
  const clearFieldError = useCallback((field: string) => {
    setState((prev) => {
      const newErrors = { ...prev.errors }
      delete newErrors[field]
      return {
        ...prev,
        errors: newErrors,
      }
    })
  }, [])

  // Update current step
  const setCurrentStep = useCallback((step: string) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  // Update promo code
  const setPromoCode = useCallback((code: string) => {
    setState((prev) => ({ ...prev, promoCode: code }))
  }, [])

  // Validate specific section
  const validateSection = useCallback(
    (section: keyof CheckoutFormData) => {
      const sectionData = state.formData[section]
      const errors: Record<string, string> = {}

      // Validation
      switch (section) {
        case 'billing': {
          const billingData = sectionData as CheckoutFormData['billing']

          // Use validateField for each field
          const firstNameError = validateField(
            'firstName',
            billingData.firstName
          )
          if (firstNameError) errors.firstName = firstNameError

          const lastNameError = validateField('lastName', billingData.lastName)
          if (lastNameError) errors.lastName = lastNameError

          const emailError = validateField('email', billingData.email)
          if (emailError) errors.email = emailError

          const phoneError = validateField('phone', billingData.phone)
          if (phoneError) errors.phone = phoneError

          // Additional address validations if needed
          const addressError = validateField('address', billingData.address)
          if (addressError) errors.address = addressError

          const cityError = validateField('city', billingData.city)
          if (cityError) errors.city = cityError

          const countryError = validateField('country', billingData.country)
          if (countryError) errors.country = countryError

          const zipError = validateField('zip', billingData.zip)
          if (zipError) errors.zip = zipError

          break
        }

        case 'payment': {
          const paymentData = sectionData as CheckoutFormData['payment']

          if (paymentData.method === 'credit-card') {
            // Validate credit card fields using validateField
            const cardNumberError = validateField(
              'cardNumber',
              paymentData.cardNumber ?? ''
            )
            if (cardNumberError) errors.cardNumber = cardNumberError

            const cardHolderError = validateField(
              'cardHolder',
              paymentData.cardHolder ?? ''
            )
            if (cardHolderError) errors.cardHolder = cardHolderError

            const expirationDateError = validateField(
              'expirationDate',
              paymentData.expirationDate ?? ''
            )
            if (expirationDateError) errors.expirationDate = expirationDateError

            const cvcError = validateField('cvc', paymentData.cvc ?? '')
            if (cvcError) errors.cvc = cvcError
          }
          break
        }

        case 'shipping': {
          const shippingData = sectionData as CheckoutFormData['shipping']

          if (!shippingData.method) {
            errors.shippingMethod = 'Please select a shipping method'
          }

          if (!shippingData.sameAsBilling) {
            // Validate shipping address fields here
          }

          break
        }

        case 'additional': {
          const additionalData = sectionData as CheckoutFormData['additional']

          // Validate notes field
          if (additionalData.notes && additionalData.notes.length > 500) {
            errors.notes = 'Notes cannot exceed 500 characters'
          }

          // Check if terms consent is required
          if (additionalData.termsConsent === false) {
            errors.termsConsent = 'You must agree to the terms and conditions'
          }

          break
        }
      }

      setState((prev) => ({ ...prev, errors: { ...prev.errors, ...errors } }))
      return Object.keys(errors).length === 0
    },
    [state.formData]
  )

  // Submit form
  const submitForm = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Validate all sections
      const isValid = ['billing', 'payment', 'shipping', 'additional'].every(
        (section) => validateSection(section as keyof CheckoutFormData)
      )

      if (!isValid) {
        console.error('Form validation failed')
        return false
      }

      return true
    } catch (error) {
      console.error('Submit error:', error)
      return false
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [validateSection])

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setState({
      formData: initialFormData,
      errors: {},
      currentStep: 'billing',
      isLoading: false,
      promoCode: '',
    })
  }, [])

  return {
    ...state,
    updateField,
    updateSection,
    setFieldError,
    clearFieldError,
    setCurrentStep,
    setPromoCode,
    orderDetailsRef,
    validateSection,
    submitForm,
    resetForm,
  }
}
