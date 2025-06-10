import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { useCheckoutForm } from '@hooks/useCheckoutForm'

type CheckoutContextType = ReturnType<typeof useCheckoutForm>

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
)

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const orderDetailsRef = useRef<HTMLDivElement>(null)
  const checkoutForm = useCheckoutForm()
  const contextValue = useMemo(
    () => ({
      ...checkoutForm,
      orderDetailsRef,
    }),
    [checkoutForm]
  )

  return (
    <CheckoutContext.Provider value={contextValue}>
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
