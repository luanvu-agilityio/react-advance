import { useCallback, type ChangeEvent, type FocusEvent } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

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

import FormError from '../../../components/common/FormError/FormError'
import { useCheckout } from '@contexts/CheckoutContext'
import { formatCardField, validateField } from '@utils/validateField'

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
  containerStyle?: React.CSSProperties
}

export const PaymentMethodSection = () => {
  const { formData, errors, updateField, setFieldError, clearFieldError } =
    useCheckout()

  const paymentData = formData.payment

  // Payment methods configuration
  const paymentMethods: PaymentMethod[] = [
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
  ]

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
      placeholder: 'John Doe',
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

  // Handle payment method selection
  const handleMethodChange = useCallback(
    (method: 'credit-card' | 'paypal' | 'bitcoin') => {
      updateField('payment', 'method', method)

      // Clear card-related errors when switching away from credit card
      if (method !== 'credit-card') {
        clearFieldError('payment.cardNumber')
        clearFieldError('payment.cardHolder')
        clearFieldError('payment.expirationDate')
        clearFieldError('payment.cvc')
      }
    },
    [updateField, clearFieldError]
  )

  // Handle input changes for card details
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      // Use the formatting utility to handle field-specific formatting
      const formattedValue = formatCardField(name, value)

      updateField('payment', name as keyof typeof paymentData, formattedValue)
      clearFieldError(`payment.${name}`)
    },
    [updateField, clearFieldError]
  )

  // Handle field validation on blur
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      const fieldKey = `payment.${name}`

      // Validate required fields
      if (!value.trim()) {
        setFieldError(fieldKey, `${name} is required`)
        return
      }

      const errorMessage = validateField(name, value)
      if (errorMessage) {
        setFieldError(fieldKey, errorMessage)
      }
    },
    [setFieldError]
  )

  // Render a card field based on its configuration
  const renderCardField = (field: CardField) => {
    const errorKey = `payment.${field.name}`

    return (
      <FormField
        key={field.name}
        name={field.name}
        style={field.containerStyle}
        className={errors[errorKey] ? 'error-field' : ''}
      >
        <FormLabel>{field.label}</FormLabel>
        <FormInput
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={paymentData[field.name] || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={field.maxLength}
          required
        />
        {errors[errorKey] && <FormError message={errors[errorKey]} />}
      </FormField>
    )
  }

  // Render payment method option
  const renderPaymentMethod = (method: PaymentMethod) => (
    <PaymentMethodOption
      key={method.id}
      htmlFor={method.id}
      data-state={paymentData.method === method.value ? 'checked' : ''}
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
      {method.id === 'credit-card' && paymentData.method === 'credit-card' && (
        <CardDetailsContainer>
          {/* Card number field */}
          {renderCardField(cardFields[0])}

          <CardDetailsGrid>
            {/* Card holder field */}
            {renderCardField(cardFields[1])}

            <div style={{ display: 'flex', gap: '16px', width: '256px' }}>
              {/* Expiration date field */}
              {renderCardField(cardFields[2])}

              {/* CVC field */}
              {renderCardField(cardFields[3])}
            </div>
          </CardDetailsGrid>
        </CardDetailsContainer>
      )}
    </PaymentMethodOption>
  )

  return (
    <StepContainer>
      <RadioGroup.Root
        value={paymentData.method}
        onValueChange={handleMethodChange}
      >
        {paymentMethods.map(renderPaymentMethod)}
      </RadioGroup.Root>
    </StepContainer>
  )
}

PaymentMethodSection.displayName = 'PaymentMethodSection'

export default PaymentMethodSection
