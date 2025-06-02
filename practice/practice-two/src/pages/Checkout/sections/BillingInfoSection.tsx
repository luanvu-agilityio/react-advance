import { useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'

import {
  StepContainer,
  FormGrid,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  CheckboxContainer,
  StyledCheckboxRoot,
  StyledCheckboxIndicator,
  CheckboxLabel,
} from '../CheckoutStyle'

import FormError from '../../../components/common/FormError/FormError'
import { useCheckout } from '@contexts/CheckoutContext'
import type { FieldConfig } from 'types/field-config'
import { fields } from '@config/forms/field-config'

// Define field configuration for reusability

export const BillingInfoSection = () => {
  const { formData, errors, updateField, setFieldError, clearFieldError } =
    useCheckout()
  const billingData = formData.billing
  const [sameAddressChecked, setSameAddressChecked] = useState(true)

  // Field configuration array

  const handleInputChange = (field: FieldConfig['name'], value: string) => {
    updateField('billing', field, value)
    clearFieldError(`billing.${field}`)
  }

  const handleBlur = (field: string, value: string) => {
    if (!value.trim()) {
      setFieldError(`billing.${field}`, `${field} is required`)
    }
  }

  // Render form field based on field type
  const renderFormField = (field: FieldConfig) => {
    const errorKey = `billing.${field.name}`
    const value = billingData[field.name]

    return (
      <FormField name={field.name} key={field.name}>
        <FormLabel>{field.label}</FormLabel>
        {field.type === 'select' ? (
          <FormSelect
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            onBlur={(e) => handleBlur(field.name, e.target.value)}
            required
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
        ) : (
          <FormInput
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            onBlur={(e) => handleBlur(field.name, e.target.value)}
            required
          />
        )}
        {errors[errorKey] && <FormError>{errors[errorKey]}</FormError>}
      </FormField>
    )
  }

  return (
    <StepContainer>
      <FormGrid>{fields.map(renderFormField)}</FormGrid>

      <CheckboxContainer className="same-as-billing">
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
}
