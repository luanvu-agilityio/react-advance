import { useState } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { CheckoutProvider } from '@contexts/CheckoutContext'

import CheckoutContent from './sections/CheckoutContent'

// Main Component
const CheckoutPage = () => {
  const [sameAddressChecked, setSameAddressChecked] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [isMobile] = useMediaQuery(['(max-width: 1023px)'])

  return (
    <CheckoutProvider>
      <CheckoutContent
        sameAddressChecked={sameAddressChecked}
        setSameAddressChecked={setSameAddressChecked}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        isMobile={isMobile}
      />
    </CheckoutProvider>
  )
}

export default CheckoutPage
CheckoutPage.whyDidYouRender = true
