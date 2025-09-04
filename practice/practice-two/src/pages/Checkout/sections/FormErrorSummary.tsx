'use client'

import { useFormContext } from 'react-hook-form'
import type { FieldErrors } from 'react-hook-form'
import type { OrderState } from 'types/Order'
import {
  ErrorItem,
  ErrorList,
  ErrorTitle,
  ErrorSummaryContainer,
} from '../CheckoutStyle'

interface FormErrorSummaryProps {
  serverErrors?: OrderState['errors']
  title?: string
}

const FormErrorSummary = ({
  serverErrors,
  title = 'Please fix the following errors:',
}: FormErrorSummaryProps) => {
  const {
    formState: { errors: clientErrors },
  } = useFormContext()

  const hasClientErrors = Object.keys(clientErrors).length > 0
  const hasServerErrors = serverErrors && Object.keys(serverErrors).length > 0
  const hasErrors = hasClientErrors || hasServerErrors

  if (!hasErrors) return null

  const formatErrorPath = (path: string) => {
    return path
      .split('.')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' › ')
  }

  const errorMessages: string[] = []

  // Extract React Hook Form client-side errors
  const extractClientErrors = (obj: FieldErrors, path: string = '') => {
    if (!obj || typeof obj !== 'object') return

    Object.entries(obj).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key

      // Handle case where value is a FieldError with a message
      if (value && 'message' in value && typeof value.message === 'string') {
        errorMessages.push(`${formatErrorPath(newPath)}: ${value.message}`)
      }
      // Handle case where value is a nested object with more errors
      else if (value && typeof value === 'object') {
        extractClientErrors(value as FieldErrors, newPath)
      }
    })
  }

  // Extract server-side errors
  const extractServerErrors = (serverErrs: Record<string, string>) => {
    Object.entries(serverErrs).forEach(([field, message]) => {
      // Format server error field names to be user-friendly
      const formattedField = formatErrorPath(field)
      errorMessages.push(`${formattedField}: ${message}`)
    })
  }

  // Process client errors if present
  if (hasClientErrors) {
    extractClientErrors(clientErrors)
  }

  // Process server errors if present
  if (hasServerErrors) {
    extractServerErrors(serverErrors!)
  }

  // Remove duplicates (in case both client and server have same error)
  const uniqueErrorMessages = [...new Set(errorMessages)]

  return (
    <ErrorSummaryContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorList>
        {uniqueErrorMessages.map((message, index) => (
          <ErrorItem key={index}>{message}</ErrorItem>
        ))}
      </ErrorList>
    </ErrorSummaryContainer>
  )
}

export default FormErrorSummary
