import * as SelectPrimitive from '@radix-ui/react-select'

import { ChevronDown, Check } from 'lucide-react'
import {
  SelectContainer,
  StyledContent,
  StyledIcon,
  StyledItem,
  StyledItemIndicator,
  StyledItemText,
  StyledScrollDownButton,
  StyledScrollUpButton,
  StyledTrigger,
  StyledViewport,
} from './Select.style'
import { Label } from '@radix-ui/react-form'
import type { CSSProperties } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  name?: string
  className?: string
  variant?: 'default' | 'search' | 'filter'
  style?: CSSProperties
}

const Select = ({
  options,
  value,
  onChange,
  label,
  disabled = false,
  required = false,
  name,
  className,
  variant = 'default',
  placeholder = 'Select an option',
  style,
}: SelectProps) => {
  return (
    <SelectContainer className={className} style={style}>
      {label && (
        <Label>
          {label}
          {required && ' *'}
        </Label>
      )}

      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
      >
        <StyledTrigger variant={variant}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <StyledIcon
              size={16}
              variant={variant}
              style={{ strokeWidth: '4' }}
            />
          </SelectPrimitive.Icon>
        </StyledTrigger>

        <SelectPrimitive.Portal>
          <StyledContent position="popper">
            <StyledScrollUpButton>
              <ChevronDown size={16} style={{ transform: 'rotate(180deg)' }} />
            </StyledScrollUpButton>

            <StyledViewport>
              {options.map((option) => (
                <StyledItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  <StyledItemIndicator>
                    <Check size={16} />
                  </StyledItemIndicator>
                  <StyledItemText>{option.label}</StyledItemText>
                </StyledItem>
              ))}
            </StyledViewport>

            <StyledScrollDownButton>
              <ChevronDown size={16} />
            </StyledScrollDownButton>
          </StyledContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </SelectContainer>
  )
}

export default Select
