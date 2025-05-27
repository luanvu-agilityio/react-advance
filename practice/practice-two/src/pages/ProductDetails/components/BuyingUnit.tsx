import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import styled from 'styled-components'
import { ChevronDown } from 'lucide-react'

interface BuyingUnitProps {
  quantity: number
  unit: string
  onQuantityChange: (value: number) => void
  onUnitChange: (value: string) => void
  size?: 'small' | 'medium' | 'large'
}

const BuyingUnitContainer = styled.div<{ size?: string }>`
  display: inline-flex;
  align-items: center;
  background: var(--black-shade-6);
  border: 1px solid var(--black-shade-3);
  padding: ${(prop) => {
    switch (prop.size) {
      case 'small':
        return '6px'
      case 'large':
        return '18px 22px'

      default:
        return '14px 16px'
    }
  }};
  border-radius: 12px;
  height: ${(props) => {
    switch (props.size) {
      case 'small':
        return '32px'
      case 'large':
        return '56px'
      default:
        return '48px'
    }
  }};
  max-width: ${(props) => (props.size === 'small' ? '96px' : '111px')};
`

const QuantityInput = styled.input<{ size?: string }>`
  width: ${(props) => (props.size === 'small' ? '34px' : '25px')};
  border: none;
  text-align: center;
  font-size: 15px;
  padding-right: ${(props) => (props.size === 'small' ? '6.5px' : '16px')};
  color: var(--black-color-default);
  background: var(--black-shade-6);

  &:focus {
    outline: none;
  }

  /* Hide number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const Separator = styled.div<{ size?: string }>`
  width: 1px;
  height: ${(props) => (props.size === 'small' ? '20px' : '24px')};
  background-color: var(--black-shade-3);
`

const SelectContainer = styled.div`
  position: relative;
`

const SelectButton = styled.button<{ size?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  padding-left: ${(props) => (props.size === 'small' ? '6.5px' : '15px')};
  color: var(--black-color-default);
  text-transform: capitalize;
  background: transparent;
  border: none;
  height: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--black-shade-4);
  border-radius: 8px;
  padding: 8px 0;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  text-transform: capitalize;
  list-style: none;

  &:hover {
    background-color: var(--black-shade-5);
  }
`

const units = ['pcs', 'kgs', 'box', 'pack']

const BuyingUnit = ({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
  size = 'medium',
}: BuyingUnitProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(quantity.toString())
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(quantity.toString())
  }, [quantity])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      onQuantityChange(value)
    }
  }

  const handleInputBlur = () => {
    const value = parseInt(inputValue)
    if (isNaN(value) ?? value < 1) {
      setInputValue('1')
      onQuantityChange(1)
    }
  }

  return (
    <BuyingUnitContainer size={size}>
      <QuantityInput
        type="number"
        min="1"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        aria-label="Quantity"
        size={size}
      />
      <Separator size={size} />
      <SelectContainer ref={dropdownRef}>
        <SelectButton
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          size={size}
        >
          {unit}
          <ChevronDown size={12} />
        </SelectButton>
        <DropdownList $isOpen={isOpen}>
          {units.map((option) => (
            <DropdownItem
              key={option}
              aria-selected={option === unit}
              onClick={() => {
                onUnitChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      </SelectContainer>
    </BuyingUnitContainer>
  )
}

export default BuyingUnit
