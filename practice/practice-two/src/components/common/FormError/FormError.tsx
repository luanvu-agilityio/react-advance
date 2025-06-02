import type { ReactNode } from 'react'
import { ErrorMessage } from '../ErrorDisplay/ErrorDisplay.style'

interface FormErrorProps {
  message?: string
  children?: ReactNode
}

export const FormError = ({ message, children }: FormErrorProps) => {
  if (!message && !children) return null

  return <ErrorMessage>{message ?? children}</ErrorMessage>
}

export default FormError
