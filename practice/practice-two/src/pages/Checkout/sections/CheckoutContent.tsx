'use client'

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
import {
  useActionState,
  useEffect,
  useState,
  useRef,
  type RefObject,
} from 'react'
import { Form } from '@radix-ui/react-form'
import SecurityNoticeSection from './SecurityNotice'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import OrderSummaryWithErrorBoundary from './OrderSummary'
import ThankYouModalWithErrorBoundary from './ThankyouModal'
import { submitOrderAction } from '../actions/submitOrderActions'
import type { OrderState } from 'types/Order'
import { useToast } from '@stores/toastStore'
import FormErrorSummary from './FormErrorSummary'

const CheckoutContent = ({
  orderDetailsRef,
  onCheckoutSuccess,
}: {
  orderDetailsRef: RefObject<HTMLDivElement | null>
  onCheckoutSuccess?: () => void
}) => {
  const [showThankYou, setShowThankYou] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [hasShownToast, setHasShownToast] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const { currentStep, setCurrentStep, setFormData } = useCheckoutStore()
  const { toast } = useToast()

  const { formState, watch, getValues } = useFormContext()
  const { isSubmitted: formIsSubmitted, errors } = formState

  const formData = watch()
  const formDataRef = useRef(formData)

  // React 19 server action with useActionState
  const [orderState, submitOrder] = useActionState(
    async (_state: OrderState | null, formData: FormData) => {
      setIsFormSubmitted(true)
      setHasShownToast(false)
      return await submitOrderAction(formData)
    },
    null
  )

  useEffect(() => {
    const hasFormDataChanged =
      JSON.stringify(formData) !== JSON.stringify(formDataRef.current)

    if (
      hasFormDataChanged &&
      orderState &&
      !orderState.success &&
      hasShownToast
    ) {
      setHasShownToast(false)
      setIsFormSubmitted(false)
    }

    formDataRef.current = formData
  }, [formData, orderState, hasShownToast])

  useEffect(() => {
    if (formIsSubmitted) {
      setIsFormSubmitted(true)
    }
  }, [formIsSubmitted])

  // Handle server action response
  useEffect(() => {
    if (orderState && !hasShownToast) {
      if (orderState.success) {
        const currentFormData = getValues()
        setFormData(currentFormData)
        setShowThankYou(true)
        setHasShownToast(true)

        if (onCheckoutSuccess) {
          onCheckoutSuccess()
        }

        toast({
          title: 'Order Submitted!',
          description: orderState.message,
          variant: 'success',
          duration: 3000,
        })
      } else {
        setHasShownToast(true)

        toast({
          title: 'Order Failed',
          description: orderState.message,
          variant: 'error',
          duration: 3000,
        })
      }
    }
  }, [orderState, hasShownToast, onCheckoutSuccess, toast])

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
      content: <ConfirmationSection />,
    },
  ]

  const shouldShowErrors =
    isFormSubmitted &&
    (Object.keys(errors).length > 0 ||
      (orderState?.errors && Object.keys(orderState.errors).length > 0))

  return (
    <CheckoutContainer>
      <Breadcrumbs />

      {/* React 19 Form with server action */}
      <Form action={submitOrder}>
        <CheckoutGrid>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}
          >
            {shouldShowErrors && (
              <FormErrorSummary
                serverErrors={orderState?.errors}
                title="Please fix the following errors:"
              />
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
