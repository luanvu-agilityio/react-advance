import {
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import * as Form from '@radix-ui/react-form'
import { useCartSummary } from '@hooks/useCartSummary'
import { CheckoutGrid, CheckoutContainer } from './CheckoutStyle'
import { BillingInfoSection } from './sections/BillingInfoSection'
import { ShippingMethodSection } from './sections/ShippingMethodSection'
import PaymentMethodSection from './sections/PaymentMethodSection'
import AdditionalInfoSection from './sections/AdditionalInfoSection'
import ConfirmationSection from './sections/ConfirmationSection'
import SecurityNoticeSection from './sections/SecurityNoticeSection'
import OrderSummarySection from './sections/OrderSummary'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import ThankYouModal from './sections/ThankyouModal'
import { MobileCheckoutAccordion } from './sections/MobileCheckoutAccordion'
import { validateField } from '@utils/validateField'
import type { FormErrors, FormValues } from 'types/FormError'
import {
  StepContainer,
  StepDescription,
  StepHeader,
  StepIndicator,
  StepTitle,
} from './CheckoutStyle'

// Main Component
const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState('fedex')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [sameAddressChecked, setSameAddressChecked] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [termsConsent, setTermsConsent] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    notes: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvc: '',
  })
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const orderDetailsRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState('billing')
  const [isMobile] = useMediaQuery(['(max-width: 1023px)'])
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const {
    items,
    subtotal,
    tax,
    shipping,
    total,
    handleQuantityChange,
    handleUnitChange,
    handleRemove,
  } = useCartSummary(shippingMethod)

  // Memoize the input change handler
  const handleInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    []
  )

  // Memoize the blur handler
  const handleBlur = useCallback(
    (
      e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target
      const error = validateField(name, value)
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    },
    []
  )

  const handleApplyPromo = useCallback(() => {
    if (promoCode) {
      console.log(`Applied promo code: ${promoCode}`)
    }
  }, [promoCode])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    setShowThankYouModal(true)
  }, [])

  // Memoize the checkout steps to prevent unnecessary re-renders
  const checkoutSteps = useCallback(
    () => [
      {
        id: 'billing',
        title: 'Billing Info',
        stepNumber: 'Step 1 of 5',
        description: 'Please enter your billing info',
        isComplete: false,
        content: (
          <BillingInfoSection
            sameAddressChecked={sameAddressChecked}
            setSameAddressChecked={setSameAddressChecked}
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        ),
      },
      {
        id: 'shipping',
        title: 'Shipping Method',
        stepNumber: 'Step 2 of 5',
        description: 'Choose your shipping method',
        isComplete: false,
        content: (
          <ShippingMethodSection
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        ),
      },
      {
        id: 'payment',
        title: 'Payment Method',
        stepNumber: 'Step 3 of 5',
        description: 'Please enter your payment method',
        isComplete: false,
        content: (
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        ),
      },
      {
        id: 'additional',
        title: 'Additional Info',
        stepNumber: 'Step 4 of 5',
        description: 'Need something else? We will make it for you!',
        isComplete: false,
        content: (
          <AdditionalInfoSection
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
        ),
      },
      {
        id: 'confirmation',
        title: 'Confirmation',
        stepNumber: 'Step 5 of 5',
        description:
          'We are getting to the end. Just few clicks and your order is ready!',
        isComplete: false,
        content: (
          <ConfirmationSection
            marketingConsent={marketingConsent}
            setMarketingConsent={setMarketingConsent}
            termsConsent={termsConsent}
            setTermsConsent={setTermsConsent}
          />
        ),
      },
    ],
    [
      sameAddressChecked,
      setSameAddressChecked,
      formValues,
      formErrors,
      handleInputChange,
      handleBlur,
      shippingMethod,
      setShippingMethod,
      paymentMethod,
      setPaymentMethod,
      marketingConsent,
      setMarketingConsent,
      termsConsent,
      setTermsConsent,
    ]
  )

  const DesktopStepContent = ({
    step,
  }: {
    step: ReturnType<typeof checkoutSteps>[0]
  }) => (
    <StepContainer>
      <StepHeader>
        <div>
          <StepTitle>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </div>
        <StepIndicator>{step.stepNumber}</StepIndicator>
      </StepHeader>
      {step.content}
    </StepContainer>
  )

  const steps = checkoutSteps()

  return (
    <CheckoutContainer>
      <Breadcrumbs style={{ marginBottom: '32px' }} />

      <Form.Root onSubmit={handleSubmit}>
        <CheckoutGrid>
          {/* Left Column - Checkout Steps */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}
          >
            {isMobile ? (
              <MobileCheckoutAccordion
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            ) : (
              steps.map((step) => (
                <DesktopStepContent key={step.id} step={step} />
              ))
            )}
            <SecurityNoticeSection />
          </div>

          {/* Right Column - Order Summary */}
          <div ref={orderDetailsRef}>
            <OrderSummarySection
              items={items}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              handleApplyPromo={handleApplyPromo}
              handleQuantityChange={handleQuantityChange}
              handleUnitChange={handleUnitChange}
              handleRemove={handleRemove}
            />
          </div>
        </CheckoutGrid>
      </Form.Root>
      <ThankYouModal
        open={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        orderDetailsRef={orderDetailsRef}
        customerData={{
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          address: formValues.address,
          city: formValues.city,
          state: formValues.country,
          zipCode: formValues.zip,
          shippingMethod: shippingMethod,
          paymentMethod: paymentMethod,
          items: items.map((item) => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total,
        }}
      />
    </CheckoutContainer>
  )
}

export default CheckoutPage
