import { useCallback, useMemo } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

import {
  StepContainer,
  ShippingOption,
  ShippingOptionDetails,
  RadioCircle,
  ShippingLabel,
  AdditionalPrice,
  ShippingInfo,
  ShippingLogo,
} from '../CheckoutStyle'
import { useCheckout } from '@contexts/CheckoutContext'

// Define shipping method configuration type
interface ShippingMethodOption {
  id: string
  value: string
  label: string
  price: number
  logoSrc: string
  logoAlt: string
  logoWidth: string
  logoHeight: string
}

export const ShippingMethodSection = () => {
  const { formData, updateField } = useCheckout()
  const shippingData = formData.shipping

  // Shipping methods configuration
  const shippingMethods = useMemo<ShippingMethodOption[]>(
    () => [
      {
        id: 'fedex',
        value: 'fedex',
        label: 'FedEx',
        price: 32,
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372451/fedex_gcko1l.png',
        logoAlt: 'FedEx',
        logoWidth: '54px',
        logoHeight: '16px',
      },
      {
        id: 'dhl',
        value: 'dhl',
        label: 'DHL',
        price: 15,
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372450/dhl_it43vr.png',
        logoAlt: 'DHL',
        logoWidth: '93px',
        logoHeight: '14px',
      },
    ],
    []
  )

  const handleMethodChange = useCallback(
    (method: 'fedex' | 'dhl') => {
      // Find selected shipping method
      const selectedMethod = shippingMethods.find((m) => m.value === method)

      if (selectedMethod) {
        updateField('shipping', 'method', method)
        updateField('shipping', 'price', selectedMethod.price)
      }
    },
    [updateField, shippingMethods]
  )

  // Render a single shipping option
  const renderShippingOption = (method: ShippingMethodOption) => (
    <ShippingOption
      key={method.id}
      htmlFor={method.id}
      data-state={shippingData.method === method.value ? 'checked' : ''}
    >
      <ShippingOptionDetails>
        <RadioGroup.Item
          value={method.value}
          id={method.id}
          style={{ display: 'none' }}
        />
        <RadioCircle />
        <ShippingLabel>{method.label}</ShippingLabel>
      </ShippingOptionDetails>

      <AdditionalPrice>
        +{method.price} USD
        <span>Additional price</span>
      </AdditionalPrice>

      <ShippingInfo>
        <ShippingLogo
          src={method.logoSrc}
          alt={method.logoAlt}
          style={{
            width: method.logoWidth,
            height: method.logoHeight,
          }}
        />
      </ShippingInfo>
    </ShippingOption>
  )

  return (
    <StepContainer>
      <RadioGroup.Root
        value={shippingData.method}
        onValueChange={handleMethodChange}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {shippingMethods.map(renderShippingOption)}
      </RadioGroup.Root>
    </StepContainer>
  )
}

ShippingMethodSection.displayName = 'ShippingMethodSection'

export default ShippingMethodSection
