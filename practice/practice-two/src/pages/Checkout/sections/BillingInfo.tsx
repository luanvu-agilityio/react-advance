'use client'
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

export const BillingInfoSection = () => {
  const { control, watch, setValue, trigger } =
    useFormContext<CheckoutFormData>()

  // Watch values from the form
  const billingData = watch('billing')
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
                rules={{
                  required: `${field.label} is required`,
                }}
                render={({ field: controllerField, fieldState }) => (
                  <>
                    <FormSelect
                      value={controllerField.value || ''}
                      onChange={controllerField.onChange}
                      onBlur={() => {
                        controllerField.onBlur()
                        trigger(`billing.${field.name}`)
                      }}
                      name={controllerField.name}
                      ref={controllerField.ref}
                      $hasError={!!fieldState.error}
                    >
                      <option value="">Choose a state or Country</option>
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
                  required: `${field.label} is required`,
                  minLength: {
                    value: 2,
                    message: `${field.label} must be at least 2 characters`,
                  },
                  ...(field.name === 'email' && {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  }),
                  ...(field.name === 'phone' && {
                    pattern: {
                      value: /^\+?[\d\s-]{10,}$/,
                      message: 'Please enter a valid phone number',
                    },
                  }),
                  ...(field.name === 'zip' && {
                    pattern: {
                      value: /^[a-zA-Z0-9\s-]{3,10}$/,
                      message: 'Please enter a valid ZIP/postal code',
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
                      onBlur={() => {
                        controllerField.onBlur()
                        trigger(`billing.${field.name}`)
                      }}
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

      {fields.map((field) => (
        <input
          key={field.name}
          type="hidden"
          name={`billing.${field.name}`}
          value={billingData?.[field.name] || ''}
        />
      ))}

      <CheckboxContainer className="same-as-billing">
        <Controller
          name="shipping.sameAsBilling"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <StyledCheckboxRoot
                id="ship-to-different"
                checked={!value}
                onCheckedChange={(checked) => onChange(!checked)}
              >
                <StyledCheckboxIndicator>
                  <CheckIcon />
                </StyledCheckboxIndicator>
              </StyledCheckboxRoot>

              <input
                type="hidden"
                name="shipping.sameAsBilling"
                value={value ? 'true' : 'false'}
              />
            </>
          )}
        />
        <CheckboxLabel htmlFor="ship-to-different">
          <span style={{ width: '250px' }}>Ship to a different address</span>
        </CheckboxLabel>
      </CheckboxContainer>
    </StepContainer>
  )
}
