import { useMediaQuery } from '@hooks/useMediaQuery'
import { BillingInfoSection } from './BillingInfo'
import PaymentMethodWithErrorBoundary from './PaymentMethod'
import { MobileCheckoutAccordion } from './MobileCheckoutAccordion'
import { useCheckoutStore } from '@stores/checkoutStore'
import { useFormContext } from 'react-hook-form'
import {
  CheckoutContainer,
  CheckoutGrid,
  StepDescription,
  StepHeader,
  StepIndicator,
  StepTitle,
} from '../CheckoutStyle'
import { ShippingMethodSection } from './ShippingMethod'
import AdditionalInfoSection from './AdditionalInfo'
import ConfirmationSection from './Confirmation'
import { useEffect, useState, type FormEvent, type RefObject } from 'react'
import { Form } from '@radix-ui/react-form'
import SecurityNoticeSection from './SecurityNotice'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import FormErrorSummary from './FormErrorSummary'
import OrderSummaryWithErrorBoundary from './OrderSummary'
import ThankYouModalWithErrorBoundary from './ThankyouModal'
const CheckoutContent = ({
  orderDetailsRef,
  onSubmit,
  onCheckoutSuccess,
}: {
  orderDetailsRef: RefObject<HTMLDivElement | null>
  onSubmit: (e: FormEvent) => void
  onCheckoutSuccess?: () => void
}) => {
  const [showThankYou, setShowThankYou] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const { currentStep, setCurrentStep } = useCheckoutStore()

  const { formState } = useFormContext()
  const { isSubmitted: formIsSubmitted, errors } = formState

  useEffect(() => {
    if (formIsSubmitted) {
      setIsFormSubmitted(true)
    }
  }, [formIsSubmitted])

  const handleSubmit = (e: FormEvent) => {
    setIsFormSubmitted(true) // Mark form as submitted
    onSubmit(e) // Call the original submit handler
  }

  const handleCheckoutSuccess = () => {
    setShowThankYou(true)

    if (onCheckoutSuccess) {
      onCheckoutSuccess()
    }
  }

  const checkoutSteps = [
    {
      id: 'billing',
      title: 'Billing Info',
      stepNumber: 'Step 1 of 5',
      description: 'Please enter your billing info',
      isComplete: formState.dirtyFields?.billing,
      content: <BillingInfoSection />,
    },
    {
      id: 'shipping',
      title: 'Shipping Method',
      stepNumber: 'Step 2 of 5',
      description: 'Choose your shipping method',
      isComplete: formState.dirtyFields?.shipping,
      content: <ShippingMethodSection />,
    },
    {
      id: 'payment',
      title: 'Payment Method',
      stepNumber: 'Step 3 of 5',
      description: 'Please enter your payment method',
      isComplete: formState.dirtyFields?.payment,
      content: <PaymentMethodWithErrorBoundary />,
    },
    {
      id: 'additional',
      title: 'Additional Info',
      stepNumber: 'Step 4 of 5',
      description: 'Need something else? We will make it for you!',
      isComplete: formState.dirtyFields?.additional,
      content: <AdditionalInfoSection />,
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      stepNumber: 'Step 5 of 5',
      description:
        'We are getting to the end. Just few clicks and your order is ready!',
      isComplete: formState.dirtyFields?.confirmation,
      content: <ConfirmationSection onSuccess={handleCheckoutSuccess} />,
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
            {isFormSubmitted && Object.keys(errors).length > 0 && (
              <FormErrorSummary />
            )}

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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <StepDescription>{step.description}</StepDescription>
                      <StepIndicator>{step.stepNumber}</StepIndicator>
                    </div>
                  </StepHeader>
                  {step.content}
                </div>
              ))
            )}
            <SecurityNoticeSection />
          </div>

          <OrderSummaryWithErrorBoundary />
        </CheckoutGrid>
      </Form>

      {showThankYou && (
        <ThankYouModalWithErrorBoundary
          open={showThankYou}
          onClose={() => {
            setShowThankYou(false)
          }}
          orderDetailsRef={orderDetailsRef}
        />
      )}
    </CheckoutContainer>
  )
}
export default CheckoutContent
