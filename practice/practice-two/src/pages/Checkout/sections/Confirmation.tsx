import { useFormContext, Controller } from 'react-hook-form'
import { CheckIcon } from '@radix-ui/react-icons'
import { useEffect, type CSSProperties, type FormEvent } from 'react'

import { useCartStore } from '@stores/cartStore'

import {
  StepContainer,
  CheckboxContainer,
  StyledCheckbox,
  StyledCheckboxIndicator,
  CheckboxLabel,
  SubmitButton,
} from '../CheckoutStyle'
import { useCheckoutStore } from '@stores/checkoutStore'

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

interface ConfirmationSectionProps {
  onSuccess?: () => void
}

const ConfirmationSection = ({ onSuccess }: ConfirmationSectionProps) => {
  const {
    formState: { isSubmitting, dirtyFields, isValid },
    control,
    trigger,
    watch,
    clearErrors,
    getValues,
  } = useFormContext()

  const { setFormData } = useCheckoutStore()

  const { items } = useCartStore()
  const isEmpty = items.length === 0

  // Watch consent value to trigger validation when changed
  const termsConsent = watch('additional.termsConsent')

  // Check if required sections are filled out
  const hasBillingInfo = !!dirtyFields.billing
  const hasShippingInfo = !!dirtyFields.shipping
  const hasPaymentInfo = !!dirtyFields.payment

  // Check if user has completed all required sections
  const hasCompletedRequiredSections =
    hasBillingInfo && hasShippingInfo && hasPaymentInfo

  // Trigger validation for terms consent when it changes
  useEffect(() => {
    if (termsConsent !== undefined) {
      trigger('additional.termsConsent')
    }
  }, [termsConsent, trigger])

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

  const handleSubmitSuccess = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Get shipping method and same-as-billing status
    const formValues = getValues()
    const sameAsBilling = watch('shipping.sameAsBilling')
    const paymentMethod = watch('payment.method')

    // Clear errors for hidden/conditional fields first
    if (sameAsBilling) {
      clearErrors([
        'shipping.address',
        'shipping.city',
        'shipping.zip',
        'shipping.country',
      ])
    }

    if (paymentMethod !== 'credit-card') {
      clearErrors([
        'payment.cardNumber',
        'payment.cardHolder',
        'payment.expirationDate',
        'payment.cvc',
      ])
    }

    // Trigger validation on all fields
    const requiredFields = [
      'billing.firstName',
      'billing.lastName',
      'billing.email',
      'billing.phone',
      'billing.address',
      'billing.city',
      'billing.country',
      'billing.zip',
      'shipping.method',
      'payment.method',
      'additional.termsConsent',
    ]

    // Add payment fields only if credit card is selected
    if (paymentMethod === 'credit-card') {
      requiredFields.push(
        'payment.cardNumber',
        'payment.cardHolder',
        'payment.expirationDate',
        'payment.cvc'
      )
    }

    // Add shipping address fields only if shipping to a different address
    if (!sameAsBilling) {
      requiredFields.push(
        'shipping.address',
        'shipping.city',
        'shipping.zip',
        'shipping.country'
      )
    }

    const isFormValid = await trigger(requiredFields, { shouldFocus: true })

    if (!isFormValid) {
      // Find first error and scroll to it
      const firstError = document.querySelector('.error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setFormData(formValues)

    if (onSuccess) {
      onSuccess()
      console.log('Form submitted successfully, modal should open')
      console.log('Submit conditions:', {
        isEmpty,
        hasCompletedRequiredSections,
        isValid,
        termsConsent,
      })
    }
  }

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
          </>
        )}
      />
    </CheckboxContainer>
  )

  return (
    <StepContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {consentOptions.map(renderConsentOption)}
      </div>

      <SubmitButton
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('Button clicked')
          handleSubmitSuccess(e)
        }}
      >
        {isSubmitting ? 'Processing...' : 'Complete order'}
      </SubmitButton>
    </StepContainer>
  )
}

export default ConfirmationSection
