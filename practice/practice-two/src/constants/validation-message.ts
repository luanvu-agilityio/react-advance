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
}
