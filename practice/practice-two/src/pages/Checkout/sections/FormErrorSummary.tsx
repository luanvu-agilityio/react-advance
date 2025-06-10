import { useFormContext } from 'react-hook-form'

import type { FieldErrors } from 'react-hook-form'
import {
  ErrorItem,
  ErrorList,
  ErrorTitle,
  ErrorSummaryContainer,
} from '../CheckoutStyle'

const FormErrorSummary = () => {
  const {
    formState: { errors },
  } = useFormContext()

  const hasErrors = Object.keys(errors).length > 0

  if (!hasErrors) return null

  const formatErrorPath = (path: string) => {
    return path
      .split('.')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' › ')
  }

  const errorMessages: string[] = []

  // More robust error extraction function that handles React Hook Form's error structure
  const extractErrors = (obj: FieldErrors, path: string = '') => {
    if (!obj || typeof obj !== 'object') return

    Object.entries(obj).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key

      // Handle case where value is a FieldError with a message
      if (value && 'message' in value && typeof value.message === 'string') {
        errorMessages.push(`${formatErrorPath(newPath)}: ${value.message}`)
      }
      // Handle case where value is a nested object with more errors
      else if (value && typeof value === 'object') {
        extractErrors(value as FieldErrors, newPath)
      }
    })
  }

  extractErrors(errors)

  return (
    <ErrorSummaryContainer>
      <ErrorTitle>Please fix the following errors:</ErrorTitle>
      <ErrorList>
        {errorMessages.map((message, index) => (
          <ErrorItem key={index}>{message}</ErrorItem>
        ))}
      </ErrorList>
    </ErrorSummaryContainer>
  )
}

export default FormErrorSummary
