import { CheckoutProvider } from '@contexts/CheckoutContext'
import CheckoutContent from './sections/CheckoutContent'

const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}

export default CheckoutPage
