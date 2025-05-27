export const validateField = (
  fieldName: string,
  value: string
): string | undefined => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      return value.length < 2 ? 'Must be at least 2 characters' : undefined

    case 'email':
      return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ? 'Invalid email address'
        : undefined

    case 'phone':
      return !value.match(/^\+?[\d\s-]{10,}$/)
        ? 'Invalid phone number'
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

    default:
      return value.length < 1 ? 'This field is required' : undefined
  }
}
