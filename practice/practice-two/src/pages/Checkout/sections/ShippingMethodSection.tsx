import React from 'react'
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

export interface ShippingMethodProps {
  shippingMethod: string
  setShippingMethod: (value: string) => void
}

export const ShippingMethodSection: React.FC<ShippingMethodProps> = ({
  shippingMethod,
  setShippingMethod,
}) => (
  <StepContainer>
    <RadioGroup.Root
      value={shippingMethod}
      onValueChange={setShippingMethod}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <ShippingOption
        htmlFor="fedex"
        data-state={shippingMethod === 'fedex' ? 'checked' : ''}
      >
        <ShippingOptionDetails>
          <RadioGroup.Item
            value="fedex"
            id="fedex"
            style={{ display: 'none' }}
          />
          <RadioCircle />
          <ShippingLabel>FedEx</ShippingLabel>
        </ShippingOptionDetails>
        <AdditionalPrice>
          +32 USD
          <span>Additional price</span>
        </AdditionalPrice>

        <ShippingInfo>
          <ShippingLogo
            src="/src/assets/images/logos/fedex.png"
            alt="FedEx"
            style={{ width: '54px', height: '16px' }}
          />
        </ShippingInfo>
      </ShippingOption>

      <ShippingOption
        htmlFor="dhl"
        data-state={shippingMethod === 'dhl' ? 'checked' : ''}
      >
        <ShippingOptionDetails>
          <RadioGroup.Item value="dhl" id="dhl" style={{ display: 'none' }} />
          <RadioCircle />
          <ShippingLabel>DHL</ShippingLabel>
        </ShippingOptionDetails>
        <AdditionalPrice>
          +15 USD
          <span>Additional price</span>
        </AdditionalPrice>
        <ShippingInfo>
          <ShippingLogo
            src="/src/assets/images/logos/dhl.png"
            alt="DHL"
            style={{ width: '93px', height: '14px' }}
          />
        </ShippingInfo>
      </ShippingOption>
    </RadioGroup.Root>
  </StepContainer>
)
