import type { ChangeEvent } from 'react'
import {
  StepContainer,
  FormField,
  FormLabel,
  FormTextArea,
} from '../CheckoutStyle'

interface FormValues {
  notes?: string
}

interface AdditionalInfoSectionProps {
  formValues?: FormValues
  handleInputChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
}

export const AdditionalInfoSection = ({
  formValues = {},
  handleInputChange,
}: AdditionalInfoSectionProps) => (
  <StepContainer>
    <FormField name="notes">
      <FormLabel>Order notes</FormLabel>
      <FormTextArea
        name="notes"
        placeholder="Need a specific delivery day? Sending a gift? Let's say ..."
        value={formValues.notes || ''}
        onChange={handleInputChange}
      />
    </FormField>
  </StepContainer>
)

export default AdditionalInfoSection
