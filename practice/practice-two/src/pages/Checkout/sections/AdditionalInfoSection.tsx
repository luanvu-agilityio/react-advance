import { useCallback, type ChangeEvent, type FocusEvent } from 'react'

import {
  StepContainer,
  FormField,
  FormLabel,
  FormTextArea,
} from '../CheckoutStyle'
import FormError from '../../../components/common/FormError/FormError'
import { useCheckout } from '@contexts/CheckoutContext'

const AdditionalInfoSection = () => {
  const { formData, errors, updateField, setFieldError, clearFieldError } =
    useCheckout()

  const additionalData = formData.additional

  // Handle textarea changes
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target
      updateField('additional', 'notes', value)
      clearFieldError('additional.notes')
    },
    [updateField, clearFieldError]
  )

  // Handle textarea blur for validation
  const handleNotesBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      const { value } = e.target

      if (value.length > 500) {
        setFieldError(
          'additional.notes',
          'Notes must be less than 500 characters'
        )
      }
    },
    [setFieldError]
  )

  return (
    <StepContainer>
      {/* Order Notes */}
      <FormField name="notes">
        <FormLabel htmlFor="notes">Order Notes</FormLabel>
        <FormTextArea
          id="notes"
          name="notes"
          placeholder="Any special instructions or notes about your order..."
          value={additionalData.notes}
          onChange={handleInputChange}
          onBlur={handleNotesBlur}
          rows={4}
          maxLength={500}
        />
        {errors['additional.notes'] && (
          <FormError>{errors['additional.notes']}</FormError>
        )}
        <span
          style={{
            fontSize: '12px',
            color: 'var(--black-shade-2)',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {additionalData.notes.length}/500 characters
        </span>
      </FormField>
    </StepContainer>
  )
}

export default AdditionalInfoSection
