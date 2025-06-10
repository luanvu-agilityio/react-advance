<<<<<<< HEAD
import type { ReactNode, CSSProperties } from 'react'
import { ErrorMessage } from './FormError.styles'
=======
import type { ReactNode } from 'react'
import { ErrorMessage } from '../ErrorDisplay/ErrorDisplay.style'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

interface FormErrorProps {
  message?: string
  children?: ReactNode
<<<<<<< HEAD
  style?: CSSProperties
}

export const FormError = ({ message, children, style }: FormErrorProps) => {
  if (!message && !children) return null

  return (
    <ErrorMessage className="error" style={style}>
      {message ?? children}
    </ErrorMessage>
  )
=======
}

export const FormError = ({ message, children }: FormErrorProps) => {
  if (!message && !children) return null

  return <ErrorMessage>{message ?? children}</ErrorMessage>
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}

export default FormError
