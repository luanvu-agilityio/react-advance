import { useCallback, useMemo, useEffect, type CSSProperties } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useFormContext, Controller } from 'react-hook-form'
import { usePaymentMethodMutation } from '@hooks/useCheckoutQuery'
import {
  StepContainer,
  FormField,
  FormLabel,
  FormInput,
  RadioCircle,
  PaymentMethodOption,
  PaymentDetails,
  PaymentLabel,
  PaymentLogoContainer,
  PaymentLogo,
  CardDetailsContainer,
  CardDetailsGrid,
} from '../CheckoutStyle'

import FormError from '@components/common/FormError/FormError'
import { formatCardField } from '@utils/validateField'
import type { CheckoutFormData } from 'types/checkout'
import { ValidationMessage } from '@config/validation/validation-message'
import { withErrorBoundary } from '@utils/withErrorBoundary'

// Payment method configuration type
interface PaymentMethod {
  id: string
  label: string
  value: string
  logoSrc: string
  logoAlt: string
  logoWidth: string
  logoHeight: string
}

// Card field configuration type
interface CardField {
  name: 'cardNumber' | 'cardHolder' | 'expirationDate' | 'cvc'
  label: string
  placeholder: string
  maxLength?: number
  containerStyle?: CSSProperties
}

export const PaymentMethodSection = () => {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
    clearErrors,
  } = useFormContext<CheckoutFormData>()
  const paymentMethodMutation = usePaymentMethodMutation()

  const paymentMethod = watch('payment.method')

  // Payment methods configuration
  const paymentMethods = useMemo<PaymentMethod[]>(
    () => [
      {
        id: 'credit-card',
        value: 'credit-card',
        label: 'Credit card',
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372462/visa_tgrif0.png',
        logoAlt: 'Visa',
        logoWidth: '94px',
        logoHeight: '20px',
      },
      {
        id: 'paypal',
        value: 'paypal',
        label: 'PayPal',
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372462/paypal_rzq1bo.png',
        logoAlt: 'PayPal',
        logoWidth: '76px',
        logoHeight: '18px',
      },
      {
        id: 'bitcoin',
        value: 'bitcoin',
        label: 'Bitcoin',
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372461/bitcoin_cjqd4a.png',
        logoAlt: 'Bitcoin',
        logoWidth: '75px',
        logoHeight: '16px',
      },
    ],
    []
  )

  // Credit card fields configuration
  const cardFields: CardField[] = [
    {
      name: 'cardNumber',
      label: 'Card number',
      placeholder: '1234 5678 9012 3456',
      maxLength: 19, // 16 digits + 3 spaces
    },
    {
      name: 'cardHolder',
      label: 'Card holder',
      placeholder: 'Alex',
      containerStyle: { flex: 1 },
    },
    {
      name: 'expirationDate',
      label: 'Expiration date',
      placeholder: 'MM/YY',
      maxLength: 5, // MM/YY format
    },
    {
      name: 'cvc',
      label: 'CVC',
      placeholder: '123',
      maxLength: 4,
    },
  ]

  // Validate card fields when payment method changes or component mounts
  useEffect(() => {
    if (paymentMethod === 'credit-card') {
      trigger([
        'payment.cardNumber',
        'payment.cardHolder',
        'payment.expirationDate',
        'payment.cvc',
      ])
    }
  }, [paymentMethod, trigger])

  // Handle payment method selection
  const handleMethodChange = useCallback(
    (method: 'credit-card' | 'paypal' | 'bitcoin') => {
      // Call mutation - it handles state updates and notifications
      paymentMethodMutation.mutate(method)

      // Update React Hook Form state
      setValue('payment.method', method)

      if (method === 'credit-card') {
        // Initialize empty values
        if (!watch('payment.cardNumber')) setValue('payment.cardNumber', '')
        if (!watch('payment.cardHolder')) setValue('payment.cardHolder', '')
        if (!watch('payment.expirationDate'))
          setValue('payment.expirationDate', '')
        if (!watch('payment.cvc')) setValue('payment.cvc', '')

        // Increased timeout to ensure DOM updates
        setTimeout(() => {
          trigger([
            'payment.cardNumber',
            'payment.cardHolder',
            'payment.expirationDate',
            'payment.cvc',
          ])
        }, 200)
      } else {
        clearErrors([
          'payment.cardNumber',
          'payment.cardHolder',
          'payment.expirationDate',
          'payment.cvc',
        ])
      }
    },
    [setValue, paymentMethodMutation, watch, trigger, clearErrors]
  )

  // Render a card field based on its configuration
  const renderCardField = (field: CardField) => {
    return (
      <FormField
        key={field.name}
        name={`payment.${field.name}`}
        style={field.containerStyle}
      >
        <FormLabel>{field.label}</FormLabel>
        <Controller
          name={`payment.${field.name}`}
          rules={{
            required:
              paymentMethod === 'credit-card'
                ? `${field.label} is required`
                : false,
            validate: (value) => {
              if (paymentMethod !== 'credit-card') return true

              switch (field.name) {
                case 'cardNumber':
                  return (
                    value?.replace(/\s/g, '').length === 16 ||
                    ValidationMessage.CARD.NUMBER
                  )
                case 'cardHolder':
                  return value?.length >= 3 || ValidationMessage.CARD.NAME
                case 'expirationDate':
                  return (
                    /^\d{2}\/\d{2}$/.test(value || '') ||
                    ValidationMessage.CARD.EXPIRY
                  )
                case 'cvc':
                  return (
                    /^\d{3,4}$/.test(value || '') || ValidationMessage.CARD.CVC
                  )
                default:
                  return true
              }
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput
              ref={ref}
              type="text"
              placeholder={field.placeholder}
              value={value || ''}
              onChange={(e) => {
                // Format input and update form
                const formattedValue = formatCardField(
                  field.name,
                  e.target.value
                )
                onChange(formattedValue)
              }}
              onBlur={() => {
                onBlur()
                // Manually trigger validation on blur
                trigger(`payment.${field.name}`)
              }}
              maxLength={field.maxLength}
              disabled={paymentMethod !== 'credit-card'}
              $hasError={!!errors.payment?.[field.name]}
            />
          )}
        />
        {errors.payment?.[field.name] && (
          <FormError
            message={
              (errors.payment[field.name]?.message as string) || 'Invalid value'
            }
            style={{ marginTop: '4px', color: 'var(--error-color, #e53935)' }}
          />
        )}
      </FormField>
    )
  }

  return (
    <StepContainer>
      <Controller
        name="payment.method"
        rules={{ required: 'Payment method is required' }}
        render={({ field }) => (
          <RadioGroup.Root
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              handleMethodChange(value as 'credit-card' | 'paypal' | 'bitcoin')
            }}
          >
            {paymentMethods.map((method) => (
              <PaymentMethodOption
                key={method.id}
                htmlFor={method.id}
                data-state={field.value === method.value ? 'checked' : ''}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <PaymentDetails>
                    <RadioGroup.Item
                      value={method.value}
                      id={method.id}
                      style={{ display: 'none' }}
                    />
                    <RadioCircle />
                    <PaymentLabel>{method.label}</PaymentLabel>
                  </PaymentDetails>
                  <PaymentLogoContainer>
                    <PaymentLogo
                      src={method.logoSrc}
                      alt={method.logoAlt}
                      style={{
                        width: method.logoWidth,
                        height: method.logoHeight,
                      }}
                    />
                  </PaymentLogoContainer>
                </div>

                {/* Render credit card form when credit card is selected */}
                {method.id === 'credit-card' &&
                  field.value === 'credit-card' && (
                    <CardDetailsContainer>
                      {/* Card number field */}
                      {renderCardField(cardFields[0])}

                      <CardDetailsGrid>
                        {/* Card holder field */}
                        {renderCardField(cardFields[1])}

                        <div
                          style={{
                            display: 'flex',
                            gap: '16px',
                            width: '256px',
                          }}
                        >
                          {/* Expiration date field */}
                          {renderCardField(cardFields[2])}

                          {/* CVC field */}
                          {renderCardField(cardFields[3])}
                        </div>
                      </CardDetailsGrid>
                    </CardDetailsContainer>
                  )}
              </PaymentMethodOption>
            ))}
          </RadioGroup.Root>
        )}
      />

      {/* Show error if payment method is not selected */}
      {errors.payment?.method && (
        <FormError
          message={errors.payment.method.message as string}
          style={{ marginTop: '8px' }}
        />
      )}
    </StepContainer>
  )
}

const PaymentMethodWithErrorBoundary = withErrorBoundary(PaymentMethodSection, {
  fallback: (
    <div className="payment-error">
      <h3>Payment selection unavailable</h3>
      <p>Please try refreshing the page or contact support.</p>
    </div>
  ),
})

export default PaymentMethodWithErrorBoundary
