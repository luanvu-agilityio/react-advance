import { Text, RadioGroup } from '@radix-ui/themes'
import type { ViewModeOptionProps } from 'types/Category'

export const ViewModeOption = ({
  value,
  label,
  icon,
  viewMode,
}: ViewModeOptionProps) => (
<<<<<<< HEAD
  <div
    style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
    }}
  >
    <RadioGroup.Item value={value} id={value} style={{ display: 'none' }} />
=======
  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
    <RadioGroup.Item value={value} id={value} />
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    <Text
      as="label"
      htmlFor={value}
      size="2"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color:
          viewMode === value
            ? 'var(--black-color-default)'
            : 'var(--black-shade-2)',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
    >
      <img
        src={icon}
        alt={`${label} View`}
        style={{
          opacity: viewMode === value ? 1 : 0.5,
          transition: 'opacity 0.2s ease',
        }}
      />
      {label} view
    </Text>
  </div>
)
