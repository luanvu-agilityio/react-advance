import {
  createContext,
  useContext,
  useState,
  useRef,
  type RefObject,
  type ReactNode,
  useMemo,
} from 'react'

interface CheckoutContextType {
  billingInfo: Record<string, string>
  paymentInfo: Record<string, string>
  additionalInfo: { notes: string }
  shippingMethod: string
  paymentMethod: string
  sameAddressChecked: boolean
  currentStep: string
  showThankYouModal: boolean
  orderDetailsRef: RefObject<HTMLDivElement | null>
  updateBillingInfo: (values: Record<string, string>) => void
  updatePaymentInfo: (values: Record<string, string>) => void
  updateAdditionalInfo: (values: { notes: string }) => void
  updateShippingMethod: (method: string) => void
  updatePaymentMethod: (method: string) => void
  setSameAddressChecked: (checked: boolean) => void
  setCurrentStep: (step: string) => void
  setShowThankYouModal: (show: boolean) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
)

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [billingInfo, setBillingInfo] = useState<Record<string, string>>({})
  const [paymentInfo, setPaymentInfo] = useState<Record<string, string>>({})
  const [additionalInfo, setAdditionalInfo] = useState({ notes: '' })
  const [shippingMethod, setShippingMethod] = useState('fedex')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [sameAddressChecked, setSameAddressChecked] = useState(true)
  const [currentStep, setCurrentStep] = useState('billing')
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const orderDetailsRef = useRef<HTMLDivElement>(null)

  const value = useMemo(
    () => ({
      billingInfo,
      paymentInfo,
      additionalInfo,
      shippingMethod,
      paymentMethod,
      sameAddressChecked,
      currentStep,
      showThankYouModal,
      orderDetailsRef,
      updateBillingInfo: setBillingInfo,
      updatePaymentInfo: setPaymentInfo,
      updateAdditionalInfo: setAdditionalInfo,
      updateShippingMethod: setShippingMethod,
      updatePaymentMethod: setPaymentMethod,
      setSameAddressChecked,
      setCurrentStep,
      setShowThankYouModal,
    }),
    [
      billingInfo,
      paymentInfo,
      additionalInfo,
      shippingMethod,
      paymentMethod,
      sameAddressChecked,
      currentStep,
      showThankYouModal,
    ]
  )

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider')
  }
  return context
}
