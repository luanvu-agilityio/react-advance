import type { ReactNode, CSSProperties } from 'react'
import { ErrorMessage } from './FormError.styles'

interface FormErrorProps {
  message?: string
  children?: ReactNode
  style?: CSSProperties
}

export const FormError = ({ message, children, style }: FormErrorProps) => {
  if (!message && !children) return null

  return (
    <ErrorMessage className="error" style={style}>
      {message ?? children}
    </ErrorMessage>
  )
}

export default FormError
