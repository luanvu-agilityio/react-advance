import { z } from 'zod'
import { REGEX } from '@constants/regex'
import { ValidationMessage } from '@constants/validation-message'

export const checkoutSchema = z.object({
  billing: z.object({
    firstName: z.string().min(2, ValidationMessage.MIN_LENGTH('First Name', 2)),
    lastName: z.string().min(2, ValidationMessage.MIN_LENGTH('Last Name', 2)),
    email: z.string().regex(REGEX.EMAIL, ValidationMessage.EMAIL),
    phone: z.string().regex(REGEX.PHONE, ValidationMessage.PHONE),
    address: z.string().min(2, ValidationMessage.MIN_LENGTH('Address', 2)),
    city: z.string().min(2, ValidationMessage.MIN_LENGTH('City', 2)),
    country: z.string().min(2, ValidationMessage.MIN_LENGTH('Country', 2)),
    zip: z.string().regex(REGEX.ZIP, ValidationMessage.ZIP),
  }),
  shipping: z.object({
    method: z.string(),
    price: z.number(),
    sameAsBilling: z.boolean(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
  payment: z.object({
    method: z.string(),
    cardNumber: z
      .string()
      .regex(REGEX.CARD_NUMBER, ValidationMessage.CARD.NUMBER)
      .optional(),
    cardHolder: z.string().min(3, ValidationMessage.CARD.NAME).optional(),
    expirationDate: z
      .string()
      .regex(REGEX.EXPIRY, ValidationMessage.CARD.EXPIRY)
      .optional(),
    cvc: z.string().regex(REGEX.CVC, ValidationMessage.CARD.CVC).optional(),
  }),
  additional: z.object({
    notes: z
      .string()
      .max(500, ValidationMessage.MAX_LENGTH('Notes', 500))
      .optional(),
    marketingConsent: z.boolean().optional(),
    termsConsent: z.boolean().refine((val) => val === true, {
      message: ValidationMessage.CONSENT,
    }),
  }),
})
export type CheckoutFormSchema = z.infer<typeof checkoutSchema>
