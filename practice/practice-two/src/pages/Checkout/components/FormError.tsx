import type { ReactNode } from 'react'
import styled from 'styled-components'

interface FormErrorProps {
  message?: string
  children?: ReactNode
}

const ErrorMessage = styled.div`
  color: var(--error-color, #e53935);
  font-size: 12px;
  margin-top: 4px;
  font-family: var(--font-family-primary);
`

export const FormError = ({ message, children }: FormErrorProps) => {
  if (!message && !children) return null

  return <ErrorMessage>{message ?? children}</ErrorMessage>
}

export default FormError
