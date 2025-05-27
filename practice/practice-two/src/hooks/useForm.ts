import { useState, useCallback, type ChangeEvent, type FocusEvent } from 'react'
import { validateField } from '@utils/validateField'
import type { FormErrors } from 'types/FormError'

export function useFormSection<T extends Record<string, string>>(
  initialState: T,
  onUpdate?: (values: T) => void
) {
  const [formValues, setFormValues] = useState<T>(initialState)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const handleInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target

      setFormValues((prev) => {
        const newValues = {
          ...prev,
          [name]: value,
        }

        return newValues
      })
    },
    []
  )

  const handleBlur = useCallback(
    (
      e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target
      const error = validateField(name, value)
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    },
    []
  )
  const updateContext = useCallback(() => {
    if (onUpdate) {
      onUpdate(formValues)
    }
  }, [formValues, onUpdate])

  const getFormData = useCallback(() => formValues, [formValues])
  return {
    formValues,
    formErrors,
    handleInputChange,
    handleBlur,
    updateContext,
    getFormData,
    setFormValues,
  }
}
