export const validateField = (
  fieldName: string,
  value: string
): string | undefined => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
    case 'shippingFirstName':
    case 'shippingLastName':
      return value.length < 2 ? 'Must be at least 2 characters' : undefined

    case 'email':
    case 'shippingEmail':
      return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ? 'Invalid email address'
        : undefined

    case 'phone':
    case 'shippingPhone':
      return !value.match(/^\+?[\d\s-]{10,}$/)
        ? 'Invalid phone number'
        : undefined

    case 'address':
    case 'shippingAddress':
      return !value.trim() ? 'Address is required' : undefined

    case 'city':
    case 'shippingCity':
      return !value.trim() ? 'City is required' : undefined

    case 'country':
    case 'shippingCountry':
      return !value.trim() ? 'Country is required' : undefined

    case 'zip':
    case 'shippingZip':
      // ZIP code validation
      return !value.match(/^[a-zA-Z0-9\s-]{3,10}$/)
        ? 'Invalid ZIP code'
        : undefined

    case 'cardNumber':
      return !value.replace(/\s/g, '').match(/^\d{16}$/)
        ? 'Invalid card number'
        : undefined

    case 'cardHolder':
      return value.length < 3 ? 'Invalid card holder name' : undefined

    case 'expirationDate': {
      const [month, year] = value.split('/')
      const now = new Date()
      const expYear = 2000 + parseInt(year ?? '0')
      const expMonth = parseInt(month ?? '0') - 1
      const expDate = new Date(expYear, expMonth)

      return !value.match(/^\d{2}\/\d{2}$/) || expDate < now
        ? 'Invalid expiration date'
        : undefined
    }

    case 'cvc':
      return !value.match(/^\d{3,4}$/) ? 'Invalid CVC' : undefined

    case 'shippingMethod':
      return !value.trim() ? 'Please select a shipping method' : undefined

    case 'discountCode':
      // Validate discount code format
      return value && !value.match(/^[A-Z0-9]{6,10}$/)
        ? 'Invalid discount code format'
        : undefined

    case 'notes':
      // Check if notes exceed maximum length
      return value.length > 500
        ? 'Notes cannot exceed 500 characters'
        : undefined

    case 'termsConsent':
      // For checkbox values
      return value !== 'true' && value !== '1'
        ? 'You must agree to the terms and conditions'
        : undefined

    case 'marketingConsent':
      // Marketing consent is optional
      return undefined

    default:
      return value.length < 1 ? 'This field is required' : undefined
  }
}

export const formatCardField = (name: string, value: string): string => {
  switch (name) {
    case 'cardNumber':
      return value
        .replace(/\s/g, '') // Remove spaces
        .replace(/(.{4})/g, '$1 ') // Add space every 4 digits
        .trim()
        .substring(0, 19) // Limit to 16 digits + 3 spaces

    case 'expirationDate':
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d)/, '$1/$2') // Add slash after 2 digits
        .substring(0, 5) // Limit to MM/YY

    case 'cvc':
      return value
        .replace(/\D/g, '') // Remove non-digits
        .substring(0, 4) // Limit to 4 digits

    default:
      return value
  }
}
