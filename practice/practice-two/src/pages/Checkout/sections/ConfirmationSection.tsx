import type { CheckedState } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { useCheckout } from '@contexts/CheckoutContext'

import {
  StepContainer,
  CheckboxContainer,
  StyledCheckbox,
  StyledCheckboxIndicator,
  CheckboxLabel,
  SubmitButton,
} from '../CheckoutStyle'

// Define consent option configuration
interface ConsentOption {
  id: string
  field: 'marketingConsent' | 'termsConsent'
  label: string
  required?: boolean
  style?: React.CSSProperties
}

export const ConfirmationSection = () => {
  const { formData, updateField } = useCheckout()
  const additionalData = formData.additional

  // Configuration array for consent options
  const consentOptions: ConsentOption[] = [
    {
      id: 'marketing-consent',
      field: 'marketingConsent',
      label:
        'I agree with sending an Marketing and newsletter emails. No spam, promised!',
      required: false,
    },
    {
      id: 'terms-consent',
      field: 'termsConsent',
      label: 'I agree with our terms and conditions and privacy policy.',
      required: true,
      style: { width: '580px' },
    },
  ]

  // Render a single consent checkbox
  const renderConsentOption = (option: ConsentOption) => (
    <CheckboxContainer className={option.id} key={option.id}>
      <StyledCheckbox
        id={option.id}
        checked={additionalData[option.field]}
        onCheckedChange={(checked: CheckedState) =>
          updateField('additional', option.field, checked === true)
        }
        required={option.required}
      >
        <StyledCheckboxIndicator>
          <CheckIcon />
        </StyledCheckboxIndicator>
      </StyledCheckbox>
      <CheckboxLabel htmlFor={option.id} style={option.style}>
        {option.label}
      </CheckboxLabel>
    </CheckboxContainer>
  )

  return (
    <StepContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {consentOptions.map(renderConsentOption)}
      </div>

      <SubmitButton type="submit">Complete order</SubmitButton>
    </StepContainer>
  )
}

export default ConfirmationSection
