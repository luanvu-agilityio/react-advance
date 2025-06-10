import { useMediaQuery } from '@chakra-ui/react'
<<<<<<< HEAD
import { BillingInfoSection } from './BillingInfo'
import PaymentMethodWithErrorBoundary from './PaymentMethod'
import { MobileCheckoutAccordion } from './MobileCheckoutAccordion'
import { useCheckoutStore } from '@stores/checkoutStore'
import { useFormContext } from 'react-hook-form'
import {
  CheckoutContainer,
  CheckoutGrid,
  StepDescription,
=======
import { useCheckout } from '@contexts/CheckoutContext'
import { BillingInfoSection } from './BillingInfoSection'
import { PaymentMethodSection } from './PaymentMethodSection'
import { MobileCheckoutAccordion } from './MobileCheckoutAccordion'

import {
  CheckoutContainer,
  CheckoutGrid,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  StepHeader,
  StepIndicator,
  StepTitle,
} from '../CheckoutStyle'
<<<<<<< HEAD
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
  const [isMobile] = useMediaQuery(['(max-width: 1023px)'])
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
    console.log('handleCheckoutSuccess called')
    setShowThankYou(true)
    console.log('showThankYou set to true:', true)

    if (onCheckoutSuccess) {
      onCheckoutSuccess()
    }
  }

=======
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

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  const checkoutSteps = [
    {
      id: 'billing',
      title: 'Billing Info',
      stepNumber: 'Step 1 of 5',
      description: 'Please enter your billing info',
<<<<<<< HEAD
      isComplete: formState.dirtyFields?.billing,
=======
      isComplete: false,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      content: <BillingInfoSection />,
    },
    {
      id: 'shipping',
      title: 'Shipping Method',
      stepNumber: 'Step 2 of 5',
      description: 'Choose your shipping method',
<<<<<<< HEAD
      isComplete: formState.dirtyFields?.shipping,
=======
      isComplete: false,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      content: <ShippingMethodSection />,
    },
    {
      id: 'payment',
      title: 'Payment Method',
      stepNumber: 'Step 3 of 5',
      description: 'Please enter your payment method',
<<<<<<< HEAD
      isComplete: formState.dirtyFields?.payment,
      content: <PaymentMethodWithErrorBoundary />,
=======
      isComplete: false,
      content: <PaymentMethodSection />,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    },
    {
      id: 'additional',
      title: 'Additional Info',
      stepNumber: 'Step 4 of 5',
      description: 'Need something else? We will make it for you!',
<<<<<<< HEAD
      isComplete: formState.dirtyFields?.additional,
=======
      isComplete: false,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      content: <AdditionalInfoSection />,
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      stepNumber: 'Step 5 of 5',
      description:
        'We are getting to the end. Just few clicks and your order is ready!',
<<<<<<< HEAD
      isComplete: formState.dirtyFields?.confirmation,
      content: <ConfirmationSection onSuccess={handleCheckoutSuccess} />,
=======
      isComplete: false,
      content: <ConfirmationSection />,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
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
=======
                    <StepIndicator>{step.stepNumber}</StepIndicator>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
                  </StepHeader>
                  {step.content}
                </div>
              ))
            )}
            <SecurityNoticeSection />
          </div>

<<<<<<< HEAD
          <OrderSummaryWithErrorBoundary />
        </CheckoutGrid>
      </Form>

      {showThankYou && (
        <ThankYouModalWithErrorBoundary
          open={showThankYou}
          onClose={() => {
            console.log('Modal onClose called')
            setShowThankYou(false)
          }}
          orderDetailsRef={orderDetailsRef}
        />
      )}
=======
          <OrderSummarySection />
        </CheckoutGrid>
      </Form>

      <ThankYouModal
        open={showThankYou}
        onClose={() => setShowThankYou(false)}
        orderDetailsRef={orderDetailsRef}
      />
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    </CheckoutContainer>
  )
}
export default CheckoutContent
