import * as SelectPrimitive from '@radix-ui/react-select'
import styled from 'styled-components'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean

  required?: boolean
  name?: string
  className?: string
  variant?: 'default' | 'search'
  style?: React.CSSProperties
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Label = styled.label`
  font-size: 14px;
  color: #374151;
  margin-bottom: 6px;
  font-weight: 500;
`

const StyledTrigger = styled(SelectPrimitive.Trigger)<{
  error?: boolean
  variant?: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(props) => (props.variant === 'search' ? '12px' : '4px')};
  padding: ${(props) => (props.variant === 'search' ? '0' : '10px 12px')};
  font-size: ${(props) => (props.variant === 'search' ? '15px' : '16px')};
  font-weight: ${(props) => (props.variant === 'search' ? '700' : 'normal')};
  line-height: 1;
  gap: 8px;
  background-color: ${(props) =>
    props.variant === 'search' ? 'transparent' : 'white'};
  color: ${(props) => (props.variant === 'search' ? '#000' : '#1F2937')};
  border: ${(props) => {
    if (props.variant === 'search') return 'none'
    const borderColor = props.error ? '#EF4444' : '#D1D5DB'
    return `1px solid ${borderColor}`
  }};
  height: ${(props) => (props.variant === 'search' ? '100%' : 'auto')};
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? '#EF4444' : '#4F46E5')};
    box-shadow: ${(props) => {
      if (props.variant === 'search') return 'none'
      const shadowColor = props.error
        ? 'rgba(239, 68, 68, 0.2)'
        : 'rgba(79, 70, 229, 0.2)'
      return `0 0 0 3px ${shadowColor}`
    }};
  }

  &[data-placeholder] {
    color: #9ca3af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const StyledContent = styled(SelectPrimitive.Content)`
  z-index: 1000;
  position: relative;
  top: 10px;
  left: -20px;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  min-width: var(--radix-select-trigger-width);
  max-height: 300px;
`

const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`

const StyledItem = styled(SelectPrimitive.Item)`
  font-size: 15px;
  line-height: 1;
  color: #1f2937;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 10px 35px 10px 10px;
  position: relative;
  user-select: none;
  cursor: pointer;

  &:focus {
    outline: none;
    background-color: #f3f4f6;
  }

  &[data-disabled] {
    color: #9ca3af;
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: #f3f4f6;
  }
`

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  right: 10px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const StyledItemText = styled(SelectPrimitive.ItemText)`
  margin-left: 20px;
`

const StyledIcon = styled(ChevronDown)<{ variant?: string }>`
  color: ${(props) => (props.variant === 'search' ? '#6B8F40' : '#6B7280')};
`

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
`

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
`

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
