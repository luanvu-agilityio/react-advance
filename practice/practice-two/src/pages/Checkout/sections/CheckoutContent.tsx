import { useMediaQuery } from '@chakra-ui/react'
import { useCheckout } from '@contexts/CheckoutContext'
import { BillingInfoSection } from './BillingInfoSection'
import { PaymentMethodSection } from './PaymentMethodSection'
import { MobileCheckoutAccordion } from './MobileCheckoutAccordion'

import {
  CheckoutContainer,
  CheckoutGrid,
  StepHeader,
  StepIndicator,
  StepTitle,
} from '../CheckoutStyle'
import OrderSummarySection from './OrderSummary'
import { ShippingMethodSection } from './ShippingMethodSection'
import AdditionalInfoSection from './AdditionalInfoSection'
import ConfirmationSection from './ConfirmationSection'
import ThankYouModal from './ThankyouModal'
import { useRef, useState, type FormEvent } from 'react'
import { Form } from '@radix-ui/react-form'
import SecurityNoticeSection from './SecurityNoticeSection'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'

const CheckoutContent = () => {
  const [showThankYou, setShowThankYou] = useState(false)
  const orderDetailsRef = useRef<HTMLDivElement>(null)
  const [isMobile] = useMediaQuery(['(max-width: 1023px)'])
  const {
    currentStep,
    setCurrentStep,
    submitForm: submitCheckoutForm,
  } = useCheckout()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const success = await submitCheckoutForm()

    if (success) {
      setShowThankYou(true)
    }
  }

  const checkoutSteps = [
    {
      id: 'billing',
      title: 'Billing Info',
      stepNumber: 'Step 1 of 5',
      description: 'Please enter your billing info',
      isComplete: false,
      content: <BillingInfoSection />,
    },
    {
      id: 'shipping',
      title: 'Shipping Method',
      stepNumber: 'Step 2 of 5',
      description: 'Choose your shipping method',
      isComplete: false,
      content: <ShippingMethodSection />,
    },
    {
      id: 'payment',
      title: 'Payment Method',
      stepNumber: 'Step 3 of 5',
      description: 'Please enter your payment method',
      isComplete: false,
      content: <PaymentMethodSection />,
    },
    {
      id: 'additional',
      title: 'Additional Info',
      stepNumber: 'Step 4 of 5',
      description: 'Need something else? We will make it for you!',
      isComplete: false,
      content: <AdditionalInfoSection />,
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      stepNumber: 'Step 5 of 5',
      description:
        'We are getting to the end. Just few clicks and your order is ready!',
      isComplete: false,
      content: <ConfirmationSection />,
    },
  ]

  return (
    <CheckoutContainer>
      <Breadcrumbs />

      <Form onSubmit={handleSubmit}>
        <CheckoutGrid>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}
          >
            {isMobile ? (
              <MobileCheckoutAccordion
                steps={checkoutSteps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            ) : (
              checkoutSteps.map((step) => (
                <div key={step.id}>
                  <StepHeader>
                    <StepTitle>{step.title}</StepTitle>
                    <StepIndicator>{step.stepNumber}</StepIndicator>
                  </StepHeader>
                  {step.content}
                </div>
              ))
            )}
            <SecurityNoticeSection />
          </div>

          <OrderSummarySection />
        </CheckoutGrid>
      </Form>

      <ThankYouModal
        open={showThankYou}
        onClose={() => setShowThankYou(false)}
        orderDetailsRef={orderDetailsRef}
      />
    </CheckoutContainer>
  )
}

export default CheckoutContent
