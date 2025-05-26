import { memo, type ChangeEvent, type FocusEvent } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'

import {
  StepContainer,
  FormGrid,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormMessage,
  CheckboxContainer,
  StyledCheckboxRoot,
  StyledCheckboxIndicator,
  CheckboxLabel,
} from '../CheckoutStyle'
import type { FormErrors, FormValues } from 'types/FormError'

export interface BillingInfoProps {
  sameAddressChecked: boolean
  setSameAddressChecked: (value: boolean) => void
  formValues?: FormValues
  formErrors?: FormErrors
  handleInputChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  handleBlur?: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
}

export const BillingInfoSection = memo(
  ({
    sameAddressChecked,
    setSameAddressChecked,
    formValues = {},
    formErrors = {},
    handleInputChange,
    handleBlur,
  }: BillingInfoProps) => (
    <StepContainer>
      <FormGrid>
        <FormField name="firstName">
          <FormLabel>First name</FormLabel>
          <FormInput
            type="text"
            name="firstName"
            placeholder="First name"
            value={formValues.firstName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.firstName && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.firstName}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your first name
          </FormMessage>
        </FormField>

        <FormField name="lastName">
          <FormLabel>Last name</FormLabel>
          <FormInput
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formValues.lastName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.lastName && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.lastName}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your last name
          </FormMessage>
        </FormField>

        <FormField name="email">
          <FormLabel>Email address</FormLabel>
          <FormInput
            type="email"
            name="email"
            placeholder="Email address"
            value={formValues.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.email && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.email}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your email
          </FormMessage>
          <FormMessage match="typeMismatch">
            Please enter a valid email
          </FormMessage>
        </FormField>

        <FormField name="phone">
          <FormLabel>Phone number</FormLabel>
          <FormInput
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formValues.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.phone && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.phone}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your phone number
          </FormMessage>
        </FormField>

        <FormField name="address">
          <FormLabel>Address</FormLabel>
          <FormInput
            type="text"
            name="address"
            placeholder="Address"
            value={formValues.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.address && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.address}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your address
          </FormMessage>
        </FormField>

        <FormField name="city">
          <FormLabel>Town / City</FormLabel>
          <FormInput
            type="text"
            name="city"
            placeholder="Town or city"
            value={formValues.city}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.city && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.city}
            </div>
          )}
          <FormMessage match="valueMissing">Please enter your city</FormMessage>
        </FormField>

        <FormField name="country">
          <FormLabel>State / Country</FormLabel>
          <FormSelect
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          >
            <option value="">Choose a state or Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </FormSelect>
          {formErrors.country && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.country}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please select your country
          </FormMessage>
        </FormField>

        <FormField name="zip">
          <FormLabel>ZIP/Postal code</FormLabel>
          <FormInput
            type="text"
            name="zip"
            placeholder="Postal code or ZIP"
            value={formValues.zip}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {formErrors.zip && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formErrors.zip}
            </div>
          )}
          <FormMessage match="valueMissing">
            Please enter your ZIP/Postal code
          </FormMessage>
        </FormField>
      </FormGrid>

      <CheckboxContainer>
        <StyledCheckboxRoot
          id="ship-to-different"
          checked={!sameAddressChecked}
          onCheckedChange={(checked) => setSameAddressChecked(!checked)}
        >
          <StyledCheckboxIndicator>
            <CheckIcon />
          </StyledCheckboxIndicator>
        </StyledCheckboxRoot>
        <CheckboxLabel htmlFor="ship-to-different">
          Ship to a different address?
        </CheckboxLabel>
      </CheckboxContainer>
    </StepContainer>
  )
)
