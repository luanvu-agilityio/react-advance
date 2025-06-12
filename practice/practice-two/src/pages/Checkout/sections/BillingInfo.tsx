import { CheckIcon } from '@radix-ui/react-icons'
import { useFormContext, Controller } from 'react-hook-form'
import FormError from '@components/common/FormError/FormError'
import { fields } from '@config/forms/field-config'
import { useEffect } from 'react'
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
import type { CheckoutFormData } from 'types/checkout'
import { ValidationMessage } from '@config/validation/validation-message'

export const BillingInfoSection = () => {
  const { control, watch, setValue } = useFormContext<CheckoutFormData>()

  // Watch values from the form
  const sameAsBilling = watch('shipping.sameAsBilling')

  useEffect(() => {
    if (sameAsBilling) {
      // Copy billing address fields to shipping address fields
      const billingFields = ['address', 'city', 'zip', 'country']

      billingFields.forEach((field) => {
        const billingValue = watch(`billing.${field}` as keyof CheckoutFormData)
        setValue(`shipping.${field}` as keyof CheckoutFormData, billingValue)
      })
    }
  }, [watch, sameAsBilling, setValue])

  return (
    <StepContainer>
      <FormGrid>
        {fields.map((field) => (
          <FormField name={field.name} key={field.name}>
            <FormLabel>{field.label}</FormLabel>

            {field.type === 'select' ? (
              <Controller
                name={`billing.${field.name}`}
                control={control}
                rules={{ required: ValidationMessage.REQUIRED }}
                render={({ field: controllerField, fieldState }) => (
                  <>
                    <FormSelect
                      value={controllerField.value}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      name={controllerField.name}
                      ref={controllerField.ref}
                      $hasError={!!fieldState.error}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormSelect>
                    {fieldState.error && (
                      <FormError
                        message={fieldState.error?.message || 'Invalid value'}
                      />
                    )}
                  </>
                )}
              />
            ) : (
              <Controller
                name={`billing.${field.name}`}
                control={control}
                rules={{
                  required: ValidationMessage.REQUIRED,
                  minLength: {
                    value: 2,
                    message: ValidationMessage.MIN_LENGTH(field.name, 2),
                  },
                  ...(field.name === 'email' && {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: ValidationMessage.EMAIL,
                    },
                  }),
                  ...(field.name === 'phone' && {
                    pattern: {
                      value: /^\+?[\d\s-]{10,}$/,
                      message: ValidationMessage.PHONE,
                    },
                  }),
                  ...(field.name === 'zip' && {
                    pattern: {
                      value: /^[a-zA-Z0-9\s-]{3,10}$/,
                      message: ValidationMessage.ZIP,
                    },
                  }),
                }}
                render={({ field: controllerField, fieldState }) => (
                  <>
                    <FormInput
                      type={field.type}
                      placeholder={field.placeholder}
                      value={controllerField.value || ''}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      name={controllerField.name}
                      ref={controllerField.ref}
                      $hasError={!!fieldState.error}
                    />
                    {fieldState.error && (
                      <FormError
                        message={fieldState.error?.message || 'Invalid value'}
                      />
                    )}
                  </>
                )}
              />
            )}
          </FormField>
        ))}
      </FormGrid>

      <CheckboxContainer className="same-as-billing">
        <Controller
          name="shipping.sameAsBilling"
          control={control}
          render={({ field: { onChange, value } }) => (
            <StyledCheckboxRoot
              id="ship-to-different"
              checked={!value}
              onCheckedChange={(checked) => onChange(!checked)}
            >
              <StyledCheckboxIndicator>
                <CheckIcon />
              </StyledCheckboxIndicator>
            </StyledCheckboxRoot>
          )}
        />
        <CheckboxLabel htmlFor="ship-to-different">
          <span style={{ width: '250px' }}>Ship to a different address</span>
        </CheckboxLabel>
      </CheckboxContainer>
    </StepContainer>
  )
}
