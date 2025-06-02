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

export const StyledTrigger = styled(SelectPrimitive.Trigger)<{
  error?: boolean
  variant?: string
}>`
  display: inline-flex;
  align-items: center;
  border-radius: ${(props) => (props.variant === 'search' ? '12px' : '4px')};
  padding: 0;
  font-size: ${(props) => (props.variant === 'search' ? '15px' : '14px')};
  font-weight: ${(props) => (props.variant === 'search' ? '700' : 'normal')};
  line-height: 1;
  gap: 8px;
  background-color: transparent;
  color: ${(props) => (props.variant === 'search' ? '#000' : '#1F2937')};
  border: none;

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

export const StyledContent = styled(SelectPrimitive.Content)`
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

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`

export const StyledItem = styled(SelectPrimitive.Item)`
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

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  right: 10px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const StyledItemText = styled(SelectPrimitive.ItemText)`
  margin-left: 20px;
`

export const StyledIcon = styled(ChevronDown)<{ variant?: string }>`
  color: ${(props) => (props.variant === 'search' ? '#6B8F40' : '#6B7280')};
`

export const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
`

export const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
`
