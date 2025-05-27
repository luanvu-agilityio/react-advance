import { useCheckout } from '@contexts/CheckoutContext'
import { useCartSummary } from '@hooks/useCartSummary'
import { useCallback, useMemo, useRef, type FormEvent } from 'react'
import * as Form from '@radix-ui/react-form'
import {
  StepContainer,
  StepDescription,
  StepHeader,
  StepIndicator,
  StepTitle,
  CheckoutGrid,
  CheckoutContainer,
} from '../CheckoutStyle'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import ThankYouModalWrapper from './ThankYouModalWrapper'
import { MobileCheckoutAccordion } from './MobileCheckoutAccordion'
import SecurityNoticeSection from './SecurityNoticeSection'
import OrderSummarySection from './OrderSummary'
import PaymentMethodSection from './PaymentMethodSection'
import AdditionalInfoSection from './AdditionalInfoSection'
import { ShippingMethodSection } from './ShippingMethodSection'
import ConfirmationSection from './ConfirmationSection'
import { BillingInfoSection, type BillingInfoRef } from './BillingInfoSection'

interface CheckoutContentProps {
  sameAddressChecked: boolean
  setSameAddressChecked: (checked: boolean) => void
  promoCode: string
  setPromoCode: (code: string) => void
  isMobile: boolean
}

const CheckoutContent = ({
  sameAddressChecked,
  setSameAddressChecked,
  promoCode,
  setPromoCode,
  isMobile,
}: CheckoutContentProps) => {
  const billingInfoRef = useRef<BillingInfoRef>(null)
  const {
    shippingMethod,
    paymentMethod,
    updatePaymentMethod,
    currentStep,
    setCurrentStep,
    showThankYouModal,
    setShowThankYouModal,
    orderDetailsRef,
  } = useCheckout()

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

  const billingStep = useMemo(
    () => (
      <BillingInfoSection
        ref={billingInfoRef}
        sameAddressChecked={sameAddressChecked}
        setSameAddressChecked={setSameAddressChecked}
      />
    ),
    [sameAddressChecked, setSameAddressChecked]
  )

  const shippingStep = useMemo(() => <ShippingMethodSection />, [])

  const paymentStep = useMemo(
    () => (
      <PaymentMethodSection
        paymentMethod={paymentMethod}
        setPaymentMethod={updatePaymentMethod}
      />
    ),
    [paymentMethod, updatePaymentMethod]
  )

  const additionalStep = useMemo(() => <AdditionalInfoSection />, [])

  const confirmationStep = useMemo(() => <ConfirmationSection />, [])

  const checkoutSteps = useMemo(
    () => [
      {
        id: 'billing',
        title: 'Billing Info',
        stepNumber: 'Step 1 of 5',
        description: 'Please enter your billing info',
        isComplete: false,
        content: billingStep,
      },
      {
        id: 'shipping',
        title: 'Shipping Method',
        stepNumber: 'Step 2 of 5',
        description: 'Choose your shipping method',
        isComplete: false,
        content: shippingStep,
      },
      {
        id: 'payment',
        title: 'Payment Method',
        stepNumber: 'Step 3 of 5',
        description: 'Please enter your payment method',
        isComplete: false,
        content: paymentStep,
      },
      {
        id: 'additional',
        title: 'Additional Info',
        stepNumber: 'Step 4 of 5',
        description: 'Need something else? We will make it for you!',
        isComplete: false,
        content: additionalStep,
      },
      {
        id: 'confirmation',
        title: 'Confirmation',
        stepNumber: 'Step 5 of 5',
        description:
          'We are getting to the end. Just few clicks and your order is ready!',
        isComplete: false,
        content: confirmationStep,
      },
    ],
    [billingStep, shippingStep, paymentStep, additionalStep, confirmationStep]
  )

  const handleApplyPromo = useCallback(() => {
    if (promoCode) {
      console.log(`Applied promo code: ${promoCode}`)
    }
  }, [promoCode])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (billingInfoRef.current) {
        billingInfoRef.current.getFormData()
      }

      setShowThankYouModal(true)
    },
    [setShowThankYouModal]
  )

  const DesktopStepContent = ({
    step,
  }: {
    step: (typeof checkoutSteps)[number]
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

  const steps = checkoutSteps

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
      <ThankYouModalWrapper
        open={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        orderDetailsRef={orderDetailsRef}
        paymentMethod={paymentMethod}
        items={items}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
      />
    </CheckoutContainer>
  )
}

export default CheckoutContent
