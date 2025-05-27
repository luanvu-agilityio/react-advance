import React, { memo, useState } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import {
  StepContainer,
  CheckboxContainer,
  StyledCheckbox,
  StyledCheckboxIndicator,
  CheckboxLabel,
  SubmitButton,
} from '../CheckoutStyle'

export const ConfirmationSection = memo(() => {
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [termsConsent, setTermsConsent] = useState(false)

  return (
    <StepContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <CheckboxContainer>
          <StyledCheckbox
            id="marketing-consent"
            checked={marketingConsent}
            onCheckedChange={(checked: CheckedState) =>
              setMarketingConsent(checked === true)
            }
          >
            <StyledCheckboxIndicator>
              <CheckIcon />
            </StyledCheckboxIndicator>
          </StyledCheckbox>
          <CheckboxLabel htmlFor="marketing-consent">
            I agree with sending an Marketing and newsletter emails. No spam,
            promised!
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <StyledCheckbox
            id="terms-consent"
            checked={termsConsent}
            onCheckedChange={(checked: CheckedState) =>
              setTermsConsent(checked === true)
            }
            required
          >
            <StyledCheckboxIndicator>
              <CheckIcon />
            </StyledCheckboxIndicator>
          </StyledCheckbox>
          <CheckboxLabel htmlFor="terms-consent" style={{ width: '580px' }}>
            I agree with our terms and conditions and privacy policy.
          </CheckboxLabel>
        </CheckboxContainer>
      </div>

      <SubmitButton type="submit">Complete order</SubmitButton>
    </StepContainer>
  )
})

export default ConfirmationSection
