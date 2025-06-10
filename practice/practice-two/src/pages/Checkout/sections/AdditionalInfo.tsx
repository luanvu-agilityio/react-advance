import { useFormContext, Controller } from 'react-hook-form'
import {
  StepContainer,
  FormField,
  FormLabel,
  FormTextArea,
} from '../CheckoutStyle'
import FormError from '@components/common/FormError/FormError'
import type { CheckoutFormData } from 'types/checkout'
import { ValidationMessage } from '@config/validation/validation-message'

const AdditionalInfoSection = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const notesValue = watch('additional.notes') || ''

  return (
    <StepContainer>
      {/* Order Notes */}
      <FormField name="notes">
        <FormLabel htmlFor="notes">Order Notes</FormLabel>
        <Controller
          name="additional.notes"
          rules={{
            maxLength: {
              value: 500,
              message: ValidationMessage.MAX_LENGTH('Notes', 500),
            },
          }}
          render={({ field }) => (
            <FormTextArea
              id="notes"
              placeholder="Any special instructions or notes about your order..."
              {...field}
              rows={4}
              maxLength={500}
              $hasError={!!errors.additional?.notes}
            />
          )}
        />
        {errors.additional?.notes && (
          <FormError message={errors.additional.notes.message as string} />
        )}
        <span
          style={{
            fontSize: '12px',
            color: 'var(--black-shade-2)',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {notesValue.length}/500 characters
        </span>
      </FormField>
    </StepContainer>
  )
}

export default AdditionalInfoSection
