import { forwardRef, memo, useImperativeHandle } from 'react'
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

import { useFormSection } from '@hooks/useForm'
import FormError from '../components/FormError'
import { useCheckout } from '@contexts/CheckoutContext'

export interface BillingInfoProps {
  sameAddressChecked: boolean
  setSameAddressChecked: (value: boolean) => void
}
export interface BillingInfoRef {
  getFormData: () => Record<string, string>
}

export const BillingInfoSection = memo(
  forwardRef<BillingInfoRef, BillingInfoProps>(
    ({ sameAddressChecked, setSameAddressChecked }, ref) => {
      const { updateBillingInfo } = useCheckout()
      const {
        formValues,
        formErrors,
        handleInputChange,
        handleBlur,
        getFormData,
      } = useFormSection(
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          country: '',
          zip: '',
        },
        updateBillingInfo
      )

      useImperativeHandle(
        ref,
        () => ({
          getFormData: () => {
            const data = getFormData()
            updateBillingInfo(data)
            return data
          },
        }),
        [getFormData, updateBillingInfo]
      )

      return (
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
                <FormError message={formErrors.firstName} />
              )}
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
                <FormError message={formErrors.lastName} />
              )}
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
              {formErrors.email && <FormError message={formErrors.email} />}
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
              {formErrors.phone && <FormError message={formErrors.phone} />}
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
              {formErrors.address && <FormError message={formErrors.address} />}
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
              {formErrors.city && <FormError message={formErrors.city} />}
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
              {formErrors.country && <FormError message={formErrors.country} />}
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
              {formErrors.zip && <FormError message={formErrors.zip} />}
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
    }
  )
)
