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
}
