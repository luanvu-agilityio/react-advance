import { create } from 'zustand'

import type { CheckoutFormData } from 'types/checkout'

// Initial form data
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
    address: '',
    city: '',
    zip: '',
    country: '',
  },
  additional: {
    notes: '',
    marketingConsent: false,
    termsConsent: false,
  },
}

interface CheckoutStore {
  // State
  formData: CheckoutFormData
  currentStep: string
  promoCode: string
  isLoading: boolean

  // Actions
  setFormData: (data: Partial<CheckoutFormData>) => void
  updateField: <
    T extends keyof CheckoutFormData,
    K extends keyof CheckoutFormData[T],
  >(
    section: T,
    field: K,
    value: CheckoutFormData[T][K]
  ) => void
  setCurrentStep: (step: string) => void
  setPromoCode: (code: string) => void
  setLoading: (isLoading: boolean) => void
  resetForm: () => void
}

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  // Initial state
  formData: initialFormData,
  currentStep: 'billing',
  promoCode: '',
  isLoading: false,

  // Actions
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  updateField: (section, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: value,
        },
      },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),
  setPromoCode: (code) => set({ promoCode: code }),
  setLoading: (isLoading) => set({ isLoading }),
  resetForm: () => set({ formData: initialFormData, promoCode: '' }),
}))
