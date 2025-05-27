import { memo, useCallback } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

import {
  StepContainer,
  FormField,
  FormLabel,
  FormInput,
  FormMessage,
  RadioCircle,
  PaymentMethodOption,
  PaymentDetails,
  PaymentLabel,
  PaymentLogoContainer,
  PaymentLogo,
  CardDetailsContainer,
  CardDetailsGrid,
} from '../CheckoutStyle'

import { useFormSection } from '@hooks/useForm'
import FormError from '../components/FormError'
import { useCheckout } from '@contexts/CheckoutContext'

interface PaymentMethodSectionProps {
  paymentMethod: string
  setPaymentMethod: (value: string) => void
}

export const PaymentMethodSection = memo(
  ({ paymentMethod, setPaymentMethod }: PaymentMethodSectionProps) => {
    const { updatePaymentInfo } = useCheckout()

    const { formValues, formErrors, handleInputChange, handleBlur } =
      useFormSection(
        {
          cardNumber: '',
          cardHolder: '',
          expirationDate: '',
          cvc: '',
        },
        updatePaymentInfo
      )

    const handlePaymentMethodChange = useCallback(
      (value: string) => {
        setPaymentMethod(value)
        if (value === 'credit-card') {
          // Use existing form values if available
          updatePaymentInfo({
            paymentMethod: value,
            ...formValues,
          })
        } else {
          // For other payment methods, just update the method
          updatePaymentInfo({
            paymentMethod: value,
            cardNumber: '',
            cardHolder: '',
            expirationDate: '',
            cvc: '',
          })
        }
      },
      [setPaymentMethod, updatePaymentInfo, formValues]
    )

    return (
      <StepContainer>
        <RadioGroup.Root
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
        >
          <PaymentMethodOption
            htmlFor="credit-card"
            data-state={paymentMethod === 'credit-card' ? 'checked' : ''}
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
                  value="credit-card"
                  id="credit-card"
                  style={{ display: 'none' }}
                />
                <RadioCircle />
                <PaymentLabel>Credit card</PaymentLabel>
              </PaymentDetails>
              <PaymentLogoContainer>
                <PaymentLogo
                  src="/src/assets/images/payments/visa.png"
                  alt="Visa"
                  style={{ width: '94px', height: '20px' }}
                />
              </PaymentLogoContainer>
            </div>

            {paymentMethod === 'credit-card' && (
              <CardDetailsContainer>
                <FormField
                  name="cardNumber"
                  className={formErrors.cardNumber ? 'error-field' : ''}
                >
                  <FormLabel>Card number</FormLabel>
                  <FormInput
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formValues.cardNumber ?? ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    maxLength={19} // 16 digits + 3 spaces
                    required
                  />
                  {formErrors.cardNumber && (
                    <FormError message={formErrors.cardNumber} />
                  )}
                </FormField>

                <CardDetailsGrid>
                  <FormField
                    name="cardHolder"
                    style={{ flex: 1 }}
                    className={formErrors.cardHolder ? 'error-field' : ''}
                  >
                    <FormLabel>Card holder</FormLabel>
                    <FormInput
                      type="text"
                      name="cardHolder"
                      placeholder="Card holder"
                      value={formValues.cardHolder ?? ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {formErrors.cardNumber && (
                      <FormError message={formErrors.cardNumber} />
                    )}
                  </FormField>
                  <div style={{ display: 'flex', gap: '16px', width: '256px' }}>
                    <FormField
                      name="expirationDate"
                      className={formErrors.expirationDate ? 'error-field' : ''}
                    >
                      <FormLabel>Expiration date</FormLabel>
                      <FormInput
                        type="text"
                        name="expirationDate"
                        placeholder="MM/YY"
                        value={formValues.expirationDate ?? ''}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        maxLength={5} // MM/YY format
                        required
                      />
                      {formErrors.expirationDate && (
                        <div
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '4px',
                          }}
                        >
                          {formErrors.expirationDate}
                        </div>
                      )}
                      <FormMessage match="valueMissing">
                        Please enter expiration date
                      </FormMessage>
                    </FormField>

                    <FormField
                      name="cvc"
                      className={formErrors.cvc ? 'error-field' : ''}
                    >
                      <FormLabel>CVC</FormLabel>
                      <FormInput
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={formValues.cvc ?? ''}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        required
                      />
                      {formErrors.cardNumber && (
                        <FormError message={formErrors.cardNumber} />
                      )}
                    </FormField>
                  </div>
                </CardDetailsGrid>
              </CardDetailsContainer>
            )}
          </PaymentMethodOption>

          <PaymentMethodOption
            htmlFor="paypal"
            data-state={paymentMethod === 'paypal' ? 'checked' : ''}
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
                  value="paypal"
                  id="paypal"
                  style={{ display: 'none' }}
                />
                <RadioCircle />
                <PaymentLabel>PayPal</PaymentLabel>
              </PaymentDetails>
              <PaymentLogo
                src="/src/assets/images/payments/paypal.png"
                alt="PayPal"
                style={{ width: '76px', height: '18px' }}
              />
            </div>
          </PaymentMethodOption>

          <PaymentMethodOption
            htmlFor="bitcoin"
            data-state={paymentMethod === 'bitcoin' ? 'checked' : ''}
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
                  value="bitcoin"
                  id="bitcoin"
                  style={{ display: 'none' }}
                />
                <RadioCircle />
                <PaymentLabel>Bitcoin</PaymentLabel>
              </PaymentDetails>
              <PaymentLogo
                src="/src/assets/images/payments/bitcoin.png"
                alt="Bitcoin"
                style={{ width: '75px', height: '16px' }}
              />
            </div>
          </PaymentMethodOption>
        </RadioGroup.Root>
      </StepContainer>
    )
  }
)

export default PaymentMethodSection
