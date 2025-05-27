import { memo } from 'react'
import {
  StepContainer,
  FormField,
  FormLabel,
  FormTextArea,
} from '../CheckoutStyle'

import { useFormSection } from '@hooks/useForm'

const AdditionalInfoSection = memo(() => {
  const { formValues, handleInputChange } = useFormSection({
    notes: '',
  })

  return (
    <StepContainer>
      <FormField name="notes">
        <FormLabel>Order Notes</FormLabel>
        <FormTextArea
          name="notes"
          placeholder="Any special instructions or notes about your order..."
          value={formValues.notes}
          onChange={handleInputChange}
        />
      </FormField>
    </StepContainer>
  )
})

export default AdditionalInfoSection
