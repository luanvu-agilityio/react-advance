import styled from 'styled-components'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  font-size: 14px;
  color: #374151;
  margin-bottom: 6px;
  font-weight: 500;
`

// Now we only define variant-specific styles and positioning
export const StyledTrigger = styled(SelectPrimitive.Trigger)<{
  error?: boolean
  variant?: string
}>`
  /* Variant-specific styles that extend the theme styles */
  border-radius: ${(props) => (props.variant === 'search' ? '12px' : '4px')};
  font-size: ${(props) => (props.variant === 'search' ? '15px' : '14px')};
  font-weight: ${(props) => (props.variant === 'search' ? '700' : 'normal')};
  color: ${(props) => (props.variant === 'search' ? '#000' : '#1F2937')};
  height: ${(props) => (props.variant === 'search' ? '100%' : 'auto')};

  /* Custom focus styles for variants */
  &:focus {
    box-shadow: ${(props) => {
      if (props.variant === 'search') return 'none'
      if (props.error) return '0 0 0 3px rgba(239, 68, 68, 0.2)'
      return '0 0 0 3px rgba(79, 70, 229, 0.2)'
    }};

    border-color: ${(props) => (props.error ? '#EF4444' : '#4F46E5')};
  }
`

export const StyledContent = styled(SelectPrimitive.Content)`
  /* Custom positioning beyond theme styles */
  position: relative;
  top: 10px;
  left: -20px;
`

// These components can use the theme styles mostly unchanged
export const StyledViewport = styled(SelectPrimitive.Viewport)``

export const StyledItem = styled(SelectPrimitive.Item)``

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)``

export const StyledItemText = styled(SelectPrimitive.ItemText)`
  margin-left: 20px;
`

export const StyledIcon = styled(ChevronDown)<{ variant?: string }>`
  color: ${(props) => (props.variant === 'search' ? '#6B8F40' : '#6B7280')};
`

export const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)``

export const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)``
