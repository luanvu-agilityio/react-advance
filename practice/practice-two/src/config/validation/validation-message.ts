<<<<<<< HEAD
export const ValidationMessage = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  ZIP: 'Please enter a valid ZIP/Postal code',
  MIN_LENGTH: (field: string, length: number) =>
    `${field} must be at least ${length} characters`,

  MAX_LENGTH: (field: string, length: number) =>
    `${field} must be at most ${length} characters`,
  CARD: {
    NUMBER: 'Card number must be 16 digits',
    NAME: 'Please enter the cardholder name',
    EXPIRY: 'Use MM/YY format',
    CVC: 'CVC must be 3-4 digits',
  },
  CONSENT: 'You must agree to the terms and conditions',
=======
export const ValidationMessages = {
  // Payment form messages
  payment: {
    cardNumber: {
      required: 'Please enter your card number',
      invalid: 'Card number must be 16 digits',
      format: 'Card number should be in format: XXXX XXXX XXXX XXXX',
    },
    cardHolder: {
      required: 'Please enter card holder name',
      invalid: 'Card holder name should only contain letters',
    },
    expirationDate: {
      required: 'Please enter expiration date',
      invalid: 'Use format MM/YY',
      expired: 'Card has expired',
    },
    cvc: {
      required: 'Please enter CVC',
      invalid: 'CVC must be 3-4 digits',
    },
  },

  // Billing form messages
  billing: {
    firstName: {
      required: 'First name is required',
      tooShort: 'First name must be at least 2 characters',
    },
    lastName: {
      required: 'Last name is required',
      tooShort: 'Last name must be at least 2 characters',
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    phone: {
      required: 'Phone number is required',
      invalid: 'Please enter a valid phone number',
    },
    address: {
      required: 'Address is required',
    },
    city: {
      required: 'City is required',
    },
    country: {
      required: 'Country is required',
    },
    zip: {
      required: 'ZIP/Postal code is required',
      invalid: 'Please enter a valid ZIP/Postal code',
    },
  },

  // Shipping form messages
  shipping: {
    method: {
      required: 'Please select a shipping method',
    },
    firstName: {
      required: 'First name is required',
      tooShort: 'First name must be at least 2 characters',
    },
    lastName: {
      required: 'Last name is required',
      tooShort: 'Last name must be at least 2 characters',
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    phone: {
      required: 'Phone number is required',
      invalid: 'Please enter a valid phone number',
    },
    address: {
      required: 'Shipping address is required',
    },
    city: {
      required: 'City is required',
    },
    country: {
      required: 'Country is required',
    },
    zip: {
      required: 'ZIP/Postal code is required',
      invalid: 'Please enter a valid ZIP/Postal code',
    },
  },

  // Additional information messages
  additional: {
    notes: {
      tooLong: 'Notes cannot exceed 500 characters',
    },
    discountCode: {
      invalid: 'Invalid discount code format',
    },
    termsConsent: {
      required: 'You must agree to the terms and conditions',
    },
  },
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}
