'use client'
import { useCallback, useMemo, useEffect } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useFormContext, Controller } from 'react-hook-form'

import {
  StepContainer,
  ShippingOption,
  ShippingOptionDetails,
  RadioCircle,
  ShippingLabel,
  AdditionalPrice,
  ShippingInfo,
  ShippingLogo,
  FormGrid,
  FormField,
  FormLabel,
  FormInput,
} from '../CheckoutStyle'
import FormError from '@components/common/FormError/FormError'
import type { CheckoutFormData } from 'types/checkout'
import { useShippingMethodMutation } from '@hooks/useCheckoutQuery'
import { calculateShippingCost } from '@utils/cartCalculation'
// Define shipping method configuration type
interface ShippingMethodOption {
  id: string
  value: string
  label: string
  price: number
  logoSrc: string
  logoAlt: string
  logoWidth: string
  logoHeight: string
}

export const ShippingMethodSection = () => {
  const {
    watch,
    setValue,
    control,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const shippingMethodMutation = useShippingMethodMutation()
  const shippingMethod = watch('shipping.method')
  // Watch for changes to same-as-billing checkbox
  const sameAsBilling = watch('shipping.sameAsBilling')

  // Shipping methods configuration
  const shippingMethods = useMemo<ShippingMethodOption[]>(
    () => [
      {
        id: 'fedex',
        value: 'fedex',
        label: 'FedEx',
        price: calculateShippingCost('fedex'),
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372451/fedex_gcko1l.png',
        logoAlt: 'FedEx',
        logoWidth: '54px',
        logoHeight: '16px',
      },
      {
        id: 'dhl',
        value: 'dhl',
        label: 'DHL',
        price: calculateShippingCost('dhl'),
        logoSrc:
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372450/dhl_it43vr.png',
        logoAlt: 'DHL',
        logoWidth: '93px',
        logoHeight: '14px',
      },
    ],
    []
  )

  /**
   * Handle shipping method change
   * Updates both form state and checkout store state
   */
  const handleMethodChange = useCallback(
    (method: 'fedex' | 'dhl') => {
      // Find shipping method info by value

      const shippingPrice = calculateShippingCost(method)
      shippingMethodMutation.mutate(method)

      // Update form state (React Hook Form)
      setValue('shipping.method', method)
      setValue('shipping.price', shippingPrice)
    },
    [setValue, shippingMethodMutation]
  )

  /**
   * Validate or clear shipping address fields based on sameAsBilling
   * Triggers validation when showing separate address fields
   */
  useEffect(() => {
    if (!sameAsBilling) {
      // Fields are visible, trigger validation
      trigger([
        'shipping.address',
        'shipping.city',
        'shipping.zip',
        'shipping.country',
      ])
    } else {
      // Fields are hidden, clear any errors
      clearErrors([
        'shipping.address',
        'shipping.city',
        'shipping.zip',
        'shipping.country',
      ])
    }
  }, [sameAsBilling, trigger, clearErrors])

  // Render a single shipping option
  const renderShippingOption = (method: ShippingMethodOption) => (
    <ShippingOption
      key={method.id}
      htmlFor={method.id}
      data-state={shippingMethod === method.value ? 'checked' : ''}
    >
      <ShippingOptionDetails>
        <RadioGroup.Item
          value={method.value}
          id={method.id}
          style={{ display: 'none' }}
        />
        <RadioCircle />
        <ShippingLabel>{method.label}</ShippingLabel>
      </ShippingOptionDetails>

      <AdditionalPrice>
        +{method.price} USD
        <span>Additional price</span>
      </AdditionalPrice>

      <ShippingInfo>
        <ShippingLogo
          src={method.logoSrc}
          alt={method.logoAlt}
          style={{
            width: method.logoWidth,
            height: method.logoHeight,
          }}
        />
      </ShippingInfo>
    </ShippingOption>
  )

  return (
    <StepContainer>
      <Controller
        name="shipping.method"
        control={control}
        render={({ field }) => (
          <RadioGroup.Root
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              handleMethodChange(value as 'fedex' | 'dhl')
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {shippingMethods.map(renderShippingOption)}
          </RadioGroup.Root>
        )}
      />

      {/* Only display shipping address fields if not using billing address */}
      {!sameAsBilling && (
        <>
          <h3>Shipping Address</h3>
          <FormGrid>
            <FormField name="shipping.address">
              <FormLabel>Address</FormLabel>
              <Controller
                name="shipping.address"
                control={control}
                rules={{
                  required: !sameAsBilling
                    ? 'Shipping address is required'
                    : false,
                }}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    $hasError={!!errors?.shipping?.address}
                  />
                )}
              />
              {errors.shipping?.address && (
                <FormError
                  message={errors.shipping.address.message as string}
                />
              )}
            </FormField>

            <FormField name="shipping.city">
              <FormLabel>City</FormLabel>
              <Controller
                name="shipping.city"
                control={control}
                rules={{
                  required: !sameAsBilling ? 'City is required' : false,
                }}
                render={({ field }) => (
                  <FormInput {...field} $hasError={!!errors?.shipping?.city} />
                )}
              />
              {errors.shipping?.city && (
                <FormError message={errors.shipping.city.message as string} />
              )}
            </FormField>

            <FormField name="shipping.zip">
              <FormLabel>ZIP Code</FormLabel>
              <Controller
                name="shipping.zip"
                control={control}
                rules={{
                  required: !sameAsBilling ? 'Zip code is required' : false,
                }}
                render={({ field }) => (
                  <FormInput {...field} $hasError={!!errors?.shipping?.zip} />
                )}
              />
              {errors.shipping?.zip && (
                <FormError message={errors.shipping.zip.message as string} />
              )}
            </FormField>

            <FormField name="shipping.country">
              <FormLabel>Country</FormLabel>
              <Controller
                name="shipping.country"
                control={control}
                rules={{
                  required: !sameAsBilling ? 'Country is required' : false,
                }}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    $hasError={!!errors?.shipping?.country}
                  />
                )}
              />
              {errors.shipping?.country && (
                <FormError
                  message={errors.shipping.country.message as string}
                />
              )}
            </FormField>
          </FormGrid>
        </>
      )}
    </StepContainer>
  )
}
