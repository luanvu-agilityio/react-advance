import type { FieldConfig } from 'types/field-config'

export const fields: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    placeholder: 'First name',
  },
  {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    placeholder: 'Last name',
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: 'Phone number',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Address',
  },
  {
    name: 'city',
    label: 'Town / City',
    type: 'text',
    placeholder: 'Town or city',
  },
  {
    name: 'country',
    label: 'State / Country',
    type: 'select',
    placeholder: 'Choose a state or Country',
    options: [
      { value: 'VN', label: 'Vietnam' },
      { value: '', label: 'Choose a state or Country' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'UK', label: 'United Kingdom' },
      { value: 'AU', label: 'Australia' },
    ],
  },
  {
    name: 'zip',
    label: 'ZIP/Postal code',
    type: 'text',
    placeholder: 'Postal code or ZIP',
  },
]
