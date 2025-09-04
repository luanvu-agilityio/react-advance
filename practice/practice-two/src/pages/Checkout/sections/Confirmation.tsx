'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { CheckIcon } from '@radix-ui/react-icons'
import { useEffect, type CSSProperties } from 'react'
import { useCartStore } from '@stores/cartStore'

import {
  StepContainer,
  CheckboxContainer,
  StyledCheckbox,
  StyledCheckboxIndicator,
  CheckboxLabel,
} from '../CheckoutStyle'
import SubmitButtonWithStatus from './SubmitButton'

interface ConsentOption {
  id: string
  name: 'additional.marketingConsent' | 'additional.termsConsent'
  label: string
  required?: boolean
  style?: CSSProperties
  validation?: {
    required?: string | boolean
    pattern?: { value: RegExp; message: string }
    minLength?: { value: number; message: string }
    maxLength?: { value: number; message: string }
  }
}

const ConfirmationSection = () => {
  const { control, trigger, watch } = useFormContext()

  const { items } = useCartStore()

  // Watch consent value to trigger validation when changed
  const termsConsent = watch('additional.termsConsent')

  // Trigger validation for terms consent when it changes
  useEffect(() => {
    if (termsConsent !== undefined) {
      trigger('additional.termsConsent')
    }
  }, [termsConsent, trigger])

  // Add cart items as hidden input for server action
  useEffect(() => {
    const cartInput = document.querySelector(
      'input[name="cart.items"]'
    ) as HTMLInputElement
    if (cartInput) {
      cartInput.value = JSON.stringify(items)
    }
  }, [items])

  // Configuration array for consent options
  const consentOptions: ConsentOption[] = [
    {
      id: 'marketing-consent',
      name: 'additional.marketingConsent',
      label:
        'Id like to receive promotional emails about special offers and discounts',
      required: false,
    },
    {
      id: 'terms-consent',
      name: 'additional.termsConsent',
      label: 'I agree with our terms and conditions and privacy policy.',
      required: true,
      validation: {
        required: 'You must accept the terms and conditions to proceed',
      },
    },
  ]

  // Render a single consent option
  const renderConsentOption = (option: ConsentOption) => (
    <CheckboxContainer className={option.id} key={option.id}>
      <Controller
        name={option.name}
        control={control}
        rules={option.validation}
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <StyledCheckbox
              id={option.id}
              checked={value === true}
              onCheckedChange={(checked) => {
                onChange(checked === true)
                // Trigger validation immediately after change for terms
                if (option.name === 'additional.termsConsent') {
                  setTimeout(() => trigger('additional.termsConsent'), 0)
                }
              }}
              onBlur={onBlur}
              required={option.required}
            >
              <StyledCheckboxIndicator>
                <CheckIcon />
              </StyledCheckboxIndicator>
            </StyledCheckbox>
            <CheckboxLabel htmlFor={option.id} style={option.style}>
              {option.label}
            </CheckboxLabel>

            {/* Hidden input for server action */}
            <input
              type="hidden"
              name={option.name}
              value={value ? 'true' : 'false'}
            />
          </>
        )}
      />
    </CheckboxContainer>
  )

  return (
    <StepContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {consentOptions.map(renderConsentOption)}

        {/* Hidden input for cart items */}
        <input type="hidden" name="cart.items" value="" />
      </div>

      {/* Simple submit button - no onClick needed */}
      <SubmitButtonWithStatus />
    </StepContainer>
  )
}

export default ConfirmationSection
