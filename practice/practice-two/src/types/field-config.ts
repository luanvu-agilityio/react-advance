export interface FieldConfig {
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phone'
    | 'address'
    | 'city'
    | 'country'
    | 'zip'
  label: string
  type: 'text' | 'email' | 'tel' | 'select'
  placeholder: string
  options?: Array<{ value: string; label: string }>
}
